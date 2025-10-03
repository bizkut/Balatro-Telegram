import { Pool } from 'pg';

// Create a new PostgreSQL connection pool.
// The pool will use the environment variables (e.g., PGHOST, PGUSER, PGPASSWORD, PGDATABASE)
// to configure the connection. For production, you would set these securely.
const pool = new Pool({
  // Example for local development:
  // user: 'user',
  // host: 'localhost',
  // database: 'balatro_tma_db',
  // password: 'password',
  // port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// In this restricted environment, I cannot connect to a database.
// The following is an example of how you would test the connection.
// (async () => {
//   try {
//     const client = await pool.connect();
//     console.log('Successfully connected to PostgreSQL');
//     client.release();
//   } catch (err) {
//     console.error('Failed to connect to PostgreSQL', err);
//   }
// })();

console.log('PostgreSQL connection pool configured (but not connected in this environment).');

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
};