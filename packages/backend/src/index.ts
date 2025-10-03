import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { nanoid } from 'nanoid';
import redisClient from './lib/redis';
import type { WebSocketMessage, GameState } from './types';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = process.env.PORT || 8080;

// A simple in-memory map to associate ws connections with a gameId
const connections = new Map<WebSocket, string>();
// A map to store game rooms and the clients within them
const games = new Map<string, Set<WebSocket>>();

app.get('/', (req, res) => {
  res.send('Balatro Clone Backend is running!');
});

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    try {
      const parsedMessage: WebSocketMessage = JSON.parse(message.toString());
      const { type, payload } = parsedMessage;

      switch (type) {
        case 'create_game': {
          const gameId = nanoid(6); // Generate a short, unique game ID
          const newGame: GameState = {
            id: gameId,
            players: [], // Add player info later
          };

          // Store the initial game state in Redis
          await redisClient.set(`game:${gameId}`, JSON.stringify(newGame));

          // Create a new room for the game
          games.set(gameId, new Set([ws]));
          connections.set(ws, gameId);

          console.log(`Game created with ID: ${gameId}`);
          ws.send(JSON.stringify({ type: 'game_created', payload: { gameId } }));
          break;
        }

        case 'join_game': {
          const { gameId } = payload;
          const gameExists = await redisClient.exists(`game:${gameId}`);

          if (gameExists) {
            const room = games.get(gameId);
            if (room) {
              room.add(ws);
              connections.set(ws, gameId);
              console.log(`Client joined game: ${gameId}`);

              // Notify all players in the room that a new player has joined
              room.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({ type: 'player_joined', payload: { gameId, playerCount: room.size } }));
                }
              });
            }
          } else {
            ws.send(JSON.stringify({ type: 'error', payload: { message: 'Game not found' } }));
          }
          break;
        }

        default:
          ws.send(JSON.stringify({ type: 'error', payload: { message: 'Unknown message type' } }));
      }
    } catch (error) {
      console.error('Failed to process message:', error);
      ws.send(JSON.stringify({ type: 'error', payload: { message: 'Invalid message format' } }));
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
    const gameId = connections.get(ws);
    if (gameId) {
      const room = games.get(gameId);
      if (room) {
        room.delete(ws);
        if (room.size === 0) {
          // Optional: Clean up empty game rooms
          games.delete(gameId);
          redisClient.del(`game:${gameId}`);
          console.log(`Game room ${gameId} closed.`);
        }
      }
      connections.delete(ws);
    }
  });

  ws.send(JSON.stringify({ type: 'welcome', payload: { message: 'Welcome to the Balatro Clone WebSocket server!' }}));
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});