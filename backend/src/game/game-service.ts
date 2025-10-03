import { GameState, Player } from '../data/game-state';
import { CARDS, Card } from '../data/cards';

export class GameService {
  private games: Map<string, GameState> = new Map();

  createGame(playerIds: string[]): GameState {
    const gameId = this.generateGameId();
    const players: Player[] = playerIds.map((id, index) => ({
      id,
      name: `Player ${index + 1}`,
      hand: [],
      jokers: [],
      money: 0,
      score: 0,
    }));

    const newGame: GameState = {
      id: gameId,
      players,
      deck: this.shuffleDeck([...CARDS]),
      discardPile: [],
      round: 1,
      currentPlayerId: players[0].id,
    };

    this.games.set(gameId, newGame);
    return newGame;
  }

  addPlayer(gameId: string, playerId: string): GameState | null {
    const game = this.games.get(gameId);
    if (!game) {
      return null;
    }

    const newPlayer: Player = {
      id: playerId,
      name: `Player ${game.players.length + 1}`,
      hand: [],
      jokers: [],
      money: 0,
      score: 0,
    };

    game.players.push(newPlayer);
    this.games.set(gameId, game);
    return game;
  }

  playHand(gameId: string, playerId: string, cardIds: string[]): GameState | null {
    const game = this.games.get(gameId);
    if (!game || game.currentPlayerId !== playerId) {
      return null; // Or return an error state
    }

    const player = game.players.find(p => p.id === playerId);
    if (!player) {
      return null;
    }

    // Basic logic to remove cards from hand and move to discard pile
    const playedCards = player.hand.filter(card => cardIds.includes(card.id));
    player.hand = player.hand.filter(card => !cardIds.includes(card.id));
    game.discardPile.push(...playedCards);

    // TODO: Implement hand scoring and other game logic here.

    // Switch to the next player
    const currentPlayerIndex = game.players.findIndex(p => p.id === playerId);
    const nextPlayerIndex = (currentPlayerIndex + 1) % game.players.length;
    game.currentPlayerId = game.players[nextPlayerIndex].id;

    this.games.set(gameId, game);
    return game;
  }

  shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  dealCards(gameId: string, numCards: number): GameState | null {
    const game = this.games.get(gameId);
    if (!game) {
      return null;
    }

    game.players.forEach(player => {
      // Ensure player has a hand array
      player.hand = player.hand || [];
      for (let i = 0; i < numCards; i++) {
        const card = game.deck.pop();
        if (card) {
          player.hand.push(card);
        }
      }
    });

    this.games.set(gameId, game);
    return game;
  }

  private generateGameId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
}