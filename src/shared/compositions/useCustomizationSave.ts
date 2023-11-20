import { Buffer } from "buffer";
import { useToast } from "primevue/usetoast";
import { IDocumentationCustomization } from "~/@types/declarations/Documentation";
import config from '~/server/config';

type Content = {
  html: string,
  css: string,
  javascript: string
};

type DataType = {
  unsavedContent: Content,
  lastSavedContent: Content,
  status: {
    isTyping: boolean,
    isSaved: boolean,
    isSaving: boolean
  },
  typingTimerToSave: NodeJS.Timeout | undefined,
  currentSelectedCustomization: IDocumentationCustomization
};

export type CustomizationSaverReturnType = {
  data: globalThis.Ref<DataType>,
  save: () => void
}

const emptyContent = {
  html: '',
  css: '',
  javascript: ''
};

export function useCustomizationSave(): CustomizationSaverReturnType {
  const toast = useToast();
  const { params } = useRoute();
  const data = ref<DataType>({
    unsavedContent: emptyContent,
    lastSavedContent: emptyContent,
    status: {
      isTyping: false,
      isSaved: true,
      isSaving: false
    },
    typingTimerToSave: undefined,
    currentSelectedCustomization: {
      id: -1,
      title: '',
      region: 'top'
    }
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
        type: 'customization',
        docId: params.id,
        id: data.value.currentSelectedCustomization.id,
        content: JSON.stringify(data.value.unsavedContent)
      }
    });
  
    if(result.status.value === 'success') {
      data.value.status.isSaved = true;
      data.value.status.isSaving = false;
      data.value.lastSavedContent = JSON.parse(JSON.stringify(data.value.unsavedContent));
    } else {
      showError('Error on saving customization has occurred!');
      data.value.status.isSaving = false;
    }
  }

  function startAutoSave() {
    setInterval(() => {
      if(
        !data.value.status.isSaved && 
        !data.value.status.isSaving &&
        !data.value.status.isTyping &&
        data.value.currentSelectedCustomization.id !== -1
      ) {
        save();
      }
    }, config.EDITOR_AUTOSAVE_INTERVAL);
  }

  // Check if editor.value.unsavedContent has been modified. If the data has been changed, the user can save the data
  watch(() => data.value.unsavedContent, async unsavedContent => {
    const currentContent = data.value.lastSavedContent;
  
    if(unsavedContent === currentContent) {
      data.value.status.isSaved = true;
    } else {
      data.value.status.isSaved = false;
    }
  }, { deep: true });

  // When currentSelectedCustomization was changed
  watch(() => data.value.currentSelectedCustomization, async (customization) => {
    if(!customization.id || customization.id === -1) return;

    data.value.status.isSaved = false;
    data.value.status.isSaving = true;
    // Load the page when click in navigation menu
    const result = await fetch('/api/readStream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        type: 'customization',
        docId: params.id,
        id: customization.id
      })
    });
    const typedResult = result.body as ReadableStream;
    
    if(result.status !== 200) {
      showError(`Error on starting the file streaming transfer to the customization: ${data.value.currentSelectedCustomization.title}`);
      return;
    }

    const reader = typedResult.getReader();

    const read = async () => {
      const { done, value } = await reader.read();

      if(done) {
        data.value.status.isSaved = true;
        data.value.status.isSaving = false;
        reader.releaseLock();
        return;
      }
      const bufferToString = JSON.parse(Buffer.from(value).toString());
      data.value.unsavedContent = bufferToString;
      data.value.lastSavedContent = JSON.parse(JSON.stringify(bufferToString));
      await read();
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
      if(!data.value.status.isSaved && data.value.currentSelectedCustomization.id !== -1) {
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