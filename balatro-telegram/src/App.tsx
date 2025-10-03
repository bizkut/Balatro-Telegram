import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import Hand from './components/Hand';
import './App.css';

const Game: React.FC = () => {
    const { socket } = useGame();

    const handleDrawHand = () => {
        if (socket) {
            socket.emit('draw_hand');
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Balatro on Telegram</h1>
                <button onClick={handleDrawHand}>Draw Hand</button>
            </header>
            <main>
                <Hand />
            </main>
        </div>
    );
}

const App: React.FC = () => {
    return (
        <GameProvider>
            <Game />
        </GameProvider>
    );
};

export default App;