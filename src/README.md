# Sea Saver — Game Logic Walkthrough

**This document describes what needs to happen in the Sea Saver game, step by step.**
**Sea Saver** is a small single page app game I’m building where you help clean the ocean by clicking on trash emojis before they disappear.

Each piece of trash you clean earns you points, but if you miss it, you lose a life. The goal is to hit 500 points to save the ocean.

This README is my **developer checklist** so I can keep track of what’s done and what’s still left to build.

---

## Technologies Used

-   HTML - page structure
-   SCSS - styling, colours, animations and responsive design
-   TypeScript - game logic
-   No page refresh required during gameplay

## Responsive Mobile-First Design

-   Use SCSS to:
    -   Design for mobile first.
    -   Adjust layout and sizes for larger screens using mixins.
    -   Style the ocean background

## How It Works (or Will Work!)

-   The game has an ocean photo as the background.
-   Trash emojis pop up randomly in the ocean.
-   When you click trash:
    -   It disappears instantly.
    -   Your score goes up and updates in the bin.
    -   A new piece of trash spawns right away.
-   If you don’t click fast enough:
    -   The trash disappears by itself.
    -   You lose a life.
-   You start with 3 lives.
-   The game ends when:
    -   You reach 500 points → **You win!**
    -   Or you run out of lives → **Game over!**

---

## Progress & To-Do List

Here’s what I’ve already built vs. what’s still pending.

---

### HTML

-   [x] Container for the ocean background
-   [x] Section for the score (the bin)
-   [x] Section for lives display
-   [x] Section for a trash legend (HTML only for now)
-   [x] Area for dynamic trash elements
-   [x] Mobile-first layout structure
-   [ ] Tablet layout structure
-   [ ] Desktop layout structure

---

### SCSS

-   [x] Ocean background fills the whole page
-   [x] Placeholder for animated waves (HTML ready but animations not coded yet)
-   [x] Styles for titles and layout
-   [x] Styles for score and lives display
-   [x] Basic styling for the legend box
-   [ ] Animations for trash appearing/disappearing
-   [ ] Styling for dynamically spawned trash
-   [ ] Game Over / Win message styles

---

### TypeScript

-   [ ] Make a list of different trash items, each with a picture (emoji) and a score value.
-   [ ] Connect the game to the parts of the page that show the ocean, score, lives, messages, and legend.
-   [ ] Show the trash legend so players can see which trash is worth how many points.
-   [ ] Make trash appear in random places in the ocean.
-   [ ] When a player clicks trash, remove it, add points to the score, and show new trash right away.
-   [ ] Update the score display whenever the score changes.
-   [ ] Make trash disappear automatically if it’s not clicked quickly enough.
-   [ ] If trash disappears on its own, take away one life from the player.
-   [ ] Show fewer hearts each time the player loses a life.
-   [ ] Check if the player has enough points to win the game.
-   [ ] Check if the player has no lives left and loses the game.
-   [ ] Show a message when the game is won or lost.
-   [ ] Keep track of which types of trash the player missed.
-   [ ] Clear all trash from the ocean when the game ends.

---

## Note on No Page Refresh

This game is designed so that **no page refresh is required during gameplay.**

Instead of reloading the entire page to restart the game, there will be a permanent Start/Restart button on the screen.

When clicked, the button will:

-   Remove any trash currently in the sea.
-   Reset the score to zero and show it.
-   Reset lives to 3 and show the hearts.
-   Hide any win or lose messages.
-   Generate the first piece of trash in a random spot.

All of this happens dynamically in the browser, without needing a page refresh. This keeps the game smooth and fast, and ensures it stays a single-page experience.

---

### Future Ideas

Here are some ideas I’d love to add once the core game is working:

-   [ ] Change sea color when trash is missed (e.g. more polluted look)
-   [ ] Add sound effects for trash clicks or losing lives
-   [ ] Waves gently move across the screen.
-   [ ] Animate trash gently floating rather than static
-   [ ] Show missed trash visually on Game Over
-   [ ] Add levels with faster trash spawns as difficulty increases
-   [ ] When you lose the game:
    -   Fade the whole screen to dark colour.
    -   Play a dramatic “game over” sound effect

---
