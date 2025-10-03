import { Card, Rank, Suit, PokerHand } from './types';

// Helper function to get the numeric value of a rank for sorting and comparison
const getRankValue = (rank: Rank): number => {
  const rankValues: Record<Rank, number> = {
    [Rank.Two]: 2, [Rank.Three]: 3, [Rank.Four]: 4, [Rank.Five]: 5, [Rank.Six]: 6,
    [Rank.Seven]: 7, [Rank.Eight]: 8, [Rank.Nine]: 9, [Rank.Ten]: 10,
    [Rank.Jack]: 11, [Rank.Queen]: 12, [Rank.King]: 13, [Rank.Ace]: 14,
  };
  return rankValues[rank];
};

// Helper function to count occurrences of each rank in a hand
const getRankCounts = (hand: Card[]): Record<string, number> => {
  const counts: Record<string, number> = {};
  for (const card of hand) {
    counts[card.rank] = (counts[card.rank] || 0) + 1;
  }
  return counts;
};

// Checks for a Flush (all cards of the same suit)
const isFlush = (hand: Card[]): boolean => {
  if (hand.length === 0) return false;
  const firstSuit = hand[0].suit;
  return hand.every(card => card.suit === firstSuit);
};

// Checks for a Straight (five cards of sequential rank)
const isStraight = (hand: Card[]): boolean => {
  if (hand.length < 5) return false;
  const sortedRanks = hand.map(card => getRankValue(card.rank)).sort((a, b) => a - b);
  // Check for Ace-low straight (A, 2, 3, 4, 5)
  if (sortedRanks[0] === 2 && sortedRanks[1] === 3 && sortedRanks[2] === 4 && sortedRanks[3] === 5 && sortedRanks[4] === 14) {
    return true;
  }
  for (let i = 0; i < sortedRanks.length - 1; i++) {
    if (sortedRanks[i + 1] - sortedRanks[i] !== 1) {
      return false;
    }
  }
  return true;
};

export const evaluateHand = (hand: Card[]): PokerHand => {
    if (hand.length !== 5) {
        // For simplicity, we'll focus on 5-card hands for now.
        // Balatro has more complex rules for hands of different sizes.
        return PokerHand.HighCard;
    }

    const rankCounts = getRankCounts(hand);
    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    const flush = isFlush(hand);
    const straight = isStraight(hand);

    if (straight && flush) {
        const sortedRanks = hand.map(card => getRankValue(card.rank)).sort((a, b) => a - b);
        if (sortedRanks[0] === 10) { // Ace, King, Queen, Jack, Ten
            return PokerHand.RoyalFlush;
        }
        return PokerHand.StraightFlush;
    }
    if (counts[0] === 4) return PokerHand.FourOfAKind;
    if (counts[0] === 3 && counts[1] === 2) return PokerHand.FullHouse;
    if (flush) return PokerHand.Flush;
    if (straight) return PokerHand.Straight;
    if (counts[0] === 3) return PokerHand.ThreeOfAKind;
    if (counts[0] === 2 && counts[1] === 2) return PokerHand.TwoPair;
    if (counts[0] === 2) return PokerHand.Pair;

    return PokerHand.HighCard;
};