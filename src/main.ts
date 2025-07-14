import "./scss/styles.scss";

// const sea = document.querySelector<HTMLDivElement>(".game__sea");
// const scoreEl = document.querySelector<HTMLSpanElement>(".game__score");
// const livesEl = document.querySelector<HTMLDivElement>(".game__lives");
const legendEl = document.querySelector<HTMLDivElement>(".game__legend");
// const messageEl = document.querySelector<HTMLDivElement>(".game__message");
const startBtn = document.querySelector<HTMLButtonElement>(
    ".game__start-button"
);

// defining trashitems and state
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

// let score = 0;
// let lives = 3;
// const winScore = 500;
// const missedTrash: string[] = [];

const generateLegend = (): void => {
    if (!legendEl) {
        throw new Error("Legend has not been found");
    }

    legendEl.style.display = "block"; // display the legend
    legendEl.innerHTML = ""; // clear the old legend
    legendEl.innerHTML = `<div class="legend__item">Legend: 1 emoji = 10 points</div>`; // add the legend
};

if (startBtn) {
    startBtn.addEventListener("click", () => {
        generateLegend();
        console.log("legend generated");
    });
}

///2.
// --generate trash in random spot--
//generate the trash legend
//pick a random emoji --->  math.random
//generate a trash emoji in a random spot
//when you click on the emoji, remove it, increase the score, create new
//random emoji, clear the current timeout and add the new emoji
//

///3.
// increase the player score
//check if the score is >= than the winning score, if yes - you win!

//4 missing piece of trash
// reduce the number of player lives by 1 (i.e. from 3 to 2 )
// update the text to show the new number of lives
// maybe? reduce the hearts left for each time the user loses (if lives=2, you get 2)
// end the game if lives reach 0

///5. end of game
// set the msg text depending on the result
//if the result is win, display - you saved the sea, otherwise -game over
//
