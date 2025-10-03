import { Deck } from '../src/deck';
import { Card } from '../src/types';

describe('Deck', () => {
  let deck: Deck;

  beforeEach(() => {
    deck = new Deck();
  });

  it('should be created with 52 cards', () => {
    expect(deck.getCardsCount()).toBe(52);
  });

  it('should have a unique set of cards', () => {
    const cards = deck.draw(52);
    const cardSet = new Set(cards.map(c => `${c.rank}-${c.suit}`));
    expect(cardSet.size).toBe(52);
  });

  it('should shuffle the cards', () => {
    const originalOrder = JSON.stringify(deck.draw(52));
    deck = new Deck();
    deck.shuffle();
    const shuffledOrder = JSON.stringify(deck.draw(52));
    expect(originalOrder).not.toBe(shuffledOrder);
  });

  it('should draw a specified number of cards', () => {
    const drawnCards = deck.draw(5);
    expect(drawnCards.length).toBe(5);
    expect(deck.getCardsCount()).toBe(47);
  });

  it('should throw an error if trying to draw more cards than available', () => {
    expect(() => deck.draw(53)).toThrow('Not enough cards in the deck to draw.');
  });
});