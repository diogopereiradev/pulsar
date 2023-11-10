import { redis_client } from "~/database/redis";

export async function redisDelPatternKeys(pattern: string): Promise<boolean> {
  const keysToDelete = await redis_client.keys(pattern);

  if(keysToDelete.length > 0) {
    await redis_client.del(...keysToDelete);
    return true;
  } else {
    return false;
  }
}