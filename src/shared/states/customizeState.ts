import { IDocumentation, documentationDataEmptyObj } from "../storage/models/Documentation";

type EditorStateType = {
  doc: IDocumentation,
  controlsMenu: {
    isOpen: boolean,
    isSaved: boolean,
    isSaving: boolean
  }
};

export const useCustomize = () => useState<EditorStateType>('customizeState', () => ({
  doc: documentationDataEmptyObj,
  controlsMenu: {
    isOpen: false,
    isSaved: true,
    isSaving: false
  }
}));