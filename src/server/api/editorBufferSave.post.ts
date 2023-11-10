import { getServerSession } from "#auth";
import { IDocumentation } from "~/@types/declarations/Documentation";
import { registerPubSubKey } from "../redis/registerPubSubKey";
import config from '~/server/config.json';

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const body = await readBody(event);

  if(session && session.user && body) {
    try {
      const payload = body as IDocumentation;
      if(payload.id && payload.authorIdentifier) {
        registerPubSubKey(
          `tmp:doc:${payload.id}${config.REDIS_EDITOR_EXPIRED_BUFFER_KEY}`, 
          JSON.stringify(payload), 
          config.REDIS_EDITOR_EXPIRED_BUFFER_TTL
        );
        setResponseStatus(event, 200, 'Buffer saved');
      } else {
        throw {
          status: 401,
          message: 'Unauthorized'
        }
      }
    } catch(err) {
      // @ts-expect-error
      setResponseStatus(event, err.status, err.message);
      return err;
    }
  } else {
    setResponseStatus(event, 401, 'Unauthorized');
    return {
      status: 401,
      message: 'Unauthorized'
    }
  }
});