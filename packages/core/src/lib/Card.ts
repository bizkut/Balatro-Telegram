import type { Suit, Rank, Enhancement, Edition, Seal, BaseCard } from '../types';
import { nanoid } from 'nanoid';

export class Card {
  public id: string;
  public suit: Suit;
  public rank: Rank;
  public enhancement?: Enhancement;
  public edition?: Edition;
  public seal?: Seal;

  constructor(baseCard: BaseCard, id?: string) {
    this.id = id ?? nanoid();
    this.suit = baseCard.suit;
    this.rank = baseCard.rank;
  }

  public get value(): number {
    switch (this.rank) {
      case 'Ace': return 11;
      case 'King':
      case 'Queen':
      case 'Jack':
      case '10':
        return 10;
      default:
        return parseInt(this.rank, 10);
    }
  }

  public toString(): string {
    return `${this.rank} of ${this.suit}`;
  }
}