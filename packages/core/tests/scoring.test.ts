import { describe, it, expect } from 'vitest';
import { calculateScore } from '../src/lib/scoring';
import { Card } from '../src/lib/Card';

describe('calculateScore', () => {
  it('should calculate the score for a High Card', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'King' }),
      new Card({ suit: 'Diamonds', rank: '7' }),
    ];
    const result = calculateScore(hand, 'High Card');

    // Chips: 5 (base) + 10 (King) + 7 (7) = 22
    // Mult: 1 (base)
    // Total: 22 * 1 = 22
    expect(result.chips).toBe(22);
    expect(result.mult).toBe(1);
    expect(result.totalScore).toBe(22);
  });

  it('should calculate the score for a Pair', () => {
    const hand = [
      new Card({ suit: 'Hearts', rank: 'Ace' }),
      new Card({ suit: 'Diamonds', rank: 'Ace' }),
    ];
    const result = calculateScore(hand, 'Pair');

    // Chips: 10 (base) + 11 (Ace) + 11 (Ace) = 32
    // Mult: 2 (base)
    // Total: 32 * 2 = 64
    expect(result.chips).toBe(32);
    expect(result.mult).toBe(2);
    expect(result.totalScore).toBe(64);
  });

  it('should calculate the score for a Flush', () => {
    const hand = [
      new Card({ suit: 'Clubs', rank: '2' }),
      new Card({ suit: 'Clubs', rank: '5' }),
      new Card({ suit: 'Clubs', rank: '8' }),
      new Card({ suit: 'Clubs', rank: 'Jack' }),
      new Card({ suit: 'Clubs', rank: 'King' }),
    ];
    const result = calculateScore(hand, 'Flush');

    // Chips: 35 (base) + 2 + 5 + 8 + 10 + 10 = 70
    // Mult: 4 (base)
    // Total: 70 * 4 = 280
    expect(result.chips).toBe(70);
    expect(result.mult).toBe(4);
    expect(result.totalScore).toBe(280);
  });

  it('should throw an error for an invalid hand type', () => {
    const hand = [new Card({ suit: 'Hearts', rank: '2' })];
    // @ts-expect-error - Testing invalid hand type
    expect(() => calculateScore(hand, 'Invalid Hand')).toThrow('Invalid hand: Invalid Hand');
  });
});