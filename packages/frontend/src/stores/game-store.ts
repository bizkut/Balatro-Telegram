import { create } from 'zustand';
import { Card, STANDARD_DECK } from '@balatro-clone/core';

// Basic shuffle function
const shuffle = (deck: Card[]): Card[] => {
  return deck
    .map(card => ({ card, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ card }) => card);
};

interface GameState {
  deck: Card[];
  hand: Card[];
  playedCards: Card[];
  selectedCards: Set<string>;
  actions: {
    drawCards: (count: number) => void;
    toggleCardSelection: (cardId: string) => void;
    playSelectedCards: () => void;
  };
}

export const useGameStore = create<GameState>((set) => ({
  deck: shuffle(STANDARD_DECK.map(c => new Card(c))),
  hand: [],
  playedCards: [],
  selectedCards: new Set(),
  actions: {
    drawCards: (count) =>
      set((state) => {
        if (state.deck.length < count) {
          return state; // Not enough cards to draw
        }
        const drawn = state.deck.slice(0, count);
        const newDeck = state.deck.slice(count);
        return {
          deck: newDeck,
          hand: [...state.hand, ...drawn],
        };
      }),
    toggleCardSelection: (cardId) =>
      set((state) => {
        const newSelection = new Set(state.selectedCards);
        if (newSelection.has(cardId)) {
          newSelection.delete(cardId);
        } else {
          newSelection.add(cardId);
        }
        return { selectedCards: newSelection };
      }),
    playSelectedCards: () =>
      set((state) => {
        if (state.selectedCards.size === 0) {
          return state;
        }
        const played = state.hand.filter((card) => state.selectedCards.has(card.id));
        const newHand = state.hand.filter((card) => !state.selectedCards.has(card.id));

        return {
          hand: newHand,
          playedCards: [...state.playedCards, ...played],
          selectedCards: new Set(),
        };
      }),
  },
}));

// Export actions separately for easier usage in components
export const useGameActions = () => useGameStore((state) => state.actions);