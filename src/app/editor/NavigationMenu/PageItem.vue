<script setup lang="ts">
import { IDocumentationPage } from '~/@types/declarations/Documentation';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import { PageSaverReturnType } from '~/shared/compositions/usePageSave';
import InputText from 'primevue/inputtext';

type Props = {
  page: IDocumentationPage
};
const props = defineProps<Props>();
defineEmits(['update:pageChange', 'pageDelete']);

const isEditing = ref(false);
const editInputValue = ref('');
const docSaver = inject('docSaver') as DocSaverReturnType;
const pageSaver = inject('pageSaver') as PageSaverReturnType;

function edit() {
  isEditing.value = true;
  editInputValue.value = props.page.title;
}

function handleEditSubmit() {
  isEditing.value = false;
  props.page.title = editInputValue.value;
}
</script>

<template>
  <div class="group flex items-center justify-between group/pageitem">
    <!--Editing input-->
    <InputText
      v-if="isEditing"
      v-model="editInputValue"
      @blur="handleEditSubmit"
      @keyup="(ev) => ev.key === 'Enter'? handleEditSubmit() : false"
      v-focus
      :style="{ color: docSaver.data.value.unsavedData.colors.text }"
    />
    <!--Page Button-->
    <button
      v-if="!isEditing"
      @click="$emit('update:pageChange', page.id)"
      :title="page.title"
      class="dinamic-color-page-link max-w-[160px] font-normal truncate duration-300" 
      :style="{ color: pageSaver.data.value.currentSelectedPage.id === page.id? docSaver.data.value.unsavedData.colors.primary : `${docSaver.data.value.unsavedData.colors.text}70` }"
    >
      {{ page.title }}
    </button>
    <!--Page controls buttons-->
    <div v-if="!isEditing" class="flex items-center gap-0.5">
      <!--Edit page button-->
      <Button
        @click="edit"
        class="opacity-0 pointer-events-none group-hover/pageitem:opacity-100 group-hover/pageitem:pointer-events-auto dinamic-color-page-edit-button !w-[30px] !h-[30px] border-none"
      >
        <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-[17px]"></font-awesome-icon>
      </Button>
      <!--Delete page button-->
      <Button
        @click="$emit('pageDelete', page.id)"
        class="opacity-0 pointer-events-none group-hover/pageitem:opacity-100 group-hover/pageitem:pointer-events-auto hover:!bg-[#f99999]/20 !w-[30px] !h-[30px] border-none"
      >
        <font-awesome-icon icon="fa-solid fa-trash" class="text-[17px] text-[#e07575]"></font-awesome-icon>
      </Button>
    </div>
  </div>
</template>

<style scoped>
  .dinamic-color-page-link:hover {
    color: v-bind('docSaver.data.value.unsavedData.colors.primary + 90') !important;
  }
  
  .dinamic-color-page-edit-button {
    color: v-bind('docSaver.data.value.unsavedData.colors.text + 'c8'') !important;
  }
  
  .dinamic-color-page-edit-button:hover {
    background-color: v-bind('docSaver.data.value.unsavedData.colors.text + 20') !important;
  }
</style>