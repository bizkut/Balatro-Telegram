import React from 'react';
import { useGame } from '../contexts/GameContext';
import Card from './Card';

const Hand: React.FC = () => {
    const { state } = useGame();

    return (
        <div className="hand">
            <h2>Your Hand</h2>
            <div className="cards">
                {state.hand.map((card, index) => (
                    <Card key={index} card={card} />
                ))}
            </div>
        </div>
    );
};

export default Hand;