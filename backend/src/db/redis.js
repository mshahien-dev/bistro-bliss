const Redis = require("ioredis");

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

// const redis = new Redis({
//   host: "redis-12559.c293.eu-central-1-1.ec2.cloud.redislabs.com",
//   port: 12559,
//   username: "default",
//   password: process.env.REDIS_PASSWORD,
// });

redis.on("connect", () => {
  console.log("✓ Redis connected");
});

redis.on("error", (err) => {
  console.error("✗ Redis error:", err);
});

module.exports = redis;
