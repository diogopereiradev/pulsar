import { IDocumentation, IDocumentationCustomization } from "~/@types/declarations/Documentation";
import { documentationDataEmptyObj } from "~/@types/utils/documentation";

type EditorStateType = {
  unsavedDoc: IDocumentation,
  docDataSinceLastSave: IDocumentation,
  codeEditor: {
    isOpen: boolean,
    isMobile: boolean,
    onlyShowResult: boolean
  }
  controlsMenu: {
    isOpen: boolean,
    isSaved: boolean,
    isSaving: boolean,
    newCustomizationModal: {
      isOpen: boolean,
      data: {
        title: string,
        region: 'top' | 'bottom'
      }
    },
    customizationInfosMenu: {
      isOpen: boolean,
      data: IDocumentationCustomization
    }
  }
};

export const useCustomize = () => useState<EditorStateType>('customizeState', () => ({
  unsavedDoc: documentationDataEmptyObj,
  docDataSinceLastSave: documentationDataEmptyObj,
  codeEditor: {
    isOpen: false,
    isMobile: false,
    onlyShowResult: false
  },
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
      data: {
        id: -1,
        title: '',
        region: 'top',
        content: {
          html: '',
          css: '',
          javascript: ''
        }
      }
    }
  }
}));