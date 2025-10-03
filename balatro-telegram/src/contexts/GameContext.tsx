import React, { createContext, useReducer, useContext, ReactNode, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { GameState, initialGameState, CardData } from '../data/game-state';

// The server now dictates the state, so the primary action is to set it.
type Action = { type: 'SET_GAME_STATE'; payload: GameState };

const GameContext = createContext<{
    state: GameState;
    socket: Socket | null;
}>({
    state: initialGameState,
    socket: null,
});

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'SET_GAME_STATE':
            return action.payload;
        default:
            return state;
    }
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        // Establish connection
        socketRef.current = io("http://localhost:3001");

        // Listen for game state updates
        socketRef.current.on('game_state_update', (newGameState: GameState) => {
            dispatch({ type: 'SET_GAME_STATE', payload: newGameState });
        });

        // Clean up on unmount
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
            }
        };
    }, []); // Runs once on component mount

    return (
        <GameContext.Provider value={{ state, socket: socketRef.current }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);