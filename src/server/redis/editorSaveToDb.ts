import { IDocumentation } from "~/@types/declarations/Documentation";
import { db_client } from "~/database/client";
import config from '~/server/config.json';

export async function editorSaveToDb(err: any, value: string | undefined | null): Promise<boolean> {
  if(err) {
    return false;
  }
  try {
    const docToSave = JSON.parse(value!) as IDocumentation;
    
    if(docToSave.id && docToSave.authorIdentifier) {
      await db_client.$connect();
      await db_client.documentation.update({
        data: { 
          ...docToSave,
          title: docToSave.title.slice(0, config.DOC_TITLE_LIMIT) || '',
          description: docToSave.description.slice(0, config.DOC_DESCRIPTION_LIMIT) || '',
          messages: {
            navigationTitle: docToSave.messages.navigationTitle.slice(0, config.DOC_NAVIGATION_TITLE_LIMIT) || '',
            navigationSubTitle: docToSave.messages.navigationSubTitle.slice(0, config.DOC_NAVIGATION_SUB_TITLE_LIMIT) || '',
            indexesTableTitle: docToSave.messages.indexesTableTitle.slice(0, config.DOC_INDEXES_TABLE_TITLE_LIMIT) || ''
          },
          categories: docToSave.categories.slice(0, config.DOC_CATEGORY_LIMIT) || [],
          customizations: docToSave.customizations.slice(0, config.DOC_CUSTOMIZATIONS_LIMIT) || [],
          pages: docToSave.pages.slice(0, config.DOC_PAGE_LIMIT) || []
        },
        where: {
          id: docToSave.id
        }
      });
      await db_client.$disconnect();
      return true;
    } else {
      throw 'Invalid documentation';
    }
  } catch(err) {
    process.env.NODE_ENV === 'development' && console.log(err);
    return false;
  }
}