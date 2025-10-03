import React from 'react';
import { Card as CardType } from '@balatro-tma/game-logic';
import './Card.css';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  const suitSymbols: { [key: string]: string } = {
    Hearts: '♥',
    Diamonds: '♦',
    Clubs: '♣',
    Spades: '♠',
  };

  const suitColor = card.suit === 'Hearts' || card.suit === 'Diamonds' ? 'red' : 'black';

  return (
    <div className={`card ${suitColor}`}>
      <div className="rank top-left">{card.rank}</div>
      <div className="suit">{suitSymbols[card.suit]}</div>
      <div className="rank bottom-right">{card.rank}</div>
    </div>
  );
};

export default Card;