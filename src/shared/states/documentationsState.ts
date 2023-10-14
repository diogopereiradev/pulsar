import { IDocumentation } from '~/shared/storage/models/Documentation';

export type IDocumentationsState = {
  search: string,
  data: IDocumentation[],
  currentPageData: IDocumentation[],
  uploadDocsModal: {
    isOpen: boolean,
    isLoading: boolean,
    highlighted: boolean
  }
  newDocsModalIsOpen: boolean
};

export const useDocumentations = () => useState<IDocumentationsState>('documentationsState', () => ({
  search: '',
  data: [],
  currentPageData: [],
  uploadDocsModal: {
    isOpen: false,
    isLoading: false,
    highlighted: false
  },
  newDocsModalIsOpen: false
}));