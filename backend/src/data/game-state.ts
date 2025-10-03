import { Card } from './cards';
import { Joker } from './jokers';

export interface Player {
  id: string;
  name: string;
  hand: Card[];
  jokers: Joker[];
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
  // More properties will be added here as the game logic is built out.
  // For example: blinds, ante, shop, etc.
}