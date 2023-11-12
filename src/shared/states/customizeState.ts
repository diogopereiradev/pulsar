import { IDocumentationCustomization } from "~/@types/declarations/Documentation";

type EditorStateType = {
  codeEditor: {
    isOpen: boolean,
    isMobile: boolean,
    onlyShowResult: boolean
  }
  controlsMenu: {
    isOpen: boolean,
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
  codeEditor: {
    isOpen: false,
    isMobile: false,
    onlyShowResult: false
  },
  controlsMenu: {
    isOpen: false,
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