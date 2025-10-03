import React, { useEffect, useState } from 'react';
import { GameState } from './types';
import Hand from './components/Hand';
import { useWebApp } from '@twa-dev/sdk-react';

function App() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);
  const [gameIdToJoin, setGameIdToJoin] = useState('');
  const [selectedCards, setSelectedCards] = useState<Set<string>>(new Set());

  const webApp = useWebApp();

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');
    setSocket(ws);

    ws.onopen = () => console.log('Connected to WebSocket');
    ws.onclose = () => console.log('Disconnected from WebSocket');

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case 'clientId':
          setClientId(data.payload);
          break;
        case 'gameUpdate':
          setGameState(data.payload);
          setSelectedCards(new Set()); // Reset selection on game update
          break;
        default:
          console.log('Received:', data);
      }
    };

    return () => ws.close();
  }, []);

  const createGame = () => {
    if (socket) socket.send(JSON.stringify({ type: 'createGame' }));
  };

  const joinGame = () => {
    if (socket && gameIdToJoin) {
      socket.send(JSON.stringify({ type: 'joinGame', payload: { gameIdToJoin } }));
    }
  };

  const handleCardClick = (cardId: string) => {
    const newSelection = new Set(selectedCards);
    if (newSelection.has(cardId)) {
      newSelection.delete(cardId);
    } else {
      newSelection.add(cardId);
    }
    setSelectedCards(newSelection);
  };

  const playHand = () => {
    if (socket && selectedCards.size > 0) {
      socket.send(JSON.stringify({ type: 'playHand', payload: { cardIds: Array.from(selectedCards) } }));
    }
  };

  const appStyle: React.CSSProperties = {
    fontFamily: 'sans-serif',
    textAlign: 'center',
    padding: '20px',
    backgroundColor: webApp?.backgroundColor || '#ffffff',
    color: webApp?.textColor || '#000000',
  };

  const buttonStyle: React.CSSProperties = { margin: '5px', padding: '10px 20px' };

  return (
    <div style={appStyle}>
      <h1>Balatro Multiplayer</h1>
      {webApp?.initDataUnsafe?.user && <p>Welcome, {webApp.initDataUnsafe.user.firstName}!</p>}

      {!gameState ? (
        <div>
          <button style={buttonStyle} onClick={createGame}>Create New Game</button>
          <hr style={{ margin: '20px 0' }} />
          <input
            type="text"
            placeholder="Enter Game ID to Join"
            value={gameIdToJoin}
            onChange={(e) => setGameIdToJoin(e.target.value)}
            style={{ padding: '10px' }}
          />
          <button style={buttonStyle} onClick={joinGame}>Join Game</button>
        </div>
      ) : (
        <div>
          <h2>Game ID: {gameState.id}</h2>
          <h3>Current Turn: {gameState.players.find(p => p.id === gameState.currentPlayerId)?.name}</h3>

          {gameState.players.map(player => {
            const isSelf = player.id === clientId;
            return (
              <div key={player.id} style={{ border: isSelf ? '2px solid green' : '1px solid grey', padding: '10px', margin: '10px' }}>
                <h3>{player.name} {isSelf ? `(You - ${webApp?.initDataUnsafe?.user?.firstName})` : ''}</h3>
                <Hand
                  cards={player.hand}
                  onCardClick={isSelf && gameState.currentPlayerId === clientId ? handleCardClick : () => {}}
                  selectedCards={selectedCards}
                />
              </div>
            );
          })}

          <button
            style={buttonStyle}
            onClick={playHand}
            disabled={gameState.currentPlayerId !== clientId || selectedCards.size === 0}
          >
            Play Selected Cards
          </button>
        </div>
      )}
    </div>
  );
}

export default App;