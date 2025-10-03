import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { gameManager } from './GameManager';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8080;

// In-memory mapping of userId to their active WebSocket connection.
const playerConnections = new Map<string, WebSocket>();

wss.on('connection', (ws: WebSocket) => {
  console.log('A new client connected');
  let currentUserId: string | null = null; // Keep track of the user for this connection

  ws.on('message', async (message: string) => {
    try {
      const data = JSON.parse(message);
      const { type, payload } = data;

      switch (type) {
        case 'createGame': {
          const userId = payload.userId || `user_${Date.now()}`;
          currentUserId = userId;
          playerConnections.set(userId, ws);

          const game = await gameManager.createGame(userId);
          ws.send(JSON.stringify({ type: 'gameCreated', payload: { gameId: game.id } }));
          console.log(`Game ${game.id} created for player ${userId}`);
          break;
        }

        case 'joinGame': {
          const { gameId, userId } = payload;
          if (!gameId || !userId) {
            throw new Error('Missing gameId or userId for joining game.');
          }
          currentUserId = userId;
          playerConnections.set(userId, ws);

          const game = await gameManager.joinGame(gameId, userId);
          if (game) {
            // Notify all players in the game that a new player has joined.
            const messageToPlayers = JSON.stringify({
              type: 'playerJoined',
              payload: {
                userId,
                gameId: game.id,
                players: game.players.map(p => p.id)
              }
            });
            game.players.forEach(player => {
              const playerWs = playerConnections.get(player.id);
              if (playerWs) {
                playerWs.send(messageToPlayers);
              }
            });
          } else {
            ws.send(JSON.stringify({ type: 'error', payload: { message: 'Game not found or is full.' } }));
          }
          break;
        }

        default:
          ws.send(JSON.stringify({ type: 'error', payload: { message: 'Unknown message type' } }));
          break;
      }
    } catch (error) {
      console.error('Failed to handle message:', error);
      ws.send(JSON.stringify({ type: 'error', payload: { message: 'Invalid message format or server error.' } }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    if (currentUserId) {
      playerConnections.delete(currentUserId);
      console.log(`Removed connection for user ${currentUserId}`);
      // Future logic: notify other players in the game about the disconnection.
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});