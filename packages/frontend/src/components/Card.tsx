import type { Card as CardType } from '@balatro-clone/core';
import './Card.css';

interface CardProps {
  card: CardType;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

export function Card({ card, isSelected, onClick }: CardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  // The dimensions of a single card on the spritesheet
  const CARD_WIDTH = 71;
  const CARD_HEIGHT = 95;

  const style = {
    '--sprite-x': `${-card.spriteSheet.x * CARD_WIDTH}px`,
    '--sprite-y': `${-card.spriteSheet.y * CARD_HEIGHT}px`,
  } as React.CSSProperties;

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={style}
    >
      {/* The card face is now rendered via the CSS background-image */}
    </div>
  );
}