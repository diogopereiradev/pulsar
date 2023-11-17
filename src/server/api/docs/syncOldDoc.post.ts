import { getServerSession } from "#auth";
import { IOldDocumentation } from '~/shared/indexedDB/@types/OldDocumentation';
import { documentationDataEmptyObj } from "~/@types/utils/documentation";
import { IDocumentation } from '~/@types/declarations/Documentation';
import { db_client } from "~/database/client";
import config from '~/server/config';
import chalk from "chalk";
import { formatToISO8601 } from "../../utils/formatToISO8601";

function parseToNewDoc(authorIdentifier: string, doc: IOldDocumentation): IDocumentation {
  const newDocId = generateId(10);

  return {
    id: newDocId,
    title: doc.title.slice(0, config.DOC_TITLE_LIMIT) || '',
    description: doc.description.slice(0, config.DOC_DESCRIPTION_LIMIT) || '',
    messages: {
      navigationTitle: doc.navigationTitle.slice(0, config.DOC_NAVIGATION_TITLE_LIMIT) || '',
      navigationSubTitle: doc.navigationSubTitle.slice(0, config.DOC_NAVIGATION_SUB_TITLE_LIMIT) || '',
      indexesTableTitle: doc.indexesTableTitle.slice(0, config.DOC_INDEXES_TABLE_TITLE_LIMIT) || ''
    },
    categories: doc.categories.slice(0, config.DOC_CATEGORY_LIMIT) || [],
    customizations: doc.customizations.slice(0, config.DOC_CUSTOMIZATIONS_LIMIT) || [],
    pages: doc.pages.slice(0, config.DOC_PAGE_LIMIT) || [],
    colors: doc.colors || documentationDataEmptyObj.colors,
    features: doc.features || documentationDataEmptyObj.features,
    isPublic: false,
    updatedAt: formatToISO8601(new Date()),
    createdAt: formatToISO8601(new Date(doc.createdAt)).match('NaN')? formatToISO8601(new Date()) : formatToISO8601(new Date(doc.createdAt)),
    authorIdentifier
  }
}

async function syncOldDoc(authorIdentifier: string, oldDocs: IOldDocumentation[]) {
  return new Promise(async (resolve, reject) => {
    await db_client.$connect();
    const count = await db_client.documentation.count({
      where: {
        authorIdentifier
      }
    });

    if((count + oldDocs.length) > config.DOC_LIMIT) {
      await db_client.$disconnect();
      reject({
        status: 400,
        message: `If you synchronize these docs you will break the limit of ${config.DOC_LIMIT} docs, reduce the quantity!`
      });
    } else {
      db_client.documentation.createMany({
        data: oldDocs.map(doc => parseToNewDoc(authorIdentifier, doc))
      })
      .then(async () => {
        await db_client.$disconnect();
        resolve({
          status: 200,
          message: 'All docs synced now'
        });
      })
      .catch(async err => {
        await db_client.$disconnect();
        reject({
          status: 500,
          message: err
        });
      });
    }
  });
}

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const body = await readBody(event);
  
  if(session && session.user && body) {
    try {
      const oldDocs = body.docs as IOldDocumentation[];
      if(!oldDocs) {
        setResponseStatus(event, 500, 'Internal server error');
        throw {
          status: 500,
          message: 'Internal server error'
        }
      }
      const author = getAuthIdentifier(session);
      const result = await syncOldDoc(author.identifier!, oldDocs);
      process.env.NODE_ENV === 'development' && 
        console.log(`${chalk.cyan('[PulsarLog]')} Request in ${chalk.yellow(event.path)} documentations synced count ${chalk.yellow(oldDocs.length)} ${chalk.green('[SYNCED]')}`);
      return result;
    } catch(err) {
      // @ts-expect-error
      setResponseStatus(event, err.status, err.message);
      return {
        // @ts-expect-error
        status: err.status,
        // @ts-expect-error
        message: err.message
      }
    }
  } else {
    setResponseStatus(event, 401, 'Unauthorized');
    return {
      status: 401,
      message: 'Unauthorized'
    }
  }
});