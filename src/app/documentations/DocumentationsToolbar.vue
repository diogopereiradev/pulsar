<script setup lang="ts">
import Toolbar from 'primevue/toolbar';
import InputText from 'primevue/inputtext';
import { useDocumentations } from '~/shared/states/documentationsState';

const docState = useDocumentations();
</script>

<template>
  <Toolbar 
    class="min-h-[100px] max-lg:flex-col max-md:px-[15px]"
    :pt="{
      start: 'max-lg:w-full',
      end: 'max-lg:w-full'
    }"
  >
    <template #start>
      <div class="flex items-center w-full">
        <InputText v-model="docState.search" placeholder="Search" class="mr-2 w-full lg:w-[300px] h-[45px]" />
        <Button class="min-w-[45px] min-h-[45px]">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </Button>
      </div>
    </template>
    <template #end>
      <div class="flex items-center gap-[10px] w-full">
        <Button class="w-[45px] min-h-[45px] !bg-secondary">
          <font-awesome-icon icon="fa-solid fa-filter" class="text-primary/80" />
        </Button>
        <Button class="w-[45px] min-h-[45px] !bg-primary">
          <font-awesome-icon icon="fa-solid fa-plus" class="text-[20px]" />
        </Button>
      </div>
    </template>
  </Toolbar>
</template>