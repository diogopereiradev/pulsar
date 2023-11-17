import chalk from 'chalk';
import { IDocumentation } from '~/@types/declarations/Documentation';
import { db_client } from '~/database/client';
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

async function queryResult(docId: string, pathname: string) {
  const dbResult = await getPublicDoc(docId);

  if(dbResult) {
    process.env.NODE_ENV === 'development' && 
      console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(pathname)} status ${chalk.green('[SUCESS]')}`);
    return dbResult;
  } else {
    throw dbResult;
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