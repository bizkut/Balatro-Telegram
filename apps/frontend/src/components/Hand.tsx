import React from 'react';
import { Card as CardType } from '@balatro-tma/game-logic';
import Card from './Card';
import './Hand.css';

interface HandProps {
  cards: CardType[];
}

const Hand: React.FC<HandProps> = ({ cards }) => {
  return (
    <div className="hand">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default Hand;