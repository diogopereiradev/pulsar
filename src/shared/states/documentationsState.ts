import { IDocumentation } from '~/shared/storage/models/Documentation';

export type IDocumentationsState = {
  search: string,
  data: IDocumentation[],
  currentPageData: IDocumentation[],
  newDocsModalIsOpen: boolean,
  uploadDocsModal: {
    isOpen: boolean,
    highlighted: boolean
  }
};

export const useDocumentations = () => useState<IDocumentationsState>('documentationsState', () => ({
  search: '',
  data: [],
  currentPageData: [],
  uploadDocsModal: {
    isOpen: false,
    highlighted: false
  },
  newDocsModalIsOpen: false,
}));