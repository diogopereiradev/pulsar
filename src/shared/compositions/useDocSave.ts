import lodash from "lodash";
import { useToast } from "primevue/usetoast";
import { IDocumentation } from "~/@types/declarations/Documentation";
import { documentationDataEmptyObj } from "~/@types/utils/documentation";
import config from '~/server/config.json';

type DataType = {
  unsavedData: IDocumentation,
  lastSaveData: IDocumentation,
  status: {
    isError: boolean,
    isLoaded: boolean,
    isTyping: boolean,
    isSaved: boolean,
    isSaving: boolean
  },
  typingTimerToSave: NodeJS.Timeout | undefined
};

export type DocSaverReturnType = {
  data: globalThis.Ref<DataType>,
  save: () => void
}

export function useDocSave(docId: string): DocSaverReturnType {
  const toast = useToast();
  const data = ref<DataType>({
    unsavedData: documentationDataEmptyObj,
    lastSaveData: documentationDataEmptyObj,
    status: {
      isError: false,
      isLoaded: false,
      isTyping: false,
      isSaved: true,
      isSaving: false
    },
    typingTimerToSave: undefined
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
  
    const result = await useFetch('/api/editorBufferSave', {
      method: 'POST',
      body: JSON.parse(JSON.stringify(data.value.unsavedData))
    });
  
    if(result.status.value === 'success') {
      data.value.status.isSaved = true;
      data.value.status.isSaving = false;
      data.value.lastSaveData = JSON.parse(JSON.stringify(data.value.unsavedData));
    } else {
      showError('Error on saving has occurred!');
      data.value.status.isSaving = false;
    }
  }

  function startAutoSave() {
    setInterval(() => {
      if(
        !data.value.status.isSaved && 
        !data.value.status.isSaving &&
        !data.value.status.isTyping &&
        data.value.unsavedData.features.autoSave
      ) {
        save();
      }
    }, config.EDITOR_AUTOSAVE_INTERVAL);
  }

  // Check if editor.value.unsavedDoc has been modified. If the data has been changed, the user can save the data
  watch(() => data.value.unsavedData, async unsavedDocData => {
    if(!unsavedDocData.id) return;
    const currentDocData = data.value.lastSaveData;
  
    if(lodash.isEqual(unsavedDocData, currentDocData)) {
      data.value.status.isSaved = true;
    } else {
      data.value.status.isSaved = false;
    }
  }, { deep: true });

  onBeforeMount(async () => {
    // Set initial doc lastSaveData and unsavedData
    const result = await $fetch(`/api/getDoc?id=${docId}`, {
      method: 'GET'
    });
    const typedResult = result as { count: number, limit: number, docs: IDocumentation[] };
    
    if(typedResult && typedResult.docs.length > 0) {
      startAutoSave();
      data.value.unsavedData = typedResult.docs[0];
      data.value.lastSaveData = JSON.parse(JSON.stringify(typedResult.docs[0]));
      data.value.status.isLoaded = true;
    } else {
      data.value.status.isError = true;
    }
  });

  onBeforeMount(() => {
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
      if(!data.value.status.isSaved || data.value.status.isSaving) {
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