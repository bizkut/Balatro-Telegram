export enum Suit {
  Hearts = 'Hearts',
  Clubs = 'Clubs',
  Diamonds = 'Diamonds',
  Spades = 'Spades',
}

export enum Rank {
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10',
  Jack = 'Jack',
  Queen = 'Queen',
  King = 'King',
  Ace = 'Ace',
}

export interface Card {
  id: string;
  name: string;
  rank: Rank;
  suit: Suit;
}

export interface Player {
  id:string;
  name: string;
  hand: Card[];
  jokers: any[]; // Using 'any' for now to keep it simple
  money: number;
  score: number;
}

export interface GameState {
  id: string;
  players: Player[];
  deck: Card[];
  discardPile: Card[];
  round: number;
  currentPlayerId: string;
}