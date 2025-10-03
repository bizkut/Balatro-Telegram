import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext';
import Hand from './components/Hand';
import './App.css';

const Game: React.FC = () => {
    const { dispatch } = useGame();

    return (
        <div className="App">
            <header className="App-header">
                <h1>Balatro on Telegram</h1>
                <button onClick={() => dispatch({ type: 'DRAW_HAND' })}>Draw Hand</button>
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