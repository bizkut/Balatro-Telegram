import React from 'react';
import { Card as CardType } from '../types';
import Card from './Card';

interface HandProps {
  cards: CardType[];
  onCardClick: (id: string) => void;
  selectedCards: Set<string>;
}

const Hand: React.FC<HandProps> = ({ cards, onCardClick, selectedCards }) => {
  const handStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f0f0f0',
    minHeight: '185px',
  };

  return (
    <div style={handStyle}>
      {cards.map(card => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          isSelected={selectedCards.has(card.id)}
        />
      ))}
    </div>
  );
};

export default Hand;