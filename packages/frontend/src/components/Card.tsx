import type { Card as CardType } from '@balatro-clone/core';
import './Card.css';

interface CardProps {
  card: CardType;
  isSelected?: boolean;
  onClick?: (id: string) => void;
}

const suitToSymbol: Record<CardType['suit'], string> = {
  Hearts: '♥',
  Diamonds: '♦',
  Clubs: '♣',
  Spades: '♠',
};

export function Card({ card, isSelected, onClick }: CardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(card.id);
    }
  };

  const suitColor = card.suit === 'Hearts' || card.suit === 'Diamonds' ? 'red' : 'black';

  return (
    <div
      className={`card ${isSelected ? 'selected' : ''}`}
      onClick={handleClick}
      style={{ color: suitColor }}
    >
      <div className="rank top-left">{card.rank}</div>
      <div className="suit">{suitToSymbol[card.suit]}</div>
      <div className="rank bottom-right">{card.rank}</div>
    </div>
  );
}