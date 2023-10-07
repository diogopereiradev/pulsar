import { IDocumentation, IDocumentationPage } from '~/shared/storage/models/Documentation';

export type IDocumentationsState = {
  doc: IDocumentation | undefined,
  currentSelectedPage: IDocumentationPage | undefined,
  navigationMenuIsOpen: boolean
};

export const usePreview = () => useState<IDocumentationsState>('previewState', () => ({
  doc: undefined,
  currentSelectedPage: undefined,
  navigationMenuIsOpen: false
}));