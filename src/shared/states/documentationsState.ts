import { IDocumentation } from '~/shared/storage/models/Documentation';

export type IDocumentationsState = {
  search: string,
  filters: IDocumentationsFilter[],
  data: IDocumentation[]
};

export type IDocumentationsFilter = {
  type: IDocumentationsFilters,
  value: string
};

export type IDocumentationsFilters = 'created_at' | 'updated_at' | 'asc' | 'desc';

export const useDocumentations = () => useState<IDocumentationsState>('documentationsState', () => ({
  search: '',
  filters: [],
  data: []
}));