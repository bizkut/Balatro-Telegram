# Balatro Game Analysis

This document provides an analysis of the original Balatro source code, with the goal of porting it to a TypeScript-based web application for Telegram Mini Apps.

## File Structure

The `Balatro/` directory contains the Lua source code for the game, built on the LÖVE2D framework.

*   `main.lua`: The main entry point of the game. It initializes the game window, handles the game loop, and manages user input events.
*   `conf.lua`: Configuration file for the LÖVE2D engine, specifying window properties, modules, etc.
*   `game.lua`: Contains the core game logic, including the main state machine that drives the game.
*   `globals.lua`: Defines the global state object `G`, which holds all the game's state.
*   `card.lua`: Defines the `Card` object and related functions.
*   `engine/`: Contains the LÖVE2D game engine components.
*   `functions/`: Contains various helper functions used throughout the game.
*   `resources/`: Contains game assets like fonts and images.
*   `localization/`: Contains localization files for different languages.

## Game Architecture and Logic

The game is built using the LÖVE2D framework and written in Lua. The architecture is centered around a global state object and a state machine that controls the flow of the game.

### Core Components

*   **Global State (`G` object)**: Defined in `globals.lua` and initialized in `game.lua`, the `G` object is a massive singleton that holds almost all of the game's state. This includes:
    *   Game settings and player profiles.
    *   Timers, colors, and constants.
    *   The current game state (`G.STATE`) and stage (`G.STAGE`).
    *   Instances of all major game objects (cards, UI elements, etc.).
    *   This monolithic approach will need to be refactored into a more modular state management system (e.g., using Zustand or Redux Toolkit) in the TypeScript port.

*   **Game Loop**: The main game loop is managed by `love.run()` in `main.lua`, which calls `G:update(dt)` and `G:draw()` on every frame.

*   **State Machine**: The game's logic is driven by a state machine in `game.lua`. The `G.STATE` variable determines the current state (e.g., `SELECTING_HAND`, `SHOP`, `GAME_OVER`), and the main `Game:update()` function calls the appropriate update function for the current state (e.g., `Game:update_selecting_hand()`).

*   **Data-Driven Design**: A significant portion of the game's content is defined as large tables of data in `game.lua`. The `init_item_prototypes()` function initializes prototypes for all cards, jokers, vouchers, blinds, and other items. This data-driven approach makes it easier to manage and balance the game's content. These tables will be ported to TypeScript, likely as JSON files or exported constants.

### Card System

*   The `Card` class, defined in `card.lua`, is a versatile object that can represent not only standard playing cards but also jokers, consumables, vouchers, and more.
*   A card's behavior and appearance are determined by its `base` (e.g., "Ace of Spades") and its `center` (e.g., "Joker", "Bonus Card").
*   Special abilities, editions (Foil, Holo), and seals (Gold, Red) are applied to cards, modifying their properties and behavior.
*   The card system is highly modular and data-driven, making it relatively straightforward to port the logic to TypeScript classes.

### Configuration

*   `conf.lua`: This is the standard LÖVE2D configuration file. It sets the window title and dimensions.
*   `globals.lua`: Contains a large number of feature flags (`F_...`) that enable or disable functionality for different platforms (e.g., consoles, PC). This will be important for deciding which features to include in the Telegram Mini App version.