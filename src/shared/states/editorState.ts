import { IDocumentation, IDocumentationPage } from "~/@types/declarations/Documentation";
import { documentationDataEmptyObj } from "~/@types/utils/documentation";

type EditorStateType = {
  unsavedDoc: IDocumentation,
  docDataSinceLastSave: IDocumentation,
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
  unsavedDoc: documentationDataEmptyObj,
  docDataSinceLastSave: documentationDataEmptyObj,
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
    content: '',
    createdAt: 0,
    lastUpdateAt: 0
  }
}));