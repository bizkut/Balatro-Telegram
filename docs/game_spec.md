# Balatro Canonical Game Specification

This document defines the canonical specification for the game Balatro, based on the original Lua source code. It is intended to be the single source of truth for the TypeScript port.

## 1. Game Entities

This section defines the core entities of the game, their properties, and their base attributes.

### 1.1. Cards

The fundamental building block of the game. A card has a `base` and a `center`.

*   **Base Card**: A standard playing card (e.g., Ace of Spades).
    *   **Properties**:
        *   `Suit`: Hearts, Diamonds, Clubs, Spades.
        *   `Rank`: 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King, Ace.
*   **Center**: The item applied to the card, which can be a Joker, Tarot, Planet, etc. This determines the card's primary function.
*   **Enhancements**: Special modifiers applied to a playing card.
    *   `Bonus Card`: +30 Chips
    *   `Mult Card`: +4 Mult
    *   `Wild Card`: Can be considered any suit.
    *   `Glass Card`: x2 Mult, 1 in 4 chance to be destroyed when scored.
    *   `Steel Card`: x1.5 Mult while in hand.
    *   `Stone Card`: Adds 50 chips, has no rank or suit.
    *   `Gold Card`: Gain $3 at end of round if held in hand.
    *   `Lucky Card`: 1 in 5 chance to get +20 Mult, 1 in 15 chance to get $20.
*   **Editions**: A special finish applied to a Joker card, granting a bonus.
    *   `Foil`: +50 Chips
    *   `Holographic`: +10 Mult
    *   `Polychrome`: x1.5 Mult
    *   `Negative`: +1 Joker slot.
*   **Seals**: A stamp on a playing card that provides an effect.
    *   `Gold Seal`: When played, gain $3.
    *   `Red Seal`: Retriggers the played card one time.
    *   `Blue Seal`: Creates a Planet card when the card is held in hand at the end of a round.
    *   `Purple Seal`: Creates a Tarot card when discarded.

### 1.2. Hands (Poker Hands)

The poker hands that can be played to score points. Each hand has a base `Chips` and `Mult` value, which can be leveled up.

| Hand             | Base Chips | Base Mult | Level Up Bonus         |
| ---------------- | ---------- | --------- | ---------------------- |
| Straight Flush   | 100        | 8         | +40 Chips, +4 Mult     |
| Four of a Kind   | 60         | 7         | +30 Chips, +3 Mult     |
| Full House       | 40         | 4         | +25 Chips, +2 Mult     |
| Flush            | 35         | 4         | +15 Chips, +2 Mult     |
| Straight         | 30         | 4         | +30 Chips, +3 Mult     |
| Three of a Kind  | 30         | 3         | +20 Chips, +2 Mult     |
| Two Pair         | 20         | 2         | +20 Chips, +1 Mult     |
| Pair             | 10         | 2         | +15 Chips, +1 Mult     |
| High Card        | 5          | 1         | +10 Chips, +1 Mult     |
| *Five of a Kind* | 120        | 12        | +35 Chips, +3 Mult     |
| *Flush House*    | 140        | 14        | +40 Chips, +4 Mult     |
| *Flush Five*     | 160        | 16        | +50 Chips, +3 Mult     |

*(Hands in italics must be unlocked)*

### 1.3. Decks (Backs)

Players can choose from different decks at the start of a run, each with unique modifiers.

| Deck          | Modifier                                     |
| ------------- | -------------------------------------------- |
| Red Deck      | +1 Discard                                   |
| Blue Deck     | +1 Hand                                      |
| Yellow Deck   | +$10 at start of run                         |
| Green Deck    | No interest. +$2 per round, +$1 per discard. |
| Black Deck    | -1 Hand Size, +1 Joker Slot                  |
| Magic Deck    | Starts with 2 Fool Tarots, Crystal Ball      |
| Nebula Deck   | Starts with Telescope, -1 Consumable slot    |
| Ghost Deck    | Spectrals appear 2x more, starts with Hex    |
| Abandoned Deck| Starts with no face cards                    |
| Checkered Deck| Starts with 26 Spades, 26 Hearts             |

