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
  }
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
  }
}));