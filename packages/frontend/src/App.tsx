import { Gameboard } from './components/Gameboard';
import { TelegramUser } from './components/TelegramUser';
import { useGameStore, useGameActions } from './stores/game-store';
import './App.css';

function App() {
  const { deck, hand, playedCards, selectedCards } = useGameStore();
  const { drawCards, toggleCardSelection, playSelectedCards } = useGameActions();

  return (
    <div className="app-container">
      <header>
        <h1>Balatro Clone</h1>
        <TelegramUser />
      </header>
      <main>
        <Gameboard
          deck={deck}
          hand={hand}
          playedCards={playedCards}
          selectedCards={selectedCards}
          onDraw={() => drawCards(5)} // Draw 5 cards for now
          onCardClick={toggleCardSelection}
          onPlay={playSelectedCards}
        />
      </main>
    </div>
  );
}

export default App;