### 1.4. Blinds

The objective of each round. Players must score a certain number of chips to defeat the blind. Blinds can have special debuffs.

*   **Small Blind**: Low chip requirement, gives a small money reward.
*   **Big Blind**: Medium chip requirement, gives a medium money reward.
*   **Boss Blind**: High chip requirement, gives a large money reward, and has a powerful, often run-altering debuff.

### 1.5. Jokers

Jokers provide passive bonuses and effects that influence the game. They are the primary way to build powerful scoring combinations. (A full list of Joker effects will be in section 4).

### 1.6. Vouchers

Vouchers are permanent upgrades that can be purchased in the shop. (A full list of Voucher effects will be in section 4).

## 2. Core Game Flow

This section details the structure of a game run and the phases within each round. A run consists of a series of "Antes," and each Ante is made up of three rounds: a Small Blind, a Big Blind, and a Boss Blind.

### 2.1. Run Structure

1.  **Start of Run**: The player chooses a Deck, which sets the initial conditions (e.g., starting money, discards, hands).
2.  **Ante Progression**: The player progresses through Antes (Ante 1, Ante 2, etc.). To complete an Ante, the player must defeat the Small, Big, and Boss blinds.
3.  **Win Condition**: A standard run is won by defeating the Boss Blind of Ante 8.
4.  **Loss Condition**: The run ends if the player fails to meet the score requirement for any blind before running out of playable Hands.

### 2.2. Round Phases

Each round (facing a single blind) follows these phases, managed by the game's state machine:

1.  **Blind Selection Phase (`BLIND_SELECT`)**:
    *   At the start of a new Ante or after defeating a blind, the player is presented with a choice of blinds.
    *   The player can choose to play the Small Blind or Big Blind, or skip them to face the Boss Blind directly.
    *   Blinds may have "Tags" which provide a special one-time bonus if that blind is selected and defeated (e.g., a free Joker, extra money).

2.  **Playing Phase (`SELECTING_HAND`, `DRAW_TO_HAND`)**:
    *   The round begins. The player is given a set number of Hands (plays) and Discards.
    *   The player's hand is filled with cards from their deck.
    *   The player can either:
        *   **Play a Hand**: Select up to 5 cards and play them. The hand is evaluated for its poker rank, and a score is calculated. This consumes one "Hand".
        *   **Discard Cards**: Select up to 5 cards to discard. These cards are removed from the hand and replaced with new cards from the deck. This consumes one "Discard".
    *   The goal is to accumulate enough chips to exceed the blind's requirement.

3.  **Round Resolution (`NEW_ROUND`, `ROUND_EVAL`)**:
    *   **Win**: If the player's cumulative score from played hands meets or exceeds the blind's requirement, the round is won.
        *   The player earns money.
        *   Any "Tag" bonus is awarded.
        *   The player proceeds to the Shop phase.
    *   **Loss**: If the player runs out of Hands before meeting the score requirement, the run ends (`GAME_OVER`).

4.  **Shop Phase (`SHOP`)**:
    *   After successfully defeating a blind, the player enters the shop.
    *   Here, the player can spend money to buy:
        *   **Jokers**: Powerful passive-effect cards.
        *   **Booster Packs**: Packs that contain other cards, such as:
            *   *Arcana Packs*: Tarot cards.
            *   *Celestial Packs*: Planet cards.
            *   *Standard Packs*: Playing cards, potentially with enhancements.
            *   *Buffoon Packs*: More Jokers.
        *   **Vouchers**: Permanent run-specific upgrades.
    *   The player can pay to "reroll" the shop's contents.
    *   After leaving the shop, the next round begins with the Blind Selection phase.

