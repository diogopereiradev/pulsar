import { getServerSession } from "#auth";
import { IDocumentation } from "~/@types/declarations/Documentation";
import { documentationDataEmptyObj } from '~/@types/utils/documentation';
import { db_client } from "~/database/client";
import chalk from 'chalk';
import config from '~/server/config.json';
import { redis_client } from "~/database/redis";

type RouteSuccessResult = { 
  count: number, 
  limit: number, 
  docs: IDocumentation[] 
};

type URLQueries = {
  id?: string,
  page?: string,
  perPage?: string
  strategy?: 'asc' | 'desc',
  properties: string
};

const urlQueriesBaseData: URLQueries = {
  id: '',
  properties: '',
  strategy: 'asc',
  page: '',
  perPage: ''
};

// Function serves just to serve docs in database and apply the queries filters.
function getDbDoc(authorIdentifier: string, urlQueries: URLQueries): Promise<[number, IDocumentation[]] | any> {
  return new Promise(async (resolve, reject) => {
    db_client.$connect();
    try {
      const { id, page, perPage, strategy, properties } = urlQueries;
      const props = properties? properties.split(',') : undefined;

      if(props && props.filter(p => !Object.keys(documentationDataEmptyObj).includes(p)).length > 0) {
        throw 'Invalid properties was found in url queries!';
      }

      function validateProps(propName: keyof IDocumentation) {
        return properties? props?.includes(propName)? true : undefined : true;
      }

      const docsCount = await db_client.documentation.count({
        where: {
          authorIdentifier
        }
      });

      if(docsCount > 0) {
        const result = await db_client.documentation.findMany({
          take: perPage && perPage? Number(perPage) : undefined,
          skip: page && perPage? Number(perPage) * (Number(page) === 0? 0 : Number(page) - 1) : undefined,
          orderBy: {
            title: strategy || 'asc'
          },
          where: {
            id,
            authorIdentifier
          },
          select: {
            id: validateProps('id'),
            title: validateProps('title'),
            description: validateProps('description'),
            categories: validateProps('categories'),
            pages: validateProps('pages'),
            customizations: validateProps('customizations'),
            colors: validateProps('colors'),
            features: validateProps('features'),
            messages: validateProps('messages'),
            authorIdentifier: validateProps('authorIdentifier'),
            isPublic: validateProps('isPublic'),
            updatedAt: validateProps('updatedAt'),
            createdAt: validateProps('createdAt'),
          }
        });
        
        if(docsCount && result) {
          resolve([docsCount, result]);
        } else {
          throw result;
        }
      } else {
        resolve([ 0, [] ]);
      }
    } catch(err) {
      db_client.$disconnect();
      reject(err);
    }
  });
}

async function getCacheDoc(authorIdentifier: string, urlQueries: URLQueries): Promise<[number, IDocumentation[]] | undefined> {
  const rc = redis_client;
  const cachedUserDocs = await rc.get(`cache:getdoc:${authorIdentifier}${Object.keys(urlQueries).length > 0? ':' + JSON.stringify(urlQueries) : ''}`);
  
  if(cachedUserDocs) {
    try {
      const docs = JSON.parse(cachedUserDocs);
      return docs;
    } catch {
      return undefined;
    }
  } else {
    return undefined;
  }
}

