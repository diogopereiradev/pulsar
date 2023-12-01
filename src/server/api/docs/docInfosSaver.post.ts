import { error } from "~/server/utils/error";
import { getServerSession } from "#auth";
import { ErrorMessages } from "../../errors";
import { IDocumentation } from "~/@types/declarations/Documentation";
import { db_client } from "~/database/client";
import { getAuthIdentifier } from '~/server/utils/getAuthIdentifier';
import chalk from "chalk";
import config from '~/server/config';

type BodyData = {
  docId: string,
  docInfos: IDocumentation
};

export default defineEventHandler(async event => {
  // @ts-expect-error
  const session = await getServerSession(event);
  const body: BodyData = await readBody(event);

  try {
    if(!session || !session.user) throw ErrorMessages.unauthorized();

    const author = getAuthIdentifier(session);

    if(body.docId && body.docInfos) {
      await db_client.$connect();
      const result = await db_client.documentation.update({
        data: {
          ...body.docInfos,
          title: body.docInfos.title.slice(0, config.DOC_TITLE_LIMIT) || '',
          description: body.docInfos.description.slice(0, config.DOC_DESCRIPTION_LIMIT) || '',
          messages: {
            navigationTitle: body.docInfos.messages.navigationTitle.slice(0, config.DOC_NAVIGATION_TITLE_LIMIT) || '',
            navigationSubTitle: body.docInfos.messages.navigationSubTitle.slice(0, config.DOC_NAVIGATION_SUB_TITLE_LIMIT) || '',
            indexesTableTitle: body.docInfos.messages.indexesTableTitle.slice(0, config.DOC_INDEXES_TABLE_TITLE_LIMIT) || ''
          },
          categories: body.docInfos.categories.slice(0, config.DOC_CATEGORY_LIMIT) || [],
          customizations: body.docInfos.customizations.slice(0, config.DOC_CUSTOMIZATIONS_LIMIT) || [],
          pages: body.docInfos.pages.slice(0, config.DOC_PAGE_LIMIT) || []
        },
        where: {
          id: body.docId,
          authorIdentifier: author.identifier
        }
      });
      await db_client.$disconnect();

      if(result.id) {
        process.env.NODE_ENV === 'development' && 
          console.log(`${chalk.cyan('[PulsarLog]')} Doc infos saved to documentation ${chalk.yellow(body.docId)} ${chalk.green('[SAVED]')}`);
        return {
          status: 200
        }
      }
      throw ErrorMessages.notfound();
    }
    throw ErrorMessages.unauthorized();
  } catch(err) {
    const perr = error(err);
    setResponseStatus(event, perr.status, perr.message);
    return perr;
  }
});