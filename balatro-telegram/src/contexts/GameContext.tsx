import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { GameState, initialGameState, CardData } from '../data/game-state';

type Action =
    | { type: 'PLAY_HAND'; payload: CardData[] }
    | { type: 'DISCARD_HAND'; payload: CardData[] }
    | { type: 'DRAW_HAND' };

const GameContext = createContext<{
    state: GameState;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialGameState,
    dispatch: () => null,
});

const gameReducer = (state: GameState, action: Action): GameState => {
    switch (action.type) {
        case 'PLAY_HAND':
            // Basic logic to remove cards from hand. Scoring will be added later.
            return {
                ...state,
                hand: state.hand.filter(card => !action.payload.includes(card)),
                hands: state.hands - 1,
            };
        case 'DISCARD_HAND':
            return {
                ...state,
                hand: state.hand.filter(card => !action.payload.includes(card)),
                discards: state.discards - 1,
            };
        case 'DRAW_HAND':
            const newHand = state.deck.slice(0, 8);
            const newDeck = state.deck.slice(8);
            return {
                ...state,
                hand: newHand,
                deck: newDeck,
            };
        default:
            return state;
    }
};

export const GameProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(gameReducer, initialGameState);

    return (
        <GameContext.Provider value={{ state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);