import './Deck.css';

interface DeckProps {
  cardCount: number;
  onDraw: () => void;
}

export function Deck({ cardCount, onDraw }: DeckProps) {
  return (
    <div className="deck-container">
      <h2>Deck</h2>
      <div className="deck" onClick={onDraw}>
        <div className="card-back">
          <div className="card-back-inner">B</div>
        </div>
        <div className="deck-count">{cardCount} cards left</div>
      </div>
    </div>
  );
}