import { db_client } from '~/database/client';
import { getAuthIdentifier } from '../../utils/getAuthIdentifier';
import { generateId } from '../../utils/generateId';
import { IDocumentation } from '~/@types/declarations/Documentation';
import { Prisma } from '@prisma/client';
import { getServerSession } from '#auth';
import config from '~/server/config';
import chalk from 'chalk';

function createDoc(accountIdentifier: string, docData: Omit<IDocumentation, 'id' | 'createdAt' | 'updatedAt'>): Promise<IDocumentation | any> {
  return new Promise(async (resolve, reject) => {
    const id = generateId(10);
    await db_client.$connect();
    const count = await db_client.documentation.count({
      where: {
        authorIdentifier: accountIdentifier
      }
    });
    
    // Block the creation of doc if the limit was exceeded
    if(count < config.DOC_LIMIT) {
      await db_client.documentation.create({
        data: {
          id,
          title: docData.title.slice(0, config.DOC_TITLE_LIMIT) || '',
          description: docData.description.slice(0, config.DOC_DESCRIPTION_LIMIT) || '',
          messages: {
            navigationTitle: docData.messages.navigationTitle.slice(0, config.DOC_NAVIGATION_TITLE_LIMIT) || '',
            navigationSubTitle: docData.messages.navigationSubTitle.slice(0, config.DOC_NAVIGATION_SUB_TITLE_LIMIT) || '',
            indexesTableTitle: docData.messages.indexesTableTitle.slice(0, config.DOC_INDEXES_TABLE_TITLE_LIMIT) || ''
          },
          categories: docData.categories.slice(0, config.DOC_CATEGORY_LIMIT) || [],
          customizations: docData.customizations.slice(0, config.DOC_CUSTOMIZATIONS_LIMIT) || [],
          pages: docData.pages.slice(0, config.DOC_PAGE_LIMIT) || [],
          colors: docData.colors as Prisma.JsonObject,
          features: docData.features as Prisma.JsonObject,
          isPublic: docData.isPublic,
          authorIdentifier: accountIdentifier
        }
      }).then(res => {
        db_client.$disconnect();
        resolve(res);
      })
      .catch(err => {
        console.log(err);
        db_client.$disconnect();
        reject(err);
      });
    } else {
      reject({
        status: count >= config.DOC_LIMIT? 400 : 500,
        message: count >= config.DOC_LIMIT? `The limit of ${config.DOC_LIMIT} documentations was exceeded!` : 'Internal server error'
      });
    }
  });
}

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const body = await readBody(event);

  if(session && session.user && body.documentation) {
    const accountIdentifier = getAuthIdentifier(session);
    const docData = body.documentation as Omit<IDocumentation, 'id' | 'createdAt' | 'updatedAt'>;
    
    try {
      const result: IDocumentation = await createDoc(accountIdentifier.identifier!, docData);

      if(result.id) {
        process.env.NODE_ENV === 'development' && 
          console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(event.path)} documentation ${chalk.yellow(result.id)} ${chalk.green('[CREATED]')}`);
        return result;
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
    };
  }
});