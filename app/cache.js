

const redis = require('redis');

class RedisLibrary {
    constructor() {
        (async () => { //IIFE - Immediately Invoked Function Expression
            this.redisClient = redis.createClient();
          
            this.redisClient.on("error", logger.error);
          
            await this.redisClient.connect();
        })();
    }

    clearCache = () => {
        return this.redisClient.flushAll()
    }

    setCache = (key, value) => {
        return new Promise((resolve, reject) => {
            this.redisClient.set(key, JSON.stringify(value))
            .then(() => resolve())
            .catch(reject)
        })
    }

    getCache = async (key) => {
        try {
            return JSON.parse(await this.redisClient.get(key))
        } catch (error) {
            logger.error(error)
            return undefined
        }
    }
}
 
let redisClient = RedisLibrary()

module.exports = redisClient;
