import { describe, it, expect } from 'vitest';
import { Card } from '../src/lib/Card';

describe('Card', () => {
  it('should create a card with the correct suit and rank', () => {
    const card = new Card({ suit: 'Hearts', rank: 'Ace' });
    expect(card.suit).toBe('Hearts');
    expect(card.rank).toBe('Ace');
  });

  it('should generate a unique ID if one is not provided', () => {
    const card1 = new Card({ suit: 'Spades', rank: '2' });
    const card2 = new Card({ suit: 'Spades', rank: '2' });
    expect(card1.id).toBeDefined();
    expect(card2.id).toBeDefined();
    expect(card1.id).not.toBe(card2.id);
  });

  it('should use the provided ID', () => {
    const card = new Card({ suit: 'Diamonds', rank: 'King' }, 'custom-id-123');
    expect(card.id).toBe('custom-id-123');
  });

  it('should return the correct chip value for numeric ranks', () => {
    const card = new Card({ suit: 'Clubs', rank: '7' });
    expect(card.value).toBe(7);
  });

  it('should return the correct chip value for face cards', () => {
    const jack = new Card({ suit: 'Hearts', rank: 'Jack' });
    const queen = new Card({ suit: 'Hearts', rank: 'Queen' });
    const king = new Card({ suit: 'Hearts', rank: 'King' });
    expect(jack.value).toBe(10);
    expect(queen.value).toBe(10);
    expect(king.value).toBe(10);
  });

  it('should return the correct chip value for an Ace', () => {
    const ace = new Card({ suit: 'Spades', rank: 'Ace' });
    expect(ace.value).toBe(11);
  });

  it('should return a correct string representation', () => {
    const card = new Card({ suit: 'Diamonds', rank: 'Queen' });
    expect(card.toString()).toBe('Queen of Diamonds');
  });
});