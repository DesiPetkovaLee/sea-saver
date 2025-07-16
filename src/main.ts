import "./scss/styles.scss";

const seaEl = document.querySelector<HTMLDivElement>(".game__sea");
const scoreEl = document.querySelector<HTMLSpanElement>(".game__score");
const binScoreEl = document.querySelector<HTMLSpanElement>(".bin-score");
const legendEl = document.querySelector<HTMLDivElement>(".game__legend");
const messageEl = document.querySelector<HTMLDivElement>(".game__message");
const startBtn = document.querySelector<HTMLButtonElement>(
    ".game__start-button"
);
const trashAreaEl = document.querySelector<HTMLDivElement>(".game__trash-area");

if (!legendEl || !startBtn || !seaEl || !scoreEl || !binScoreEl || !messageEl) {
    throw new Error("One or more elements were not found");
}

// game state and defining trash items

type TrashItem = {
    emoji: string;
    points: number;
};

const trashItems: TrashItem[] = [
    { emoji: "🥤", points: 10 },
    { emoji: "🦴", points: 6 },
    { emoji: "🍕", points: 7 },
    { emoji: "🧃", points: 20 },
    { emoji: "👕", points: 11 },
    { emoji: "🧤", points: 14 },
    { emoji: "🥫", points: 22 },
    { emoji: "🧋", points: 18 },
];

let score = 0;
let gameRunning = false;
let activeTimeouts: number[] = [];
const winScore = 300;
let missedCount = 0;
const maxMisses = 5;

// Updating score display to match the current value
const updateScore = (): void => {
    scoreEl.textContent = score.toString();
    binScoreEl.textContent = score.toString();
};

// Generating legend
const generateLegend = (): void => {
    legendEl.style.display = "block";
    legendEl.innerHTML = "";
    legendEl.innerHTML = `<div class="legend__item">1 emoji = 10 points</div>`;
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
    // adding it to the sea, appending to the box
    trashAreaEl?.appendChild(newTrash);

    const trashTimeout = window.setTimeout(() => {
        newTrash.remove();
        // increment missed count when trash dissapears
        missedCount++;
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

// End game on win
const endGame = (didWin: boolean): void => {
    gameRunning = false;

    activeTimeouts.forEach((id) => clearTimeout(id));
    activeTimeouts = [];

    document.querySelectorAll(".trash").forEach((el) => el.remove());

    legendEl.style.display = "none";

    messageEl.textContent = didWin
        ? "🎉 YOU WIN! 🎉"
        : "💥 GAME OVER! You missed too many times 💥";
    messageEl.style.display = "block";

    startBtn.textContent = "Start Game";
};

// Start or stop game
const startGame = (): void => {
    if (gameRunning) {
        stopGame();
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
        trashInTheSea(1350);
    }
};

startBtn.addEventListener("click", startGame);