// Get the route result based on cache or database
async function queryResult(authorIdentifier: string, urlQueries: URLQueries, pathname: string) {
  try {
    const cacheResult = await getCacheDoc(authorIdentifier, urlQueries);
    
    if(cacheResult) {
      // CACHE HIT
      process.env.NODE_ENV === 'development' && 
        console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(pathname)} cache status ${chalk.green('[HIT]')}`);
      return cacheResult;
    } else {
      // CACHE MISS
      const dbQueryResult = await getDbDoc(authorIdentifier, urlQueries);
    
      if(dbQueryResult) {
        const result = dbQueryResult as [number, IDocumentation[]];
        const data = {
          count: result[0] || 0,
          limit: config.DOC_LIMIT,
          docs: result[1] || []
        };

        // Add to the cache
        const cacheKey = `cache:getdoc:${authorIdentifier}${Object.keys(urlQueries).length > 0? ':' + JSON.stringify(urlQueries) : ''}`;
        redis_client.set(cacheKey, JSON.stringify(data), 'EX', config.API_GET_DOC_CACHE_EXPIRATION);

        process.env.NODE_ENV === 'development' && 
        console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(pathname)} cache status ${chalk.red('[MISS]')}`);
        return data;
      } else {
        return dbQueryResult;
      }
    }
  } catch(err) {
    return err;
  }
}

/*
  This function serves to return the updated doc data when the "id" filter is active. Because the project has the cache system when 
  the user save doc in editor, then if the user save data in editor page and reload it, you not will be able to view the new data.
*/
async function checkForTemporaryDocBufferFilterId(result: RouteSuccessResult) {
  const selectedDoc = result.docs[0];
  
  if(selectedDoc) {
    const tmpBufferInRedis = await redis_client.get(`tmp:doc:${selectedDoc.id}${config.REDIS_EDITOR_EXPIRED_BUFFER_KEY}`);
    const tmpDoc = tmpBufferInRedis? JSON.parse(tmpBufferInRedis) as IDocumentation : undefined;
  
    if(tmpBufferInRedis && tmpDoc) {
      const newDocs = result.docs.map(doc => doc.id === tmpDoc.id? tmpDoc : doc);
      return {
        ...result,
        docs: newDocs
      };
    } else {
      return result;
    }
  } else {
    return result;
  }
}

// Yeah bro this function is so big, feel free to refactor it
/*
  This function serves to return the updated doc data. Because the project has the cache system when the user save doc in editor
  then if the user save data in editor page and reload it, you not will be able to view the new data.
*/
async function checkForTemporaryDocBufferFilterAll(result: RouteSuccessResult) {
  const newDocs = await Promise.all(result.docs.map(async doc => {
    const selectedDoc = result.docs.find(resDoc => resDoc.id === doc.id);
    
    
    if(selectedDoc) {
      const tmpBufferInRedis = await redis_client.get(`tmp:doc:${selectedDoc.id}${config.REDIS_EDITOR_EXPIRED_BUFFER_KEY}`);
      const tmpDoc = tmpBufferInRedis? JSON.parse(tmpBufferInRedis) as IDocumentation : undefined;

      if(!tmpDoc) return doc;
      if(doc.id !== tmpDoc.id) return doc;
      const docKeys = Object.keys(doc);
      // Transform doc keys values to the tmpDoc key values
      docKeys.forEach((key) => {
        // @ts-expect-error
        doc[key] = tmpDoc[key];
      });
      return doc;
    } else {
      return doc;
    }
  }));
  return {
    ...result,
    docs: newDocs
  };
}

async function checkForRedisTemporaryDocBuffer(result: RouteSuccessResult, urlQueries: URLQueries): Promise<RouteSuccessResult> {
  const queries = urlQueries;
  
  if(queries.id) {
    return await checkForTemporaryDocBufferFilterId(result);
  } else {
    return await checkForTemporaryDocBufferFilterAll(result);
  }
}

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const urlQueries: URLQueries = getQuery(event);
  const validateQueries = Object.keys(urlQueries).filter(query => !Object.keys(urlQueriesBaseData).includes(query)).length > 0? false : true;
    
  if(session && session.user && validateQueries) {
    const authorIdentifier = getAuthIdentifier(session);
    const queryresult = await queryResult(authorIdentifier.identifier!, urlQueries, event.path);
    const result = await checkForRedisTemporaryDocBuffer(queryresult, urlQueries);
    return result;
  } else {
    setResponseStatus(event, 401, 'Unauthorized');
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }
});