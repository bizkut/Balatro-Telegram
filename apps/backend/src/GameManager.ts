import { Deck, Card } from '@balatro-tma/game-logic';
import redisClient from './redisClient';

// In a real application, the WebSocket object cannot be stored in Redis.
// We would store a reference to the player and manage the WebSocket connections
// in memory, mapped to player IDs. For this example, we simplify.
interface Player {
  id: string;
  // ws: any; // This cannot be stored in Redis.
}

interface Game {
  id: string;
  players: Player[];
  deck: Deck; // The Deck class will be serialized to JSON.
}

const GAME_KEY_PREFIX = 'game:';

class GameManager {

  // Note: In this restricted environment, we cannot connect to Redis.
  // The following methods are written as they would be for a live Redis instance.
  // They will not function without a connection.

  public async createGame(playerId: string): Promise<Game> {
    const gameId = this.generateGameId();
    const game: Game = {
      id: gameId,
      players: [{ id: playerId }],
      deck: new Deck(),
    };
    game.deck.shuffle();

    const gameKey = `${GAME_KEY_PREFIX}${gameId}`;
    await redisClient.set(gameKey, JSON.stringify(game));

    console.log(`Game ${gameId} created by player ${playerId} and stored in Redis.`);
    return game;
  }

  public async joinGame(gameId: string, playerId: string): Promise<Game | null> {
    const game = await this.getGame(gameId);
    if (!game) {
      return null;
    }
    if (game.players.length >= 2) {
      return null; // Game is full
    }

    // Avoid adding the same player twice
    if (!game.players.some(p => p.id === playerId)) {
        game.players.push({ id: playerId });
        const gameKey = `${GAME_KEY_PREFIX}${gameId}`;
        await redisClient.set(gameKey, JSON.stringify(game));
        console.log(`Player ${playerId} joined game ${gameId}. State updated in Redis.`);
    }

    return game;
  }

  public async getGame(gameId: string): Promise<Game | null> {
    const gameKey = `${GAME_KEY_PREFIX}${gameId}`;
    const gameJson = await redisClient.get(gameKey);
    if (!gameJson) {
      return null;
    }

    // Re-instantiate class methods after deserializing
    const gameData = JSON.parse(gameJson);
    const deck = new Deck();
    Object.assign(deck, gameData.deck); // Re-hydrate the Deck object
    gameData.deck = deck;

    return gameData as Game;
  }

  private generateGameId(length: number = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

export const gameManager = new GameManager();