const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { initialGameState } = require('./game-state');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

let gameState = JSON.parse(JSON.stringify(initialGameState)); // Deep copy

// Function to shuffle the deck
const shuffleDeck = (deck) => {
    let currentIndex = deck.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [deck[currentIndex], deck[randomIndex]] = [deck[randomIndex], deck[currentIndex]];
    }
    return deck;
}

// Initialize and shuffle the deck
gameState.deck = shuffleDeck([...initialGameState.deck]);


io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  // Send the current game state to the newly connected client
  socket.emit('game_state_update', gameState);

  socket.on('draw_hand', () => {
    console.log('draw_hand event received from', socket.id);

    // If deck is too small, reset it from the initial deck and shuffle again
    if (gameState.deck.length < 8) {
        console.log('Deck is low, reshuffling.');
        gameState.deck = shuffleDeck([...initialGameState.deck]);
    }

    const newHand = gameState.deck.slice(0, 8);
    const newDeck = gameState.deck.slice(8);

    gameState = {
      ...gameState,
      hand: newHand,
      deck: newDeck,
    };

    // Broadcast the updated state to all clients
    io.emit('game_state_update', gameState);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});