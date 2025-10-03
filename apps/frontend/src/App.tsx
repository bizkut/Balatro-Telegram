import { useState, useMemo } from 'react';
import { Deck, Card as CardType, evaluateHand } from '@balatro-tma/game-logic';
import { useWebApp } from '@twa-dev/sdk-react';
import Hand from './components/Hand';
import './App.css';

function App() {
  const [deck, setDeck] = useState(new Deck());
  const [hand, setHand] = useState<CardType[]>([]);

  const { webApp, loading } = useWebApp();

  const handleDrawHand = () => {
    const newDeck = new Deck();
    newDeck.shuffle();
    const newHand = newDeck.draw(5);
    setDeck(newDeck);
    setHand(newHand);

    // Vibrate to give feedback, if the SDK is available
    webApp?.HapticFeedback.impactOccurred('light');
  };

  const handType = useMemo(() => {
    if (hand.length === 5) {
      return evaluateHand(hand);
    }
    return null;
  }, [hand]);

  const renderUserGreeting = () => {
    if (loading) {
      return <p className="telegram-greeting">Loading Telegram data...</p>;
    }
    if (webApp?.initDataUnsafe.user) {
      return <p className="telegram-greeting">Welcome, {webApp.initDataUnsafe.user.firstName}!</p>;
    }
    return <p className="telegram-greeting">Running outside of Telegram.</p>;
  };

  return (
    <div className="app-container">
      <header>
        <h1>Balatro TMA</h1>
        {renderUserGreeting()}
      </header>

      <main>
        <div className="controls">
          <button onClick={handleDrawHand}>Draw Hand</button>
        </div>

        <div className="game-area">
          <h2>Your Hand</h2>
          {hand.length > 0 ? (
            <Hand cards={hand} />
          ) : (
            <p className="placeholder-text">Click "Draw Hand" to start.</p>
          )}
        </div>

        {handType && (
          <div className="hand-info">
            <h3>Hand Type: {handType}</h3>
          </div>
        )}
      </main>

      <footer>
        <p>Cards remaining in deck: {deck.getCardsCount()}</p>
      </footer>
    </div>
  );
}

export default App;