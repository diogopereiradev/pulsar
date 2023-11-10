import Redis from 'ioredis';

export class RedisPubSub {
  subscriber = new Redis(process.env.REDIS_URL as string);

  subscribe() {
    this.subscriber.config('SET', 'notify-keyspace-events', 'Ex');
    this.subscriber.psubscribe('__keyevent@0__:expired');
  }

  on(callback: (pattern: string, channel: string, key: string) => void) {
    this.subscriber.on('pmessage', (pattern, channel, key) => {
      callback(pattern, channel, key);
    });
  }
}