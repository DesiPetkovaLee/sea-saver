import "./scss/styles.scss";
import { Fireworks } from "fireworks-js";
import { brownLevels } from "./data/brownLevels";
import { trashItems } from "./data/trashItems";
import { waveSound, fireworksSound, loseSound } from "./audio/sounds";

const seaEl = document.querySelector<HTMLDivElement>(".game__sea");
const scoreEl = document.querySelector<HTMLSpanElement>(".game__score");
const binScoreEl = document.querySelector<HTMLSpanElement>(".bin-score");
const legendEl = document.querySelector<HTMLDivElement>(".game__legend");
const messageEl = document.querySelector<HTMLDivElement>(".game__message");
const startBtn = document.querySelector<HTMLButtonElement>(
    ".game__start-button"
);
const trashAreaEl = document.querySelector<HTMLDivElement>(".game__trash-area");
const overlayEl = document.querySelector<HTMLDivElement>(".game__overlay");
const fireworksContainer =
    document.querySelector<HTMLDivElement>(".game__fireworks");

if (
    !legendEl ||
    !startBtn ||
    !seaEl ||
    !scoreEl ||
    !binScoreEl ||
    !messageEl ||
    !overlayEl ||
    !fireworksContainer
) {
    throw new Error("One or more elements were not found");
}

let score = 0;
let gameRunning = false;
let activeTimeouts: number[] = [];
const winScore = 300;
let missedCount = 0;
const maxMisses = 5;

// Update the overlay brownness
const updateSeaBrownness = (): void => {
    let color: string;
    if (missedCount > 0 && missedCount <= maxMisses) {
        color = brownLevels[missedCount];
    } else {
        color = "rgba(0,0,0,0)";
    }
    overlayEl.style.backgroundColor = color;
};

// Updating score display to match the current value
const updateScore = (): void => {
    scoreEl.textContent = score.toString();
    binScoreEl.textContent = score.toString();
};

// Generating legend
const generateLegend = (): void => {
    legendEl.style.display = "block";
    legendEl.innerHTML = `<div class="legend__item">1 trash -> 10 points / To Win -> 300 points </div>`;
};

// Generating random trash
const trashInTheSea = (timeBeforeLapse: number) => {
    if (!gameRunning) return;

    const randomIndex = Math.floor(Math.random() * trashItems.length);
    const randomTrash = trashItems[randomIndex];
    const newTrash = document.createElement("div");
    newTrash.classList.add("trash");
    newTrash.textContent = randomTrash.emoji;
    //styling it
    newTrash.style.position = "absolute";
    const top = Math.random() * 80;
    const left = Math.random() * 90;
    newTrash.style.top = `${top}%`;
    newTrash.style.left = `${left}%`;
    newTrash.style.fontSize = "3rem";
    newTrash.style.cursor = "grab";
    // accessibility attributes
    newTrash.setAttribute("tabindex", "0"); // makes it keyboard-focusable
    newTrash.setAttribute("role", "button"); // tells screen readers it's clickable
    newTrash.setAttribute("aria-label", `Trash item: ${randomTrash.emoji}`);
    // adding it to the sea, appending to the box
    trashAreaEl?.appendChild(newTrash);
    const trashTimeout = window.setTimeout(() => {
        newTrash.remove();
        // increment missed count when trash dissapears
        missedCount++;
        updateSeaBrownness(); // calling this to update the brown colour
        if (missedCount > maxMisses) {
            endGame(false);
            return;
        }
        // If the game isn't over, generate another piece of trash.
        trashInTheSea(timeBeforeLapse);
    }, timeBeforeLapse);
    //storing each timeout’s id's
    activeTimeouts.push(trashTimeout);

    // handle clicking trash
    newTrash.addEventListener("click", () => {
        clearTimeout(trashTimeout);
        newTrash.remove();
        score += randomTrash.points;
        updateScore();
        if (score >= winScore) {
            endGame(true);
            return;
        }
        trashInTheSea(timeBeforeLapse);
    });

    // handle keyboard "click"
    newTrash.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            newTrash.click();
        }
    });
};

// Stop game (manual stop)
const stopGame = (): void => {
    gameRunning = false;
    activeTimeouts.forEach((id) => clearTimeout(id));
    activeTimeouts = [];
    // Remove only trash elements, keep background image
    document.querySelectorAll(".trash").forEach((el) => el.remove());
    legendEl.style.display = "none";
    startBtn.textContent = "Start Game";
};

// End game on win or lose
const endGame = (didWin: boolean): void => {
    gameRunning = false;
    activeTimeouts.forEach((id) => clearTimeout(id));
    activeTimeouts = [];
    document.querySelectorAll(".trash").forEach((el) => el.remove());
    legendEl.style.display = "none";

    if (didWin) {
        messageEl.textContent = "🎉 YOU WIN! 🎉";
        const fireworks = new Fireworks(fireworksContainer, {
            hue: { min: 0, max: 360 },
            delay: { min: 15, max: 30 },
            explosion: 5,
            particles: 50,
            brightness: { min: 50, max: 80 },
            autoresize: true,
        });
        fireworks.start();
        //Start sound on fireworks
        fireworksSound.currentTime = 0;
        fireworksSound.play();
        // Stop fireworks after 3 secs
        setTimeout(() => {
            //Pause the sound just before the fireworks stop
            fireworksSound.pause();
            fireworksSound.currentTime = 0;
            fireworks.stop();
            fireworksContainer.innerHTML = "";
            overlayEl.style.backgroundColor = "rgba(0,0,0,0)";
        }, 3000);
    } else {
        // Set overlay to darkest brown
        overlayEl.style.backgroundColor = brownLevels[5];
        // Play lose sound
        loseSound.currentTime = 0;
        loseSound.play();
        messageEl.textContent = "💥 GAME OVER! You missed too many times 💥";
        // After 3 secs., reset overlay
        setTimeout(() => {
            overlayEl.style.backgroundColor = "rgba(0,0,0,0)";
        }, 3000);
    }
    // Stop wave sound when game ends (win or lose)
    waveSound.pause();
    waveSound.currentTime = 0;
    messageEl.style.display = "block";
    startBtn.textContent = "Start Game";
};

// Start or stop game
const startGame = (): void => {
    if (gameRunning) {
        stopGame();
        // Stop wave sound when game is stopped
        waveSound.pause();
        waveSound.currentTime = 0;
    } else {
        gameRunning = true;
        startBtn.textContent = "Stop";
        // Reset game state completely
        score = 0;
        missedCount = 0;
        updateScore();
        // Clear any game over or win messages
        legendEl.style.display = "none";
        messageEl.style.display = "none";
        messageEl.textContent = "";
        // Remove any leftover trash
        document.querySelectorAll(".trash").forEach((el) => el.remove());
        generateLegend();
        trashInTheSea(1300);
        // Play wave sound when game starts
        waveSound.currentTime = 0;
        waveSound.play();
    }
};

startBtn.addEventListener("click", startGame);

// Credit to :
// npm install fireworks-js !!
// https://github.com/crashmax-dev/fireworks-js/blob/master/README.md#fireworks-js
// https://fireworks.js.org/
