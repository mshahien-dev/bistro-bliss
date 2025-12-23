const redis = require("../db/redis");

async function getCache(key) {
  try {
    const raw = await redis.get(key);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Cache get error:", e);
    return null;
  }
}

async function setCache(key, value, ttlSeconds = 60) {
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (e) {
    console.error("Cache set error:", e);
  }
}

async function delCache(key) {
  try {
    await redis.del(key);
  } catch (e) {
    console.error("Cache del error:", e);
  }
}

async function delKeysByPattern(pattern) {
  try {
    const keys = [];
    const stream = redis.scanStream({ match: pattern, count: 100 });
    return new Promise((resolve, reject) => {
      stream.on("data", (resultKeys) => {
        if (resultKeys.length) keys.push(...resultKeys);
      });
      stream.on("end", async () => {
        try {
          if (keys.length) await redis.del(...keys);
          resolve();
        } catch (e) {
          reject(e);
        }
      });
      stream.on("error", (err) => reject(err));
    });
  } catch (e) {
    console.error("Error deleting keys by pattern:", e);
  }
}

async function clearItemsCache() {
  return delKeysByPattern("items:*");
}

module.exports = {
  getCache,
  setCache,
  delCache,
  clearItemsCache,
};
