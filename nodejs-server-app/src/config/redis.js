const { createClient } = require('redis');

// Use environment variables for Redis connection
const redisClient = createClient({
    socket: {
        host: process.env.REDIS_HOST || 'localhost', // Default to localhost if REDIS_HOST is not set
        port: process.env.REDIS_PORT || 6379,       // Default to 6379 if REDIS_PORT is not set
    },
});

redisClient.on('error', (err) => console.error('Redis error:', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

module.exports = redisClient;