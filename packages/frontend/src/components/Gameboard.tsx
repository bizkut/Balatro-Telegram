import { Deck } from './Deck';
import { Hand } from './Hand';
import { PlayArea } from './PlayArea';
import type { Card as CardType } from '@balatro-clone/core';
import './Gameboard.css';

interface GameboardProps {
  deck: CardType[];
  hand: CardType[];
  playedCards: CardType[];
  selectedCards: Set<string>;
  onDraw: () => void;
  onCardClick: (id: string) => void;
  onPlay: () => void;
}

export function Gameboard({
  deck,
  hand,
  playedCards,
  selectedCards,
  onDraw,
  onCardClick,
  onPlay,
}: GameboardProps) {
  return (
    <div className="gameboard">
      <div className="top-area">
        <PlayArea cards={playedCards} />
      </div>
      <div className="player-area">
        <Hand cards={hand} selectedCards={selectedCards} onCardClick={onCardClick} />
      </div>
      <div className="actions-area">
        <Deck cardCount={deck.length} onDraw={onDraw} />
        <button onClick={onPlay} disabled={selectedCards.size === 0}>
          Play Hand
        </button>
      </div>
    </div>
  );
}