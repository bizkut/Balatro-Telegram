export interface WebSocketMessage {
  type: 'create_game' | 'join_game' | 'player_action';
  payload?: any;
}

export interface GameState {
  id: string;
  players: string[];
  // Other game state properties will be added here
}