import { Card, Suit, Rank } from './types';

export class Deck {
  private cards: Card[] = [];

  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const suits = Object.values(Suit);
    const ranks = Object.values(Rank);

    for (const suit of suits) {
      for (const rank of ranks) {
        this.cards.push({ suit, rank });
      }
    }
  }

  public shuffle(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  public draw(count: number = 1): Card[] {
    const drawnCards = this.cards.splice(0, count);
    if (drawnCards.length < count) {
      // Or handle this scenario as a game rule, e.g., reshuffle discard pile
      throw new Error('Not enough cards in the deck to draw.');
    }
    return drawnCards;
  }

  public getCardsCount(): number {
    return this.cards.length;
  }
}