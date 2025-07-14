import "./scss/styles.scss";

const seaEl = document.querySelector<HTMLDivElement>(".game__sea");

const scoreEl = document.querySelector<HTMLSpanElement>(".game__score");
const binScoreEl = document.querySelector<HTMLSpanElement>(".bin-score");
// const livesEl = document.querySelector<HTMLDivElement>(".game__lives");
const legendEl = document.querySelector<HTMLDivElement>(".game__legend");
// const messageEl = document.querySelector<HTMLDivElement>(".game__message");
const startBtn = document.querySelector<HTMLButtonElement>(
    ".game__start-button"
);

// DEFINING TRASH ITEMS AND STATE
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
// let lives = 3;
// const winScore = 500;
// const missedTrash: string[] = [];

// UPDATING THE SCORE TO MATCH THE CURRENT SCORE VALUE
const updateScore = (): void => {
    if (scoreEl) {
        scoreEl.textContent = score.toString();
    }
    if (binScoreEl) {
        binScoreEl.textContent = score.toString();
    }
};

if (!legendEl || !startBtn || !seaEl) {
    throw new Error("One or more required elements were not found");
}

// LEGEND DISPLAYS AFTER THE USER CLICKS ON START BUTTON

const generateLegend = (): void => {
    legendEl.style.display = "block"; // display the legend
    legendEl.innerHTML = ""; // clear the old legend
    legendEl.innerHTML = `<div class="legend__item">Legend: 1 emoji = 10 points</div>`; // add the legend
};

// GENERATE TRASH IN RANDOM SPOT

const trashInTheSea = (timeBeforeLapse: number) => {
    // pick a random trash from the array
    const randomIndex = Math.floor(Math.random() * trashItems.length);
    const randomTrash = trashItems[randomIndex];

    // creating a new div for the trash
    const newTrash = document.createElement("div");
    newTrash.textContent = randomTrash.emoji;

    // Styling it
    newTrash.style.position = "absolute";
    const top = Math.random() * 80;
    const left = Math.random() * 90;
    newTrash.style.top = `${top}%`;
    newTrash.style.left = `${left}%`;
    newTrash.style.fontSize = "3rem";
    newTrash.style.cursor = "grab";

    // Adding it to the sea
    seaEl.appendChild(newTrash);

    const trashTimeout = setTimeout(() => {
        newTrash.remove();
        trashInTheSea(timeBeforeLapse);
    }, timeBeforeLapse);

    // HANDLE CLICKING TRASH
    newTrash.addEventListener("click", () => {
        console.log("clicked trash");

        clearTimeout(trashTimeout);
        newTrash.remove();
        score += randomTrash.points;
        updateScore();
        trashInTheSea(timeBeforeLapse);
    });
};

// start game - executing all functions on btn click
const startGame = (): void => {
    generateLegend();
    trashInTheSea(1200);
};

if (startBtn) {
    startBtn.addEventListener("click", startGame);
}
