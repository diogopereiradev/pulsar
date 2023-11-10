import { redis_client } from "~/database/redis";
import { RedisPubSub } from "../redis/RedisPubSub";
import chalk from "chalk";
import config from '~/server/config.json';
import { editorSaveToDb } from "../redis/editorSaveToDb";
import { redisDelPatternKeys } from "../redis/redisDelPatternKeys";
import { IDocumentation } from "~/@types/declarations/Documentation";

function validityResult(key: string, value: string, result: boolean) {
  if(result) {
    const doc = JSON.parse(value) as IDocumentation;

    process.env.NODE_ENV === 'development' &&
      console.log(`${chalk.cyan('[PulsarLog]')} ${chalk.yellow(doc.id)} expired buffer status ${chalk.green('[SAVED]')}`);
    
    // Remove getDoc cache to get updated data
    if(doc.authorIdentifier) {
      redisDelPatternKeys(`cache:getdoc:${doc.authorIdentifier}*`);
    }
    redis_client.del(`${key}${config.REDIS_LISTENING_TO_PUBSUB_KEY}`);
  } else {
    process.env.NODE_ENV === 'development' &&
      console.log(`${chalk.cyan('[PulsarLog]')} Expired buffer failed on saving, creating the key ${chalk.yellow(key)} again on Redis ${chalk.red('[FAILED]')}`);
    redis_client.set(key, value || '', 'EX', config.REDIS_EDITOR_EXPIRED_BUFFER_TTL);
  }
}

export default defineNitroPlugin(nitroApp => {
  const redisPubSubChannel = new RedisPubSub();

  redisPubSubChannel.subscribe();
  redisPubSubChannel.on((pattern, channel, key) => {
    if(key.match(config.REDIS_EDITOR_EXPIRED_BUFFER_KEY) && !key.match(config.REDIS_LISTENING_TO_PUBSUB_KEY)) {
      redis_client.get(`${key}${config.REDIS_LISTENING_TO_PUBSUB_KEY}`, async (err, value) => {
        if(!value) {
          redis_client.del(key);
          return;
        }
        const doc = JSON.parse(value || '{}');
        process.env.NODE_ENV === 'development' &&
          console.log(`${chalk.cyan('[PulsarLog]')} Buffer TTL of ${chalk.yellow(doc && doc.id? doc.id : 'undefined')} expired, saving on database...`);
        const result = await editorSaveToDb(err, value);
        validityResult(key, value!, result);
      });
    } else if(key.match('cache:getpublicdoc:')) {
      const docId = key.split(':')[2];
      process.env.NODE_ENV === 'development' &&
        console.log(`${chalk.cyan('[PulsarLog]')} Public doc ${chalk.yellow(docId)} cache expired ${chalk.blue('[INFO]')}`);
    }
  });
});