## 3. Scoring Mechanics

This section explains how poker hands are evaluated and how scores are calculated. The fundamental formula for scoring a hand is:

**`Total Score = (Total Chips) x (Total Multiplier)`**

### 3.1. Chips Calculation

The "Chips" part of the equation is a flat value determined by adding together several sources:

1.  **Base Hand Chips**: The base chip value of the poker hand played (e.g., a Pair is worth 10 chips).
2.  **Card Chips**: The rank of each card played contributes to the chip total (e.g., an Ace is 11, King/Queen/Jack are 10).
3.  **Enhancement Chips**: Chips from card enhancements like "Bonus Card" (+30 Chips).
4.  **Joker Chips**: Additive chips from various Joker effects.

### 3.2. Multiplier (Mult) Calculation

The "Multiplier" is more complex and involves both additive and multiplicative components. The formula is:

**`Total Multiplier = (Sum of all +Mult sources) * (Product of all xMult sources)`**

1.  **Base Hand Mult**: The base multiplier of the poker hand (e.g., a Pair has a +2 Mult).
2.  **Additive Mult (`+Mult`)**:
    *   Multipliers from scored cards (e.g., "Mult Card" gives +4 Mult).
    *   Additive multipliers from various Joker effects.
    *   These values are all summed up to create a single additive multiplier base.

3.  **Multiplicative Mult (`xMult`)**:
    *   Multipliers from card enhancements like "Glass Card" (x2 Mult).
    *   Multiplicative multipliers from various Joker effects (e.g., "Polychrome" edition gives x1.5 Mult).
    *   These values are multiplied together.

### 3.3. Example Calculation

Let's say a player plays a **Pair of Aces** where one Ace is a **Bonus Card (+30 Chips)** and they have a **Joker** that gives **+4 Mult**.

*   **Chips Calculation**:
    *   Pair Base: 10 Chips
    *   Ace 1: 11 Chips
    *   Ace 2: 11 Chips
    *   Bonus Card Enhancement: +30 Chips
    *   **Total Chips**: 10 + 11 + 11 + 30 = **62**

*   **Mult Calculation**:
    *   Pair Base: +2 Mult
    *   Joker: +4 Mult
    *   **Total Mult**: 2 + 4 = **6**

*   **Final Score**: 62 (Chips) * 6 (Mult) = **372**

## 4. Item Effects

This section provides a detailed list of all items and their specific effects.

### 4.1. Jokers

