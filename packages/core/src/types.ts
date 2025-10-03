export type Suit = 'Hearts' | 'Diamonds' | 'Clubs' | 'Spades';

export type Rank = '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'Jack' | 'Queen' | 'King' | 'Ace';

export interface BaseCard {
  suit: Suit;
  rank: Rank;
  spriteSheet: {
    x: number;
    y: number;
  };
}

export type Enhancement = 'Bonus' | 'Mult' | 'Wild' | 'Glass' | 'Steel' | 'Stone' | 'Gold' | 'Lucky';

export type Edition = 'Foil' | 'Holographic' | 'Polychrome' | 'Negative' | 'Base';

export type Seal = 'Gold' | 'Red' | 'Blue' | 'Purple';

export interface Card extends BaseCard {
  id: string; // Unique identifier for the card instance
  enhancement?: Enhancement;
  edition?: Edition;
  seal?: Seal;
}

export type PokerHand =
  | 'Straight Flush'
  | 'Four of a Kind'
  | 'Full House'
  | 'Flush'
  | 'Straight'
  | 'Three of a Kind'
  | 'Two Pair'
  | 'Pair'
  | 'High Card'
  | 'Five of a Kind'
  | 'Flush House'
  | 'Flush Five';

export interface HandLevel {
  level: number;
  chips: number;
  mult: number;
}

export interface HandDefinition {
  name: PokerHand;
  baseChips: number;
  baseMult: number;
}