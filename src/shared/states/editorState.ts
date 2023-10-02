import { IDocumentation, IDocumentationPage, documentationDataEmptyObj } from "../storage/models/Documentation";

type EditorStateType = {
  doc: IDocumentation,
  controlsMenu: {
    isOpen: boolean,
    isSaved: boolean,
    isSaving: boolean
  },
  currentSelectedPage: IDocumentationPage
};

export const useEditor = () => useState<EditorStateType>('editorState', () => ({
  doc: documentationDataEmptyObj,
  controlsMenu: {
    isOpen: false,
    isSaved: true,
    isSaving: false
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