| Joker Name          | Rarity  | Effect                                                                              |
| ------------------- | ------- | ----------------------------------------------------------------------------------- |
| Joker               | Common  | +4 Mult.                                                                            |
| Greedy Joker        | Common  | +3 Mult per Diamond card scored.                                                    |
| Lusty Joker         | Common  | +3 Mult per Heart card scored.                                                      |
| Wrathful Joker      | Common  | +3 Mult per Spade card scored.                                                      |
| Gluttonous Joker    | Common  | +3 Mult per Club card scored.                                                       |
| Jolly Joker         | Common  | +8 Mult if hand is a Pair.                                                          |
| Zany Joker          | Common  | +12 Mult if hand is a Three of a Kind.                                              |
| Mad Joker           | Common  | +10 Mult if hand is a Two Pair.                                                     |
| Crazy Joker         | Common  | +12 Mult if hand is a Straight.                                                     |
| Droll Joker         | Common  | +10 Mult if hand is a Flush.                                                        |
| Sly Joker           | Common  | +50 Chips if hand is a Pair.                                                        |
| Wily Joker          | Common  | +100 Chips if hand is a Three of a Kind.                                            |
| Clever Joker        | Common  | +80 Chips if hand is a Two Pair.                                                    |
| Devious Joker       | Common  | +100 Chips if hand is a Straight.                                                   |
| Crafty Joker        | Common  | +80 Chips if hand is a Flush.                                                       |
| Half Joker          | Common  | +20 Mult if hand contains 3 or fewer cards.                                         |
| Joker Stencil       | Uncommon| x1 Mult for each empty Joker slot.                                                  |
| Four Fingers        | Uncommon| All Flushes and Straights can be made with 4 cards.                                 |
| Mime                | Uncommon| Retrigger all card-held abilities.                                                  |
| Credit Card         | Common  | Go up to -$20 in debt.                                                              |
| Ceremonial Dagger   | Uncommon| When blind is selected, destroy Joker to the right and permanently add its sell value to this Joker's Mult. |
| Banner              | Common  | +30 Chips for each remaining discard.                                               |
| Mystic Summit       | Common  | +15 Mult when 0 discards are left.                                                  |
| Marble Joker        | Uncommon| Adds a Stone card to your deck when blind is selected.                              |
| Loyalty Card        | Uncommon| x4 Mult every 6th hand played.                                                      |
| 8 Ball              | Common  | Creates a Tarot card if played hand contains a Pair.                                |
| Misprint            | Common  | Adds a random Mult between 0 and 23.                                                |
| Dusk                | Uncommon| Retrigger all played cards at the end of the round.                                 |
| Raised Fist         | Common  | Adds double the rank of the lowest card in hand to Mult.                            |
| Chaos the Clown     | Common  | +1 free reroll per shop.                                                            |
| Fibonacci           | Uncommon| +8 Mult if hand is a Straight Flush, Four of a Kind, or Full House.                 |
| Steel Joker         | Uncommon| This Joker gains x0.2 Mult for each Steel Card in your deck.                        |
| Scary Face          | Common  | +30 Chips if hand contains a face card.                                             |
| Abstract Joker      | Common  | +3 Mult for each Joker card.                                                        |
| Delayed Gratification| Common  | Earn $2 per discard, paid at the end of the round.                                  |
| Hack                | Uncommon| Retriggers the 2, 3, 4, or 5.                                                       |
| Pareidolia          | Uncommon| All cards are considered face cards.                                                |
| Gros Michel         | Common  | +15 Mult. Has a 1 in 6 chance to be destroyed at the end of the round.              |
| Even Steven         | Common  | +4 Mult for each even-ranked card played.                                           |
| Odd Todd            | Common  | +31 Chips for each odd-ranked card played.                                          |
| Scholar             | Common  | +20 Chips and +4 Mult if hand contains an Ace.                                      |
| Business Card       | Common  | 1 in 2 chance for played face cards to give $2.                                     |
| Supernova           | Common  | Adds the number of times poker hand has been played to Mult.                        |
| Ride the Bus        | Common  | +1 Mult per consecutive hand played without a face card. Resets to 0 when a face card is scored. |
| Space Joker         | Uncommon| 1 in 4 chance to upgrade the level of the played poker hand.                        |
| Egg                 | Common  | Gains $3 of sell value at end of round.                                             |
| Burglar             | Uncommon| Gain 3 discards when blind is defeated.                                             |
| Blackboard          | Uncommon| x3 Mult if all cards in hand are Spades or Clubs.                                   |
| Runner              | Common  | Gains +15 chips for each hand played this round.                                    |
| Ice Cream           | Common  | +100 Chips. Loses 5 chips per hand played.                                          |
| DNA                 | Rare    | If first hand of round is a discard, add a copy of the first card played to your hand. |
| Splash              | Common  | Every played card counts in scoring.                                                |
| Blue Joker          | Common  | +2 Chips for each remaining card in your deck.                                      |
| Sixth Sense         | Uncommon| If blind is selected and you have no Spectral cards, create a Spectral card.        |
| Constellation       | Uncommon| Gains x0.1 Mult per Planet card used.                                               |
| Hiker               | Uncommon| Every played card permanently gains +5 Chips.                                       |
| Faceless Joker      | Common  | Earn $5 if hand contains 3 or more face cards.                                      |
| Green Joker         | Common  | +1 Mult per hand played, -1 Mult per discard.                                       |
| Superposition       | Common  | Create a Tarot card if poker hand is a Straight Flush.                              |
| To Do List          | Common  | Earn $4 if poker hand is High Card. The poker hand requirement changes on payout.   |
| Cavendish           | Common  | x3 Mult. 1 in 1000 chance to be destroyed.                                          |
| Card Sharp          | Uncommon| x3 Mult if played poker hand has been played 3 or more times this run.              |
| Red Card            | Common  | +3 Mult. This gain is not affected by other Jokers.                                 |
| Madness             | Uncommon| When blind is selected, gain x0.5 Mult and destroy a random Joker.                  |
| Square Joker        | Common  | +4 Chips if hand contains exactly 4 cards.                                          |
| Seance              | Uncommon| If hand is a Straight Flush, create a random Spectral card.                         |
| Riff-raff           | Common  | When shop is entered, create 2 common Jokers.                                       |
| Vampire             | Uncommon| Gains x0.1 Mult per enhanced card played. Removes enhancements from played cards.   |
| Shortcut            | Common  | Allows Straights to be made with gaps of 1 rank (e.g. 2, 4, 6, 7, 8).               |
| Hologram            | Uncommon| Gains x0.25 Mult per playing card added to your deck.                               |
| Vagabond            | Rare    | Creates a Tarot card if player has $4 or less at end of round.                      |
| Baron               | Rare    | Each King held in hand gives x1.5 Mult.                                             |
| Cloud 9             | Uncommon| Earn $1 for each 9 in your deck at the end of the round.                            |
| Rocket              | Uncommon| +$1 to blind reward. This gets +$2 after every boss blind.                          |
| Obelisk             | Rare    | x0.2 Mult per consecutive hand played of the same poker hand.                       |
| Midas Mask          | Uncommon| All face cards become Gold cards when played.                                       |
| Luchador            | Uncommon| Sell this card to disable the current blind.                                        |
| Photograph          | Common  | First face card played is retriggered.                                              |
| Gift Card           | Uncommon| +$1 to sell value of all items at the end of the round.                             |
| Turtle Bean         | Uncommon| +5 to hand size. Decreases by 1 each round.                                         |
| Erosion             | Uncommon| +4 Mult for each card below a full deck (52).                                       |
| Reserved Parking    | Common  | Each face card has a 1 in 2 chance to give $1 when discarded.                       |
| Mail-In Rebate      | Common  | Earn $5 for each discarded Ace.                                                     |
| To the Moon         | Uncommon| Earn up to $10 interest.                                                            |
| Hallucination       | Common  | 1 in 2 chance to create a Tarot and a Spectral card when opening any booster pack.  |
| Fortune Teller      | Common  | +1 Mult for each Tarot card used this run.                                          |
| Juggler             | Common  | +1 Hand Size.                                                                       |
| Drunkard            | Common  | +1 Discard.                                                                         |
| Stone Joker         | Uncommon| +25 Chips for each Stone Card in your deck.                                         |
| Golden Joker        | Common  | Earn $4 at the end of the round.                                                    |

