import type { Card as CardType } from '@balatro-clone/core';
import { Card } from './Card';
import './PlayArea.css';

interface PlayAreaProps {
  cards: CardType[];
}

export function PlayArea({ cards }: PlayAreaProps) {
  return (
    <div className="play-area-container">
      <h2>Played Hand</h2>
      <div className="play-area">
        {cards.length > 0 ? (
          cards.map((card) => <Card key={card.id} card={card} />)
        ) : (
          <div className="empty-play-area">Play cards here</div>
        )}
      </div>
    </div>
  );
}