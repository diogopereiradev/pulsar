import { IDocumentation } from '~/shared/storage/models/Documentation';

export type IDocumentationsState = {
  search: string,
  data: IDocumentation[],
  currentPageData: IDocumentation[],
  newDocsModalIsOpen: boolean
};

export const useDocumentations = () => useState<IDocumentationsState>('documentationsState', () => ({
  search: '',
  data: [],
  currentPageData: [],
  newDocsModalIsOpen: false
}));