import { IDocumentation } from '~/@types/declarations/Documentation';

export function getIsFirstPage(doc: IDocumentation, pageId: string) {
  const result = doc.pages.filter(p => p.categoryId === doc.categories[0].id)[0].id === pageId? true : false;
  return result;
}