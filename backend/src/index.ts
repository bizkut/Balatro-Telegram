import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import { GameService } from './game/game-service';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
const gameService = new GameService();

// In-memory storage for clients and game sessions
const clients = new Map<string, WebSocket>();
const games = new Map<string, Set<string>>(); // gameId -> Set<clientId>
const clientToGame = new Map<string, string>(); // clientId -> gameId

function broadcast(gameId: string, message: any) {
  const playerIds = games.get(gameId);
  if (playerIds) {
    const messageString = JSON.stringify(message);
    playerIds.forEach(clientId => {
      const client = clients.get(clientId);
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(messageString);
      }
    });
  }
}

wss.on('connection', (ws) => {
  const clientId = getUniqueId();
  clients.set(clientId, ws);
  console.log(`Client connected: ${clientId}`);

  // Send the client its unique ID
  ws.send(JSON.stringify({ type: 'clientId', payload: clientId }));

  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message.toString());
      const gameId = clientToGame.get(clientId);

      switch (data.type) {
        case 'createGame': {
          const newGame = gameService.createGame([clientId]);
          games.set(newGame.id, new Set([clientId]));
          clientToGame.set(clientId, newGame.id);
          const updatedGame = gameService.dealCards(newGame.id, 8);
          broadcast(newGame.id, { type: 'gameUpdate', payload: updatedGame });
          break;
        }

        case 'joinGame': {
          const { gameIdToJoin } = data.payload;
          const game = games.get(gameIdToJoin);
          if (game) {
            game.add(clientId);
            clientToGame.set(clientId, gameIdToJoin);
            gameService.addPlayer(gameIdToJoin, clientId);
            const updatedGame = gameService.dealCards(gameIdToJoin, 8);
            broadcast(gameIdToJoin, { type: 'gameUpdate', payload: updatedGame });
          } else {
            ws.send(JSON.stringify({ type: 'error', message: 'Game not found' }));
          }
          break;
        }

        case 'playHand': {
          if (gameId) {
            const { cardIds } = data.payload;
            const updatedGame = gameService.playHand(gameId, clientId, cardIds);
            if (updatedGame) {
              broadcast(gameId, { type: 'gameUpdate', payload: updatedGame });
            } else {
              ws.send(JSON.stringify({ type: 'error', message: 'Invalid move' }));
            }
          }
          break;
        }

        default:
          ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
      }
    } catch (error) {
      console.error('Failed to process message:', error);
      ws.send(JSON.stringify({ type: 'error', message: 'Invalid message format' }));
    }
  });

  ws.on('close', () => {
    console.log(`Client disconnected: ${clientId}`);
    const gameId = clientToGame.get(clientId);
    if (gameId) {
      const gamePlayers = games.get(gameId);
      if (gamePlayers) {
        gamePlayers.delete(clientId);
        if (gamePlayers.size === 0) {
          games.delete(gameId);
          console.log(`Game ${gameId} cleaned up.`);
        }
      }
    }
    clients.delete(clientId);
    clientToGame.delete(clientId);
  });
});

app.get('/', (req, res) => {
  res.send('Balatro backend is running!');
});

server.listen(3001, () => {
  console.log('Server is listening on port 3001');
});

function getUniqueId(): string {
  return Math.random().toString(36).substring(2, 9);
}