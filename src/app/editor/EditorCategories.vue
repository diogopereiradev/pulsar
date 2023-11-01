<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useEditor } from '~/shared/states/editorState';
import { IDocumentationCategory, IDocumentationPage } from '~/database/models/Documentation';
import InputableButton from './InputableButton.vue';

const { t } = useI18n();
const confirm = useConfirm();
const editor = useEditor();

async function handlePageChange(pageId: number) {
  const page = editor.value.doc.pages.find(page => page.id === pageId);
    
  if(page) {
    editor.value.currentSelectedPage = page;
  } else {
    console.error('Invalid page id!');
  }
}

async function handleNewCategory(value: string) {
  if(!value) return;

  const newCategory: IDocumentationCategory = {
    id: Math.round(Math.random() * (10000 - 1) + 1),
    label: value
  };
  const categoriesCopy = JSON.parse(JSON.stringify(editor.value.doc.categories));
  editor.value.doc.categories = [...categoriesCopy, newCategory];
}

async function handleNewPage(value: string, categoryId: number) {
  if(!value) return;

  const newPage: IDocumentationPage = {
    id: Math.round(Math.random() * (10000 - 1) + 1),
    categoryId,
    title: value,
    content: '',
    createdAt: Date.now()
  };
  const pagesCopy = JSON.parse(JSON.stringify(editor.value.doc.pages));
  editor.value.doc.pages = [...pagesCopy, newPage];
}

function deleteCategoryConfirmDialog(categoryId: number) {
  confirm.require({
    header: t('editor.delete-category-dialog-title'),
    message: t('editor.delete-category-dialog-message'),
    acceptClass: '!w-20 !h-10 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 !border-none',
    rejectClass: '!w-20 !h-10 !font-normal',
    acceptLabel: t('editor.delete-category-dialog-confirm-button-message'),
    rejectLabel: t('editor.delete-category-dialog-cancel-button-message'),
    accept: async () => {
      const categoryPagesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.pages));
      const pagesUpdated = categoryPagesProxyClone.filter((page: IDocumentationPage) => page.categoryId != categoryId);
      const categoriesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.categories));
      const categoriesUpdated = categoriesProxyClone.filter((category: IDocumentationCategory) => category.id != categoryId);

      editor.value.doc.categories = categoriesUpdated;
      editor.value.doc.pages = pagesUpdated;

      // Clear the currentSelectedPage if the category deleted is the same of the currentSelectedPage
      if(categoryId === editor.value.currentSelectedPage?.categoryId) {
        editor.value.currentSelectedPage = { ...pagesUpdated[0], id: -1 };
      }
    }
  });
}

function deletePageConfirmDialog(pageId: number) {
  confirm.require({
    header: t('editor.delete-page-dialog-title'),
    message: t('editor.delete-page-dialog-message'),
    acceptClass: '!w-20 !h-10 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 !border-none',
    rejectClass: '!w-20 !h-10 !font-normal',
    acceptLabel: t('editor.delete-page-dialog-confirm-button-message'),
    rejectLabel: t('editor.delete-page-dialog-cancel-button-message'),
    accept: async () => {
      const pagesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.pages));
      const pagesUpdated = pagesProxyClone.filter((page: IDocumentationCategory) => page.id != pageId);

      editor.value.doc.pages = pagesUpdated;
      if(pageId === editor.value.currentSelectedPage?.id) {
        editor.value.currentSelectedPage = {
          ...pagesUpdated[0],
          id: -1
        }
      }
    }
  });
}
</script>

<template>
  <ul class="flex flex-col gap-2.5">
    <li v-for="category in editor.doc.categories" :key="category.id" class="group">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <h2 class="text-[15px] font-medium" :style="{ color: editor.doc.colors.text }">{{ category.label }}</h2>
          <Button
            @click="deleteCategoryConfirmDialog(category.id)"
            class="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:!bg-[#f99999]/20 !w-[30px] !h-[30px] border-none"
          >
            <font-awesome-icon icon="fa-solid fa-trash" class="text-[17px] text-[#e07575]"></font-awesome-icon>
          </Button>
        </div>
        <!--Category Pages-->
        <ul class="flex flex-col">
          <li v-for="page in editor.doc.pages.filter(page => page.categoryId === category.id)">
            <div class="group flex items-center justify-between">
              <!--Page Button-->
              <button
                @click="handlePageChange(page.id)"
                :title="page.title"
                class="dinamic-color-page-link max-w-[160px] font-normal truncate duration-300" 
                :style="{ color: editor.currentSelectedPage?.id === page.id? editor.doc.colors.primary : `${editor.doc.colors.text}70` }"
              >
                {{ page.title }}
              </button>
              <!--Delete page button-->
              <Button
                @click="deletePageConfirmDialog(page.id)"
                class="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:!bg-[#f99999]/20 !w-[30px] !h-[30px] border-none"
              >
                <font-awesome-icon icon="fa-solid fa-trash" class="text-[17px] text-[#e07575]"></font-awesome-icon>
              </Button>
            </div>
          </li>
        </ul>
      </div>
      <ul class="mt-1.5">
        <li>
          <InputableButton
            :color="editor.doc.colors.text"
            @update:submit="handleNewPage($event, category.id)"
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            {{ $t('editor.doc-editor-new-page-button-message') }}
          </InputableButton>
        </li>
      </ul>
    </li>
    <li class="mt-2.5">
      <InputableButton
        :color="editor.doc.colors.text"
        @update:submit="handleNewCategory($event)"
      >
        <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
        {{ $t('editor.doc-editor-new-category-button-message') }}
      </InputableButton>
    </li>
  </ul>
</template>

<style scoped>
.dinamic-color-page-link:hover {
  color: v-bind('editor.doc.colors.primary + 90') !important;
}
</style>