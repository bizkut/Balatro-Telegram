import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (id: string) => void;
  isSelected: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, isSelected }) => {
  const cardStyle: React.CSSProperties = {
    border: isSelected ? '3px solid #4a90e2' : '1px solid black',
    borderRadius: '8px',
    padding: '10px',
    margin: '5px',
    width: '100px',
    height: '150px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    color: ['Hearts', 'Diamonds'].includes(card.suit) ? 'red' : 'black',
    cursor: 'pointer',
    boxShadow: isSelected ? '0 0 10px #4a90e2' : 'none',
    transform: isSelected ? 'translateY(-10px)' : 'none',
    transition: 'transform 0.2s, box-shadow 0.2s',
  };

  const rankStyle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const suitStyle: React.CSSProperties = {
    fontSize: '32px',
    textAlign: 'center',
  };

  const getSuitSymbol = (suit: string) => {
    switch (suit) {
      case 'Hearts': return '♥';
      case 'Diamonds': return '♦';
      case 'Clubs': return '♣';
      case 'Spades': return '♠';
      default: return '';
    }
  };

  return (
    <div style={cardStyle} onClick={() => onClick(card.id)}>
      <div style={rankStyle}>{card.rank}</div>
      <div style={suitStyle}>{getSuitSymbol(card.suit)}</div>
      <div style={{ ...rankStyle, transform: 'rotate(180deg)' }}>{card.rank}</div>
    </div>
  );
};

export default Card;