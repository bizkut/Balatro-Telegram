import type { Card as CardType } from '@balatro-clone/core';
import { Card } from './Card';
import './Hand.css';

interface HandProps {
  cards: CardType[];
  selectedCards: Set<string>;
  onCardClick: (id: string) => void;
}

export function Hand({ cards, selectedCards, onCardClick }: HandProps) {
  return (
    <div className="hand-container">
      <h2>Your Hand</h2>
      <div className="hand">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            isSelected={selectedCards.has(card.id)}
            onClick={onCardClick}
          />
        ))}
      </div>
    </div>
  );
}