import { IDocumentation, IDocumentationPage, documentationDataEmptyObj } from "~/database/models/Documentation";

type EditorStateType = {
  doc: IDocumentation,
  controlsMenu: {
    isOpen: boolean,
    isSaved: boolean,
    isSaving: boolean,
    isExportingManifest: boolean
  },
  exportDocModal: {
    isLoading: boolean,
    isError: boolean,
    isDownloading: boolean,
    isCancelling: boolean,
    isOpen: boolean,
    data: Blob | undefined
  },
  currentSelectedPage: IDocumentationPage
};

export const useEditor = () => useState<EditorStateType>('editorState', () => ({
  doc: documentationDataEmptyObj,
  controlsMenu: {
    isOpen: false,
    isSaved: true,
    isSaving: false,
    isExportingManifest: false
  },
  exportDocModal: {
    isLoading: false,
    isError: false,
    isDownloading: false,
    isCancelling: false,
    isOpen: false,
    data: undefined
  },
  currentSelectedPage: {
    id: -1,
    categoryId: -1,
    title: '',
    children: [],
    content: '',
    createdAt: 0,
    lastUpdateAt: 0
  }
}));