<script setup lang="ts">
import { IDocumentationCategory } from '~/@types/declarations/Documentation';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import InputText from 'primevue/inputtext';

type Props = {
  category: IDocumentationCategory
};
const props = defineProps<Props>();
defineEmits(['deleteCategory']);

const isEditing = ref(false);
const editInputValue = ref('');
const docSaver = inject('docSaver') as DocSaverReturnType;

function edit() {
  isEditing.value = true;
  editInputValue.value = props.category.label;
}

function handleEditSubmit() {
  isEditing.value = false;
  props.category.label = editInputValue.value;
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between group/categoryitem">
      <!--Editing input-->
      <InputText
        v-if="isEditing"
        v-model="editInputValue"
        @blur="handleEditSubmit"
        @keyup="(ev) => ev.key === 'Enter'? handleEditSubmit() : false"
        v-focus
        :style="{ color: docSaver.data.value.unsavedData.colors.text }"
      />
      <h2 v-if="!isEditing" class="text-[15px] font-medium" :style="{ color: docSaver.data.value.unsavedData.colors.text }">{{ category.label }}</h2>
      <!--Category controls buttons-->
      <div v-if="!isEditing" class="flex items-center gap-0.5">
        <!--Edit customization button-->
        <Button
          @click="edit"
          class="opacity-0 pointer-events-none group-hover/categoryitem:opacity-100 group-hover/categoryitem:pointer-events-auto dinamic-color-category-edit-button !w-[30px] !h-[30px] border-none"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" class="text-[17px]"></font-awesome-icon>
        </Button>
        <!--Delete category button-->
        <Button
          @click="$emit('deleteCategory', category.id)"
          class="opacity-0 pointer-events-none group-hover/categoryitem:opacity-100 group-hover/categoryitem:pointer-events-auto hover:!bg-[#f99999]/20 !w-[30px] !h-[30px] border-none z-[2]"
        >
          <font-awesome-icon icon="fa-solid fa-trash" class="text-[17px] text-[#e07575]"></font-awesome-icon>
        </Button>
      </div>
    </div>
  </div>
</template>


<style scoped>
  .dinamic-color-category-edit-button {
    color: v-bind('docSaver.data.value.unsavedData.colors.text + 90') !important;
  }
  
  .dinamic-color-category-edit-button:hover {
    background-color: v-bind('docSaver.data.value.unsavedData.colors.text + 20') !important;
  }
</style>