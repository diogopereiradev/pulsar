import chalk from "chalk";
import { redis_client } from "~/database/redis";
import config from '~/server/config.json';

export function registerPubSubKey(key: string, value: string, ttl: number) {
  redis_client.set(`${key}${config.REDIS_LISTENING_TO_PUBSUB_KEY}`, value, 'EX', ttl + 2000 /* 2000 seconds to remove shadow if a bug occurr */, (err) => {
    if(err) return console.log(err);
  });
  redis_client.set(key, value, 'EX', ttl, (err) => {
    if(err) return console.log(err);
    process.env.NODE_ENV === 'development' && 
      console.log(`${chalk.cyan('[PulsarLog]')} The key ${chalk.yellow(key)} was registered on PubSub. One shadow key with ${chalk.yellow(config.REDIS_LISTENING_TO_PUBSUB_KEY)} was created ${chalk.magenta('[REGISTERED]')}`);
  });
}