import type { Card, PokerHand, Suit, Rank } from '../types';
import { RANKS } from '../constants/cards';

// Helper to get the numerical value of a rank for sorting
const getRankValue = (rank: Rank): number => RANKS.indexOf(rank);

export function evaluateHand(cards: Card[]): PokerHand {
  if (cards.length === 0) {
    return 'High Card';
  }

  const sortedCards = [...cards].sort((a, b) => getRankValue(b.rank) - getRankValue(a.rank));

  const ranks = sortedCards.map(c => c.rank);
  const suits = sortedCards.map(c => c.suit);

  const rankCounts = ranks.reduce((acc, rank) => {
    acc[rank] = (acc[rank] || 0) + 1;
    return acc;
  }, {} as Record<Rank, number>);

  const suitCounts = suits.reduce((acc, suit) => {
    acc[suit] = (acc[suit] || 0) + 1;
    return acc;
  }, {} as Record<Suit, number>);

  const counts = Object.values(rankCounts).sort((a, b) => b - a);
  const isFlush = cards.length >= 5 && Object.values(suitCounts).some(count => count >= 5);

  const isStraight = (() => {
    if (cards.length < 5) return false;
    const uniqueRanks = [...new Set(sortedCards.map(c => getRankValue(c.rank)))].sort((a, b) => a - b);
    if (uniqueRanks.length < 5) return false;

    // Ace-low straight (A, 2, 3, 4, 5)
    const aceLowRanks = ['Ace', '2', '3', '4', '5'].map(r => getRankValue(r as Rank));
    if (aceLowRanks.every(rank => uniqueRanks.includes(rank))) {
      return true;
    }

    // Standard straight check
    for (let i = 0; i <= uniqueRanks.length - 5; i++) {
      let isSequence = true;
      for (let j = 1; j < 5; j++) {
        if (uniqueRanks[i + j] - uniqueRanks[i] !== j) {
          isSequence = false;
          break;
        }
      }
      if (isSequence) return true;
    }

    return false;
  })();

  if (isStraight && isFlush) return 'Straight Flush';
  if (counts[0] === 4) return 'Four of a Kind';
  if (counts[0] === 3 && counts[1] === 2) return 'Full House';
  if (isFlush) return 'Flush';
  if (isStraight) return 'Straight';
  if (counts[0] === 3) return 'Three of a Kind';
  if (counts[0] === 2 && counts[1] === 2) return 'Two Pair';
  if (counts[0] === 2) return 'Pair';

  return 'High Card';
}