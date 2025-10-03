import type { Suit, Rank, Enhancement, Edition, Seal, BaseCard } from '../types';
import { nanoid } from 'nanoid';

export class Card implements BaseCard {
  public id: string;
  public suit: Suit;
  public rank: Rank;
  public spriteSheet: { x: number; y: number };
  public enhancement?: Enhancement;
  public edition?: Edition;
  public seal?: Seal;

  constructor(baseCard: BaseCard, id?: string) {
    this.id = id ?? nanoid();
    this.suit = baseCard.suit;
    this.rank = baseCard.rank;
    this.spriteSheet = baseCard.spriteSheet;
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