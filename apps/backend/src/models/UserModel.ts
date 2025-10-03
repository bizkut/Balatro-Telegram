import db from '../db';
import { Twa } from '@twa-dev/types';

export interface User {
  id: number;
  telegram_id: number;
  username?: string;
  first_name?: string;
  high_score: number;
  created_at: Date;
}

// In a real app, you'd have more sophisticated models.
// This is a simple example to demonstrate database interaction.

export class UserModel {
  /**
   * Finds a user by their Telegram ID, or creates a new one if not found.
   * @param userData - The user data from the Telegram Web App initData.
   * @returns The found or newly created user.
   */
  static async findOrCreateByTelegramId(userData: Twa.WebAppUser): Promise<User> {
    const { id: telegram_id, username, first_name } = userData;

    // First, try to find the user.
    const findQuery = 'SELECT * FROM users WHERE telegram_id = $1';
    let res = await db.query(findQuery, [telegram_id]);

    if (res.rows.length > 0) {
      // User found, return them.
      return res.rows[0];
    } else {
      // User not found, create them.
      const insertQuery = `
        INSERT INTO users (telegram_id, username, first_name)
        VALUES ($1, $2, $3)
        RETURNING *;
      `;
      res = await db.query(insertQuery, [telegram_id, username, first_name]);
      return res.rows[0];
    }
  }

  /**
   * Updates a user's high score.
   * @param userId - The internal database ID of the user.
   * @param newHighScore - The new high score to set.
   * @returns The updated user.
   */
  static async updateHighScore(userId: number, newHighScore: number): Promise<User | null> {
      const query = `
        UPDATE users
        SET high_score = $1
        WHERE id = $2 AND high_score < $1
        RETURNING *;
      `;
      const res = await db.query(query, [newHighScore, userId]);
      return res.rows.length > 0 ? res.rows[0] : null;
  }
}