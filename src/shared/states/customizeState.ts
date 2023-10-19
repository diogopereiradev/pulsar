import { IDocumentation, IDocumentationCustomization, documentationDataEmptyObj } from "~/database/models/Documentation";

type EditorStateType = {
  doc: IDocumentation,
  controlsMenu: {
    isOpen: boolean,
    isSaved: boolean,
    isSaving: boolean,
    newCustomizationModal: {
      isOpen: boolean,
      data: {
        title: string,
        region: 'left' | 'right' | 'top' | 'bottom'
      }
    },
    customizationInfosMenu: {
      isOpen: boolean,
      data: IDocumentationCustomization | undefined
    }
  }
};

export const useCustomize = () => useState<EditorStateType>('customizeState', () => ({
  doc: documentationDataEmptyObj,
  controlsMenu: {
    isOpen: false,
    isSaved: true,
    isSaving: false,
    newCustomizationModal: {
      isOpen: false,
      data: {
        title: '',
        region: 'top'
      }
    },
    customizationInfosMenu: {
      isOpen: false,
      data: undefined
    }
  }
}));