<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import { useDocumentations } from '~/shared/states/documentationsState';

const docs = useDocumentations();
const searchValue = ref('');

function search() {
  docs.value.search = searchValue.value;
}

function searchClear() {
  docs.value.search = '';
  searchValue.value = '';
}
</script>

<template>
  <Toolbar class="min-h-[100px] max-lg:flex-col max-md:px-4" :pt="{ start: 'max-lg:w-full', end: 'max-lg:w-full'} ">
    <template #start>
      <form @submit.prevent="search()" class="flex items-center w-full">
        <InputText 
          v-model="searchValue" 
          :placeholder="$t('documentations.toolbar-search-placeholder')" 
          class="mr-2 w-full placeholder:text-primary/40 lg:w-[300px] h-11"
        />
        <Button type="submit" class="!w-11 !h-11">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </Button>
        <Button @click="searchClear()" type="button" :class="`${!docs.search && 'hidden'} !w-11 !h-11 ml-2.5`">
          <font-awesome-icon icon="fa-solid fa-close" class="text-xl" />
        </Button>
      </form>
    </template>
    <template #end>
      <div class="flex items-center gap-2.5 w-full">
        <Button @click="docs.newDocsModalIsOpen = !docs.newDocsModalIsOpen" class="!w-11 !h-11 !bg-primary border-none">
          <font-awesome-icon icon="fa-solid fa-plus" class="text-xl" />
        </Button>
        <Button @click="docs.uploadDocsModal.isOpen = !docs.uploadDocsModal.isOpen" class="!w-11 h-11 !bg-[#d8985d] !border-none">
          <font-awesome-icon icon="fa-solid fa-upload" class="text-[19px]" />
        </Button>
      </div>
    </template>
  </Toolbar>
</template>