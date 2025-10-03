import { evaluateHand } from '../src/hand-evaluator';
import { Card, Suit, Rank, PokerHand } from '../src/types';

describe('evaluateHand', () => {
  it('should identify a High Card', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Five },
      { suit: Suit.Clubs, rank: Rank.Seven },
      { suit: Suit.Spades, rank: Rank.Nine },
      { suit: Suit.Hearts, rank: Rank.King },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.HighCard);
  });

  it('should identify a Pair', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Two },
      { suit: Suit.Clubs, rank: Rank.Seven },
      { suit: Suit.Spades, rank: Rank.Nine },
      { suit: Suit.Hearts, rank: Rank.King },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.Pair);
  });

  it('should identify Two Pair', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Two },
      { suit: Suit.Clubs, rank: Rank.Nine },
      { suit: Suit.Spades, rank: Rank.Nine },
      { suit: Suit.Hearts, rank: Rank.King },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.TwoPair);
  });

  it('should identify Three of a Kind', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Two },
      { suit: Suit.Clubs, rank: Rank.Two },
      { suit: Suit.Spades, rank: Rank.Nine },
      { suit: Suit.Hearts, rank: Rank.King },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.ThreeOfAKind);
  });

  it('should identify a Straight', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Three },
      { suit: Suit.Clubs, rank: Rank.Four },
      { suit: Suit.Spades, rank: Rank.Five },
      { suit: Suit.Hearts, rank: Rank.Six },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.Straight);
  });

  it('should identify an Ace-low Straight', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Ace },
      { suit: Suit.Diamonds, rank: Rank.Two },
      { suit: Suit.Clubs, rank: Rank.Three },
      { suit: Suit.Spades, rank: Rank.Four },
      { suit: Suit.Hearts, rank: Rank.Five },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.Straight);
  });

  it('should identify a Flush', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Hearts, rank: Rank.Five },
      { suit: Suit.Hearts, rank: Rank.Seven },
      { suit: Suit.Hearts, rank: Rank.Nine },
      { suit: Suit.Hearts, rank: Rank.King },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.Flush);
  });

  it('should identify a Full House', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Two },
      { suit: Suit.Clubs, rank: Rank.Two },
      { suit: Suit.Spades, rank: Rank.Nine },
      { suit: Suit.Hearts, rank: Rank.Nine },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.FullHouse);
  });

  it('should identify Four of a Kind', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Diamonds, rank: Rank.Two },
      { suit: Suit.Clubs, rank: Rank.Two },
      { suit: Suit.Spades, rank: Rank.Two },
      { suit: Suit.Hearts, rank: Rank.King },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.FourOfAKind);
  });

  it('should identify a Straight Flush', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Two },
      { suit: Suit.Hearts, rank: Rank.Three },
      { suit: Suit.Hearts, rank: Rank.Four },
      { suit: Suit.Hearts, rank: Rank.Five },
      { suit: Suit.Hearts, rank: Rank.Six },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.StraightFlush);
  });

  it('should identify a Royal Flush', () => {
    const hand: Card[] = [
      { suit: Suit.Hearts, rank: Rank.Ten },
      { suit: Suit.Hearts, rank: Rank.Jack },
      { suit: Suit.Hearts, rank: Rank.Queen },
      { suit: Suit.Hearts, rank: Rank.King },
      { suit: Suit.Hearts, rank: Rank.Ace },
    ];
    expect(evaluateHand(hand)).toBe(PokerHand.RoyalFlush);
  });
});