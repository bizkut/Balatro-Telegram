import React from 'react';

interface CardProps {
    card: {
        name: string;
        suit?: string;
        value?: string;
        effect?: string;
    };
}

const Card: React.FC<CardProps> = ({ card }) => {
    return (
        <div className="card">
            <div className="card-name">{card.name}</div>
        </div>
    );
};

export default Card;