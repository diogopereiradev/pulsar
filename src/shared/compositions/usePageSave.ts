import { Buffer } from "buffer";
import { useToast } from "primevue/usetoast";
import { IDocumentationPage } from "~/@types/declarations/Documentation";
import config from '~/server/config';

type DataType = {
  unsavedContent: string,
  lastSavedContent: string,
  status: {
    isTyping: boolean,
    isSaved: boolean,
    isSaving: boolean
  },
  typingTimerToSave: NodeJS.Timeout | undefined,
  currentSelectedPage: IDocumentationPage,
  isLoadingContent: boolean
};

export type PageSaverReturnType = {
  data: globalThis.Ref<DataType>,
  save: () => void
}

export function usePageSave(): PageSaverReturnType {
  const toast = useToast();
  const { params } = useRoute();
  const data = ref<DataType>({
    unsavedContent: '',
    lastSavedContent: '',
    status: {
      isTyping: false,
      isSaved: true,
      isSaving: false
    },
    typingTimerToSave: undefined,
    currentSelectedPage: {
      id: '-1',
      categoryId: 0,
      title: '',
    },
    isLoadingContent: false
  });

  const showError = (message?: string) => {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: message || 'Error on executing this action',
      life: 6000
    });
  }

  async function save() {
    if(data.value.status.isSaved) return;
    data.value.status.isSaving = true;
  
    const result = await useFetch('/api/writeStream', {
      method: 'POST',
      body: {
        type: 'page',
        docId: params.id,
        id: data.value.currentSelectedPage.id,
        content: JSON.parse(JSON.stringify(data.value.unsavedContent))
      }
    });
  
    if(result.status.value === 'success') {
      data.value.status.isSaved = true;
      data.value.status.isSaving = false;
      data.value.lastSavedContent = JSON.parse(JSON.stringify(data.value.unsavedContent));
    } else {
      showError('Error on saving page has occurred!');
      data.value.status.isSaving = false;
    }
  }

  function startAutoSave() {
    setInterval(() => {
      if(
        !data.value.status.isSaved && 
        !data.value.status.isSaving &&
        !data.value.status.isTyping &&
        data.value.currentSelectedPage.id !== '-1'
      ) {
        save();
      }
    }, config.EDITOR_AUTOSAVE_INTERVAL);
  }

  // Check if editor.value.unsavedDoc has been modified. If the data has been changed, the user can save the data
  watch(() => data.value.unsavedContent, async unsavedContent => {
    const currentContent = data.value.lastSavedContent;
  
    if(unsavedContent === currentContent) {
      data.value.status.isSaved = true;
    } else {
      data.value.status.isSaved = false;
    }
  }, { deep: true });

  // When currentSelectedPage was changed
  watch(() => data.value.currentSelectedPage, async (page) => {
    if(!page.id || page.id === '-1') return;

    data.value.status.isSaved = false;
    data.value.status.isSaving = true;
    data.value.isLoadingContent = true;
    // Load the page when click in navigation menu
    const result = await fetch('/api/readStream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'page',
        docId: params.id,
        id: page.id
      })
    });
    const typedResult = result.body as ReadableStream;
    
    if(result.status !== 200) {
      showError(`Error on starting the file streaming transfer to the page: ${data.value.currentSelectedPage.title}`);
      data.value.currentSelectedPage = {
        id: '-1',
        title: '',
        categoryId: 0
      };
      return;
    }

    const reader = typedResult.getReader();

    const read = async (val = '') => {
      const { done, value } = await reader.read();

      if(done) {
        data.value.status.isSaved = true;
        data.value.status.isSaving = false;

        // If the page content is empty clear the last opened page content
        if(val === '') {
          data.value.unsavedContent = '';
          data.value.lastSavedContent = '';
        }

        setTimeout(() => {
          data.value.isLoadingContent = false;
        }, 200);
        reader.releaseLock();
        return;
      }
      const bufferToString = Buffer.from(value).toString();

      data.value.unsavedContent = bufferToString;
      data.value.lastSavedContent = bufferToString;
      val = bufferToString;
      await read(val);
    };
    await read();
  });

  onBeforeMount(() => {
    startAutoSave();

    // Check if user is typing something, is used to block the autosave if user is typing.
    window.addEventListener('keypress', () => {
      data.value.status.isTyping = true;
      
      if(data.value.typingTimerToSave) clearTimeout(data.value.typingTimerToSave);

      data.value.typingTimerToSave = setTimeout(() => {
        data.value.status.isTyping = false;
      }, config.EDITOR_AUTOSAVE_AFTER_STOP_TYPING_INTERVAL);
    });

    // Warn the user if is unsaved on window leave
    window.addEventListener('beforeunload', (e) => {
      if(!data.value.status.isSaved && data.value.currentSelectedPage.id !== '-1') {
        e.preventDefault();
        e.returnValue = true;
      }
    });
  });

  return {
    data,
    save
  };
}