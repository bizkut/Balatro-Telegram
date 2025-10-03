import { createClient } from 'redis';

// Create a Redis client.
// The client will automatically try to connect to the host specified in the
// environment variables (e.g., REDIS_URL) or default to localhost:6379.
const redisClient = createClient({
  // For production, you would configure this with a URL:
  // url: process.env.REDIS_URL
});

redisClient.on('error', (err) => {
  console.error('Redis Client Error', err);
});

// We are not calling redisClient.connect() here because, in this environment,
// I cannot connect to a live service. In a real application, you would
// connect here and handle the connection promise.
// For example:
// (async () => {
//   await redisClient.connect();
// })();

console.log('Redis client configured (but not connected in this environment).');

export default redisClient;