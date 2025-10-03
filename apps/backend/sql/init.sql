-- Table to store user information
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    telegram_id BIGINT UNIQUE NOT NULL,
    username VARCHAR(255),
    first_name VARCHAR(255),
    high_score INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store the history of completed games
CREATE TABLE IF NOT EXISTS game_history (
    id SERIAL PRIMARY KEY,
    game_id VARCHAR(16) UNIQUE NOT NULL,
    winner_user_id INT,
    score INT NOT NULL,
    ended_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_winner_user
        FOREIGN KEY(winner_user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

-- You could also have a table to link users to games for multiplayer history
CREATE TABLE IF NOT EXISTS game_players (
    game_history_id INT NOT NULL,
    user_id INT NOT NULL,

    PRIMARY KEY (game_history_id, user_id),

    CONSTRAINT fk_game_history
        FOREIGN KEY(game_history_id)
        REFERENCES game_history(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_user
        FOREIGN KEY(user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

-- Add indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_telegram_id ON users(telegram_id);
CREATE INDEX IF NOT EXISTS idx_game_history_winner_id ON game_history(winner_user_id);