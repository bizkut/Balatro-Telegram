import type { Suit, Rank, BaseCard } from '../types';

export const SUITS: Suit[] = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
export const RANKS: Rank[] = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

const suitYMap: Record<Suit, number> = {
  Hearts: 0,
  Clubs: 1,
  Diamonds: 2,
  Spades: 3,
};

export const STANDARD_DECK: BaseCard[] = SUITS.flatMap(suit =>
  RANKS.map((rank, index) => ({
    suit,
    rank,
    spriteSheet: {
      x: index,
      y: suitYMap[suit],
    },
  }))
);