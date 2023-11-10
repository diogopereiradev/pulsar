import { IDocumentation } from "~/@types/declarations/Documentation";

export type IDocumentationsState = {
  search: string,
  data: IDocumentation[],
  limit: number,
  currentPageData: IDocumentation[],
  newDocsModal: {
    isOpen: boolean,
    isCreating: boolean
  }
};

export const useDocumentations = () => useState<IDocumentationsState>('documentationsState', () => ({
  search: '',
  data: [],
  limit: 0,
  currentPageData: [],
  newDocsModal: {
    isOpen: false,
    isCreating: false
  }
}));