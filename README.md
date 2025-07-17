# Sea Saver — Game Logic Walkthrough

**This document describes what needs to happen in the Sea Saver game, step by step.**  
**Sea Saver** is a small single-page browser game where you help clean the ocean by clicking on trash emojis before they disappear.

Each piece of trash you clean earns you points, but if you miss it, the ocean gets darker (pollution overlay). The goal is to reach **300 points** before missing **5 trash items**.

This file is my **developer checklist**, helping me track what’s done and what’s still in progress.

---

## Technologies Used

-   **HTML** – semantic page structure
-   **SCSS** – layout, animations, colours, responsive styling
-   **TypeScript** – game logic, state, and DOM handling
-   **Vite** – fast dev server and bundling
-   **Architecture** – No page refresh required

---

## Responsive Mobile-First Design

Using SCSS to:

-   Start with mobile layout first
-   Adjust layout and features for tablet and desktop with mixins
-   Style a full-screen sea/ocean background
-   Show seaweed animations only on desktop
-   Apply pollution overlay that darkens as you miss trash

---

## Game Flow Summary

-   The game uses a photo/ocean image as the background.
-   Trash emojis appear one at a time in random ocean positions.
-   When clicked:
    -   Trash disappears immediately
    -   Score increases and updates in the score bin
    -   A new trash spawns after a short delay
-   If trash is not clicked in time:
    -   It disappears automatically
    -   Missed count increases
    -   Pollution overlay becomes darker
-   The game ends when:
    -   You reach 300 points → **Win** → fireworks overlay + message
    -   You miss 6 trash items → **Game over** → darkened ocean + message

---

## Progress & To-Do List

### HTML

-   [x] Container for ocean background
-   [x] Section for dynamic score display
-   [ ] Section for missed trash count
-   [x] Section for a trash legend
-   [x] Area for dynamically spawning trash
-   [x] Start/Restart button
-   [x] Message zone for win/lose
-   [x] Fireworks overlay container
-   [x] Mobile-first structure
-   [x] Tablet layout
-   [ ] Desktop enhancements (more seaweed and floating fish)

---

### SCSS

-   [x] Full-page sea/ocean background
-   [x] Pollution overlay (darker with each miss)
-   [x] Responsive layout with mixins
-   [x] Orbitron font styling
-   [x] Seaweed animation for desktop
-   [x] Styles for score, title, message zone
-   [ ] Floating trash animation
-   [ ] Styles for dynamically spawned trash
-   [ ] Game Over / Win message transitions
-   [ ] Placeholder for waves animation

---

### TypeScript

-   [x] Make a list of different trash items, each with an emoji and a score value.
-   [x] Connect the game to the page — ocean, score bin, missed count, messages, and legend.
-   [x] Show the trash legend so players know what’s what.
-   [x] Make trash appear in random places inside the ocean zone.

-   [x] When a player clicks trash: remove it, add points to the score, and show new trash right away.
-   [x] Update the score display whenever the score changes.
-   [x] Make trash disappear automatically if it’s not clicked quickly enough.
-   [x] Increase the missed count when trash is missed and darken the ocean overlay.
-   [x] Check if the player has enough points (300) to win the game.
-   [x] Check if the player has missed 6 or more → game over.
-   [x] Show a message when the game is won or lost.
-   [ ] Keep track of which types of trash the player missed (optional).
-   [x] Show a message when the game is won or lost.

---

## Game Logic Summary

### Trash Behavior

-   Array of trash types --> emoji + score value
-   Trash appears in random positions
-   Trash disappears:
    -   On click --> increase score --> spawn next
    -   After timeout --> increase `missedCount`

### Game Conditions

-   Win: score >= 300
-   show fireworks + win message

-   Lose: missedCount >= 6
-   show dark overlay + game over message

-   Restart:
-   Reset score, missed count, state
-   Remove all trash from DOM
-   Hide overlays and messages
-   Spawn a new trash item immediately

---

## No Page Refresh

The game is a single-page app — the DOM is updated dynamically. Restarting the game does not reload the page.

The **Start/Stop** button:

-   Clears any current trash from the sea
-   Resets:
    -   Score
    -   Missed count
    -   Overlay opacity
-   Hides:
    -   Win or lose messages
    -   Fireworks animation
-   Spawns the first trash item in a new position

---

## Future Features

-   [ ] Animate floating trash (gentle motion)
-   [ ] Add sound effects for:
    -   Clicking trash
    -   Game over
    -   Win celebration
-   [ ] Swimming fish emojis using CSS keyframes
-   [ ] Show a list of missed trash items on Game Over
-   [ ] Add levels (faster spawn rate as difficulty increases)

---

## Installation & Run Instructions

# 1. Clone the repository

git clone
cd sea-saver

# 2. Install dependencies

npm install

# 3. Start the development server

npm run dev

---

Built by **Desi Lee** 💙