### 4.2. Tarot Cards

| Tarot Card        | Effect                                                              |
| ----------------- | ------------------------------------------------------------------- |
| The Fool          | Create a copy of the last Tarot or Planet card used.                |
| The Magician      | Enhance 1 selected card to become a Lucky Card.                     |
| The High Priestess| Create 2 random Planet cards.                                       |
| The Empress       | Enhance 1 selected card to become a Mult Card.                      |
| The Emperor       | Create 2 random Tarot cards.                                        |
| The Hierophant    | Enhance 1 selected card to become a Bonus Card.                     |
| The Lovers        | Enhance 1 selected card to become a Wild Card.                      |
| The Chariot       | Enhance 1 selected card to become a Steel Card.                     |
| Justice           | Enhance 1 selected card to become a Glass Card.                     |
| The Hermit        | Double your money (up to $20).                                      |
| The Wheel of Fortune| 1 in 4 chance for a Joker to gain a random edition.               |
| Strength          | Increase the rank of up to 2 selected cards by 1.                   |
| The Hanged Man    | Destroy up to 2 selected cards.                                     |
| Death             | Convert one selected card into a copy of another selected card.     |
| Temperance        | Gain money equal to half the total sell value of your Jokers.       |
| The Devil         | Enhance 1 selected card to become a Gold Card.                      |
| The Tower         | Enhance 1 selected card to become a Stone Card.                     |
| The Star          | Convert up to 3 selected cards to the Diamond suit.                 |
| The Moon          | Convert up to 3 selected cards to the Club suit.                    |
| The Sun           | Convert up to 3 selected cards to the Heart suit.                   |
| Judgement         | Create a random Joker.                                              |
| The World         | Convert up to 3 selected cards to the Spade suit.                   |

