import { getServerSession } from "#auth";
import { IDocumentation } from "~/@types/declarations/Documentation";
import { documentationDataEmptyObj } from '~/@types/utils/documentation';
import { db_client } from "~/database/client";
import chalk from 'chalk';
import config from '~/server/config';

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

// Get the route result based on cache or database
async function queryResult(authorIdentifier: string, urlQueries: URLQueries, pathname: string) {
  try {
    const dbQueryResult = await getDbDoc(authorIdentifier, urlQueries);
  
    if(dbQueryResult) {
      const result = dbQueryResult as [number, IDocumentation[]];
      const data = {
        count: result[0] || 0,
        limit: config.DOC_LIMIT,
        docs: result[1] || []
      };

      process.env.NODE_ENV === 'development' && 
      console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(pathname)} status ${chalk.green('[SUCCESS]')}`);
      return data;
    } else {
      return dbQueryResult;
    }
  } catch(err) {
    return err;
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
    return queryresult;
  } else {
    setResponseStatus(event, 401, 'Unauthorized');
    return {
      status: 401,
      message: 'Unauthorized'
    };
  }
});