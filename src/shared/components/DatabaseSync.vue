<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { Documentation } from '../indexedDB/models/Documentation';
import { IOldDocumentation } from '../indexedDB/@types/OldDocumentation';

const emit = defineEmits(['on:open', 'on:close']);

type Data = {
  isOpen: boolean,
  isSyncing: boolean,
  docs: IOldDocumentation[]
};

const toast = useToast();
const data = ref<Data>({
  isOpen: false,
  isSyncing: false,
  docs: []
});

const showError = (message: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: message || 'Error on syncing the documentations',
    life: 6000
  });
};

async function syncDoc() {
  if(data.value.isSyncing) return;
  data.value.isSyncing = true;

  const headers = useRequestHeaders(['cookie']) as HeadersInit;
  try {
    const result: { status: number, message: string } = await $fetch('/api/docs/syncOldDoc', {
      method: 'POST',
      headers,
      body: {
        docs: data.value.docs
      }
    });
  
    if(result && result.status === 200) {
      emit('on:close');
      data.value.isOpen = false;
      data.value.isSyncing = false;
      data.value.docs = [];
      Documentation.clear();
    }
  } catch(err) {
    data.value.isSyncing = false;
    // @ts-expect-error
    showError(err.message);
  }
}

onMounted(async () => {
  const oldDocs = await Documentation.getAll();

  if(!oldDocs) return;
  if(oldDocs.length < 1) return;

  data.value.docs = oldDocs;
  data.value.isOpen = true;
  emit('on:open');
});
</script>

<template>
  <div v-if="data.docs.length >= 1" :class="`${data.isOpen? '' : 'opacity-0 pointer-events-none' } duration-300 fixed left-0 top-0 flex justify-center items-center w-screen h-screen bg-secondary px-2.5 z-[800]`">
    <div class="flex flex-col items-center">
      <font-awesome-icon icon="fa-solid fa-rotate" class="text-[105px] text-secondary/75"></font-awesome-icon>
      <div class="flex items-center flex-col gap-2.5 max-w-[600px] mt-5">
        <h2 class="text-[21px] text-primary/80 font-medium">{{ $t('databasesync.title') }}</h2>
        <p class="text-center text-base text-primary/50">{{ $t('databasesync.description') }}</p>
        <div class="flex gap-3.5 mt-6">
          <NuxtLinkLocale 
            to="/" 
            class="flex gap-3.5 items-center w-[120px] md:w-[140px] h-11 bg-primary/20 hover:bg-primary duration-300 text-primary px-5 rounded-md"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left-long"></font-awesome-icon>
            {{ $t('databasesync.back-to-documentations-button-label') }}
          </NuxtLinkLocale>
          <Button @click="syncDoc()" class="!justify-start gap-3.5 w-[120px] md:w-[140px] !h-11 !bg-primary/80 hover:!bg-primary !px-5">
            <font-awesome-icon icon="fa-solid fa-rotate" :spin="data.isSyncing"></font-awesome-icon>
            Sync
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>