### 4.3. Planet Cards

Planet cards (from Celestial Packs) level up a specific poker hand, increasing its base Chips and Mult.

### 4.4. Spectral Cards

| Spectral Card | Effect                                                              |
| ------------- | ------------------------------------------------------------------- |
| Familiar      | Destroy 1 random card from your hand and create 3 enhanced cards.   |
| Grim          | Destroy 1 random card from your hand and create 2 Aces.             |
| Incantation   | Destroy 1 random card from your hand and create 4 random numbered cards. |
| Talisman      | Enhance 1 selected card to become a Gold Card.                      |
| Aura          | Enhance 1 selected card with a random edition.                      |
| Wraith        | Create a random Joker and set your money to $0.                     |
| Sigil         | Convert all cards in your hand to a single random suit.             |
| Ouija         | Convert all cards in your hand to a single random rank.             |
| Ectoplasm     | Add a Negative quality to a random Joker and reduce hand size by 1. |
| Immolate      | Destroy 5 random cards from your hand and gain $20.                 |
| Ankh          | Duplicate a random Joker and destroy all others.                    |
| Deja Vu       | Enhance 1 selected card to have a Red Seal.                         |
| Hex           | Add a Polychrome quality to a random Joker and destroy all others.  |
| Trance        | Enhance 1 selected card to have a Blue Seal.                        |
| Medium        | Enhance 1 selected card to have a Purple Seal.                      |
| Cryptid       | Duplicate a selected card twice.                                    |
| The Soul      | Creates a legendary Joker.                                          |
| Black Hole    | Upgrades all poker hands by 1 level.                                |

### 4.5. Vouchers

| Voucher Name      | Effect                                                      |
| ----------------- | ----------------------------------------------------------- |
| Overstock         | +1 card slot in shop.                                       |
| Clearance Sale    | All cards and packs in shop are 25% off.                    |
| Hone              | Editions appear 2x more often in the shop.                  |
| Reroll Surplus    | Base cost of a shop reroll is reduced by $2.                |
| Crystal Ball      | +1 Consumable slot.                                         |
| Telescope         | Celestial packs always contain the most-played poker hand.  |
| Grabber           | +1 Hand per round.                                          |
| Wasteful          | +1 Discard per round.                                       |
| Tarot Merchant    | Tarot cards appear 2x more often in the shop.               |
| Planet Merchant   | Planet cards appear 2x more often in the shop.              |
| Seed Money        | Max interest is increased to $50.                           |
| Blank             | Does nothing, but can be sold for $10.                      |
| Magic Trick       | Playing cards appear 4x more often in the shop.             |
| Hieroglyph        | Next blind is skipped, but hands and discards are reduced by 1. |
| Director's Cut    | Rerolling the boss blind is free.                           |
| Paint Brush       | +1 Hand size.                                               |