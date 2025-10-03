import type { Card, PokerHand, HandDefinition } from '../types';
import { POKER_HANDS } from '../constants/hands';

export interface ScoreResult {
  hand: PokerHand;
  chips: number;
  mult: number;
  totalScore: number;
}

export function calculateScore(playedCards: Card[], hand: PokerHand): ScoreResult {
  const handDefinition = POKER_HANDS.find(h => h.name === hand);

  if (!handDefinition) {
    throw new Error(`Invalid hand: ${hand}`);
  }

  // Base chips and mult from the hand definition
  let chips = handDefinition.baseChips;
  let mult = handDefinition.baseMult;

  // Add chips from card ranks
  playedCards.forEach(card => {
    chips += card.value;
  });

  // This is a simplified version. Enhancements, Jokers, and other modifiers will be added later.

  const totalScore = chips * mult;

  return {
    hand,
    chips,
    mult,
    totalScore,
  };
}