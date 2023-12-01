<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { IDocumentationCategory, IDocumentationPage } from '~/@types/declarations/Documentation';
import { DocSaverReturnType } from "~/shared/compositions/useDocSave";
import InputableButton from './InputableButton.vue';
import config from '~/server/config';
import { PageSaverReturnType } from "~/shared/compositions/usePageSave";
import EditorPages from "./EditorPages.vue";
import CategoryItem from "./CategoryItem.vue";

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const docSaver = inject('docSaver') as DocSaverReturnType;
const pageSaver = inject('pageSaver') as PageSaverReturnType;

const showError = (message?: string) => {
  toast.add({
    severity: 'error',
    summary: 'Error',
    detail: message || 'Error on executing this action',
    life: 6000
  });
}

function handleNewCategory(value: string) {
  if(!value) return;

  if(docSaver.data.value.unsavedData.categories.length < config.DOC_CATEGORY_LIMIT) {
    const newCategory: IDocumentationCategory = {
      id: Math.round(Math.random() * (10000 - 1) + 1),
      label: value
    };
    const categoriesCopy = JSON.parse(JSON.stringify(docSaver.data.value.unsavedData.categories));
    docSaver.data.value.unsavedData.categories = [...categoriesCopy, newCategory];
  } else {
    showError(`The limit of ${config.DOC_CATEGORY_LIMIT} categories was exceeded!`);
  }
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
      const categoryPagesProxyClone = JSON.parse(JSON.stringify(docSaver.data.value.unsavedData.pages));
      const pagesUpdated = categoryPagesProxyClone.filter((page: IDocumentationPage) => page.categoryId != categoryId);
      const categoriesProxyClone = JSON.parse(JSON.stringify(docSaver.data.value.unsavedData.categories));
      const categoriesUpdated = categoriesProxyClone.filter((category: IDocumentationCategory) => category.id != categoryId);

      docSaver.data.value.unsavedData.pages.filter(page => page.categoryId === categoryId).forEach(async page => {
        try {
          await $fetch('/api/docs/deletePage', {
            method: 'POST',
            body: {
              type: 'page',
              docId: docSaver.data.value.unsavedData.id,
              id: page.id
            }
          });
        } catch {
          showError('The page file not exists on the system, you can ignore this error, the page was deleted!');
        }
      });

      docSaver.data.value.unsavedData.categories = categoriesUpdated;
      docSaver.data.value.unsavedData.pages = pagesUpdated;

      // Clear the currentSelectedPage if the category deleted is the same of the currentSelectedPage
      if(categoryId === pageSaver.data.value.currentSelectedPage.categoryId) {
        pageSaver.data.value.currentSelectedPage = { ...pagesUpdated[0], id: '-1' };
      }
    }
  });
}
</script>

<template>
  <ul class="flex flex-col gap-2.5">
    <li v-for="category in docSaver.data.value.unsavedData.categories" :key="category.id">
      <div class="flex flex-col">
        <CategoryItem 
          :category="category"
          @delete-category="deleteCategoryConfirmDialog"
        />
        <!--Category Pages-->
        <EditorPages
          :category="category"
        />
      </div>
    </li>
    <li class="mt-2.5">
      <InputableButton
        :color="docSaver.data.value.unsavedData.colors.text"
        @update:submit="handleNewCategory"
      >
        <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
        {{ $t('editor.doc-editor-new-category-button-message') }}
      </InputableButton>
    </li>
  </ul>
</template>