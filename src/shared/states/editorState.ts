import { IDocumentationPage } from "~/@types/declarations/Documentation";

type EditorStateType = {
  controlsMenu: {
    isOpen: boolean
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
  controlsMenu: {
    isOpen: false
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
    content: '',
    createdAt: 0,
    lastUpdateAt: 0
  }
}));