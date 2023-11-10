import config from '~/server/config.json';
import chalk from 'chalk';
import { IDocumentation } from '~/@types/declarations/Documentation';
import { db_client } from '~/database/client';
import { redis_client } from '~/database/redis';
import { documentationDataEmptyObj } from '~/@types/utils/documentation';

const allowedProperties = {
  id: '',
  title: '',
  messages: documentationDataEmptyObj.messages,
  colors: documentationDataEmptyObj.colors,
  categories: documentationDataEmptyObj.categories,
  pages: documentationDataEmptyObj.pages,
  customizations: documentationDataEmptyObj.customizations,
  features: documentationDataEmptyObj.features,
  isPublic: true
};

async function getPublicDoc(docId: string): Promise<IDocumentation | undefined> {
  await db_client.$connect();
  const select: { [key in keyof typeof allowedProperties]: boolean } = {} as { [key in keyof typeof allowedProperties]: boolean };

  Object.keys(allowedProperties).forEach(key => {
    // @ts-expect-error
    select[key] = true;
  });
  const result = await db_client.documentation.findUnique({
    where: {
      id: docId,
      isPublic: true
    },
    select
  });
  await db_client.$disconnect();
  
  if(result && result.id) {
    return result as unknown as IDocumentation;
  } else {
    return undefined;
  }
}

async function tryGetFromCache(docId: string): Promise<typeof allowedProperties | null> {
  const result = await redis_client.get(`cache:getpublicdoc:${docId}`);
  
  if(result) {
    return JSON.parse(result) as typeof allowedProperties;
  } else {
    return result as null;
  }
}

async function queryResult(docId: string, pathname: string) {
  const cacheResult = await tryGetFromCache(docId);

  if(cacheResult) {
    // CACHE HIT
    process.env.NODE_ENV === 'development' && 
      console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(pathname)} cache status ${chalk.green('[HIT]')}`);
    return cacheResult;
  } else {
    // CACHE MISS
    const dbResult = await getPublicDoc(docId);

    if(dbResult) {
      process.env.NODE_ENV === 'development' && 
        console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(pathname)} cache status ${chalk.red('[MISS]')}`);
      await redis_client.set(`cache:getpublicdoc:${docId}`, JSON.stringify(dbResult), 'EX', config.API_GET_PUBLIC_DOC_CACHE_EXPIRATION);
      return dbResult;
    } else {
      throw dbResult;
    }
  }
}

export default defineEventHandler(async event => {
  const body = await readBody(event);

  if(body && body.id) {
    try {
      const result = await queryResult(body.id, event.path);
      if(result && result.isPublic) {
        return result;
      } else {
        throw new Error();
      }
    } catch {
      return {
        status: 500,
        message: 'Internal server error'
      }
    }
  } else {
    setResponseStatus(event, 400, 'Missing body data');
    return {
      status: 400,
      message: 'Missing body data'
    }
  }
});