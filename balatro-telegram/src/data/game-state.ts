import { cards } from './cards';
import { jokers } from './jokers';

export interface CardData {
    name: string;
    suit?: string;
    value?: string;
    effect?: string;
}

export interface GameState {
    deck: CardData[];
    hand: CardData[];
    jokers: CardData[];
    discards: number;
    hands: number;
    money: number;
}

export const initialGameState: GameState = {
    deck: Object.values(cards),
    hand: [],
    jokers: [jokers['j_joker']],
    discards: 3,
    hands: 4,
    money: 10,
};