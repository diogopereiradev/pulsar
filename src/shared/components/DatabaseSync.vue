<script setup lang="ts">
import { Status } from '~/@types/status';
import { Documentation, IDocumentation, documentationDataEmptyObj } from '../storage/models/Documentation';

type Data = {
  isChecking: boolean,
  isSyncing: boolean,
  diff: string[]
};

const props = defineProps<{ docId: number }>();
const data = ref<Data>({
  isChecking: false,
  isSyncing: false,
  diff: []
});

async function validityDocSync() {
  if(props.docId != 0) {
    const doc = await Documentation.get(props.docId);

    if(doc) {
      const docKeys = Object.keys(doc);
      const databaseColumnsKeys = Object.keys(documentationDataEmptyObj);
      const diff = databaseColumnsKeys.filter(key => !docKeys.includes(key));
      data.value.diff = diff;

      if(data.value.diff.length >= 1) {
        data.value.isChecking = true;
      }
    }
  }
}

function syncDoc() {
  if(data.value.isSyncing) return;
  data.value.isSyncing = true;
  setTimeout(async () => {
    const databaseColumnsKeys = Object.keys(documentationDataEmptyObj);
    const updatedDocData: Partial<IDocumentation> = {};

    data.value.diff.forEach(diffKeyname => {
      // @ts-ignore
      updatedDocData[diffKeyname] = documentationDataEmptyObj[diffKeyname];
    });
    
    const updatedKeys = Object.keys(updatedDocData);
    const onlyKeysThatExists = databaseColumnsKeys.filter(key => updatedKeys.includes(key) && key);
    const conflitsIsResolved = onlyKeysThatExists.length === updatedKeys.length;
    
    if(conflitsIsResolved) {
      const result = await Documentation.edit(props.docId, updatedDocData);

      if(result === Status.OK) {
        data.value.isSyncing = false;
        data.value.isChecking = false;
        data.value.diff = [];
      } else {
        alert('Error on trying to edit the documentation!');
      }
    } else {
      alert('Error on trying to sync the documentation!');
    }
  }, 300);
}

watch(() => props.docId, async (id) => {
  validityDocSync();
});

onBeforeMount(() => {
  validityDocSync();
});
</script>

<template>
  <div :class="`${data.isChecking? '' : 'opacity-0 pointer-events-none' } duration-300 fixed left-0 top-0 flex justify-center items-center w-screen h-screen bg-secondary px-2.5 z-[9999]`">
    <div class="flex flex-col items-center">
      <font-awesome-icon icon="fa-solid fa-rotate" class="text-[105px] text-secondary/75"></font-awesome-icon>
      <div class="flex items-center flex-col gap-2.5 max-w-[600px] mt-5">
        <h2 class="text-[21px] text-primary/80 font-medium">{{ $t('databasesync.title') }}</h2>
        <p class="text-center text-base text-primary/50">{{ $t('databasesync.description') }}</p>
        <p class="text-base text-primary/70" v-if="data.diff.length >= 1">
          <strong>{{ $t('databasesync.missing-data-text') }}: </strong>
          <span class="text-secondary/90">{{ data.diff.join(', ') }}</span>
        </p>
        <div class="flex gap-3.5 mt-6">
          <NuxtLinkLocale 
            to="/documentations" 
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