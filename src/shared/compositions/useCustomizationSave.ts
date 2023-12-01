import lodash from 'lodash';
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
  cachedCustomizations: (IDocumentationCustomization & { content: Content })[],
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
    cachedCustomizations: [],
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
      // Update the cached customization content
      const cachedPage = data.value.cachedCustomizations.find(c => c.id === data.value.currentSelectedCustomization.id) as IDocumentationCustomization & { content: Content };
      if(cachedPage) {
        const updatedPages = data.value.cachedCustomizations.map(c => {
          if(c.id === data.value.currentSelectedCustomization.id) {
            return { 
              ...c, 
              content: JSON.parse(JSON.stringify(data.value.unsavedContent)) 
            };
          } else {
            return c;
          }
        });
        data.value.cachedCustomizations = updatedPages;
      }

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
  
    if(lodash.isEqual(currentContent, unsavedContent)) {
      data.value.status.isSaved = true;
    } else {
      data.value.status.isSaved = false;
    }
  }, { deep: true });

  // When currentSelectedCustomization was changed
  watch(() => data.value.currentSelectedCustomization, async (customization) => {
    if(!customization.id || customization.id === -1) return;

    
    // If the customization is cached set the content
    const cachedPage = data.value.cachedCustomizations.find(c => c.id === customization.id) as IDocumentationCustomization  & { content: Content };
    if(cachedPage) {
      data.value.unsavedContent = cachedPage.content;
      console.log(cachedPage.content);
      data.value.lastSavedContent = JSON.parse(JSON.stringify(cachedPage.content));
      return;
    }
    
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

    const read = async (val?: Content) => {
      const { done, value } = await reader.read();

      if(done) {
        data.value.status.isSaved = true;
        data.value.status.isSaving = false;

        // Add the requested page content to cached pages
        data.value.cachedCustomizations = [
          ...data.value.cachedCustomizations,
          {
            ...customization,
            content: val || {} as Content
          }
        ];

        reader.releaseLock();
        return;
      }
      const bufferToString: Content = JSON.parse(Buffer.from(value).toString());
      data.value.unsavedContent = bufferToString;
      data.value.lastSavedContent = JSON.parse(JSON.stringify(bufferToString));
      await read(bufferToString);
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