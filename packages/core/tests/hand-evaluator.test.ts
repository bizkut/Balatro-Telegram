import { describe, it, expect } from 'vitest';
import { evaluateHand } from '../src/lib/hand-evaluator';
import { Card } from '../src/lib/Card';

describe('evaluateHand', () => {
  it('should identify a High Card', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: '2' }),
      new Card({ suit: 'Diamonds', rank: '5' }),
      new Card({ suit: 'Clubs', rank: '8' }),
      new Card({ suit: 'Spades', rank: 'Jack' }),
      new Card({ suit: 'Hearts', rank: 'King' }),
    ];
    expect(evaluateHand(hand)).toBe('High Card');
  });

  it('should identify a Pair', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: 'Ace' }),
      new Card({ suit: 'Clubs', rank: '8' }),
      new Card({ suit: 'Spades', rank: 'Jack' }),
      new Card({ suit: 'Hearts', rank: 'King' }),
    ];
    expect(evaluateHand(hand)).toBe('Pair');
  });

  it('should identify a Two Pair', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: 'Ace' }),
      new Card({ suit: 'Clubs', rank: '8' }),
      new Card({ suit: 'Spades', rank: '8' }),
      new Card({ suit: 'Hearts', rank: 'King' }),
    ];
    expect(evaluateHand(hand)).toBe('Two Pair');
  });

  it('should identify a Three of a Kind', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: 'Ace' }),
      new Card({ suit: 'Clubs', rank: 'Ace' }),
      new Card({ suit: 'Spades', rank: '8' }),
      new Card({ suit: 'Hearts', rank: 'King' }),
    ];
    expect(evaluateHand(hand)).toBe('Three of a Kind');
  });

  it('should identify a Straight', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: '5' }),
      new Card({ suit: 'Diamonds', rank: '6' }),
      new Card({ suit: 'Clubs', rank: '7' }),
      new Card({ suit: 'Spades', rank: '8' }),
      new Card({ suit: 'Hearts', rank: '9' }),
    ];
    expect(evaluateHand(hand)).toBe('Straight');
  });

  it('should identify an Ace-low Straight', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: '2' }),
      new Card({ suit: 'Clubs', rank: '3' }),
      new Card({ suit: 'Spades', rank: '4' }),
      new Card({ suit: 'Hearts', rank: '5' }),
    ];
    expect(evaluateHand(hand)).toBe('Straight');
  });

  it('should identify a Flush', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: '2' }),
      new Card({ suit: 'Hearts', rank: '5' }),
      new Card({ suit: 'Hearts', rank: '8' }),
      new Card({ suit: 'Hearts', rank: 'Jack' }),
      new Card({ suit: 'Hearts', rank: 'King' }),
    ];
    expect(evaluateHand(hand)).toBe('Flush');
  });

  it('should identify a Full House', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: 'Ace' }),
      new Card({ suit: 'Clubs', rank: 'Ace' }),
      new Card({ suit: 'Spades', rank: '8' }),
      new Card({ suit: 'Hearts', rank: '8' }),
    ];
    expect(evaluateHand(hand)).toBe('Full House');
  });

  it('should identify a Four of a Kind', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: 'Ace' }),
      new Card({ suit: 'Clubs', rank: 'Ace' }),
      new Card({ suit: 'Spades', rank: 'Ace' }),
      new Card({ suit: 'Hearts', rank: '8' }),
    ];
    expect(evaluateHand(hand)).toBe('Four of a Kind');
  });

  it('should identify a Straight Flush', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: '5' }),
      new Card({ suit: 'Hearts', rank: '6' }),
      new Card({ suit: 'Hearts', rank: '7' }),
      new Card({ suit: 'Hearts', rank: '8' }),
      new Card({ suit: 'Hearts', rank: '9' }),
    ];
    expect(evaluateHand(hand)).toBe('Straight Flush');
  });

  it('should return High Card for an empty hand', () => {
    expect(evaluateHand([])).toBe('High Card');
  });
});