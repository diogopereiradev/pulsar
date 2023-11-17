<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import { IDocumentationCategory, IDocumentationPage } from '~/@types/declarations/Documentation';
import { DocSaverReturnType } from "~/shared/compositions/useDocSave";
import InputableButton from './InputableButton.vue';
import { generateId } from "~/server/utils/generateId";
import config from '~/server/config';
import { PageSaverReturnType } from "~/shared/compositions/usePageSave";

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

async function handlePageChange(pageId: string) {
  const page = docSaver.data.value.unsavedData.pages.find(page => page.id === pageId);
    
  if(page) {
    pageSaver.data.value.currentSelectedPage = page;
  } else {
    console.error('Invalid page id!');
  }
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

async function handleNewPage(value: string, categoryId: number) {
  if(!value || !categoryId) return;

  if(docSaver.data.value.unsavedData.pages.length < config.DOC_PAGE_LIMIT) {
    const newPage: IDocumentationPage = {
      id: generateId(10),
      categoryId,
      title: value
    };

    const result = await $fetch('/api/docs/createPage', {
      method: 'POST',
      body: {
        id: newPage.id,
        docId: docSaver.data.value.unsavedData.id
      }
    });

    if(result.status === 200) {
      const pagesCopy = JSON.parse(JSON.stringify(docSaver.data.value.unsavedData.pages));
      docSaver.data.value.unsavedData.pages = [...pagesCopy, newPage];
    } else {
      showError('Error on trying to create the new page!');
    }
  } else {
    showError(`The limit of ${config.DOC_PAGE_LIMIT} pages was exceeded!`);
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

function deletePageConfirmDialog(pageId: string) {
  confirm.require({
    header: t('editor.delete-page-dialog-title'),
    message: t('editor.delete-page-dialog-message'),
    acceptClass: '!w-20 !h-10 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 !border-none',
    rejectClass: '!w-20 !h-10 !font-normal',
    acceptLabel: t('editor.delete-page-dialog-confirm-button-message'),
    rejectLabel: t('editor.delete-page-dialog-cancel-button-message'),
    accept: async () => {
      try {
        await $fetch('/api/docs/deletePage', {
          method: 'POST',
          body: {
            type: 'page',
            docId: docSaver.data.value.unsavedData.id,
            id: pageId
          }
        });
      } catch {
        showError('The page file not exists on the system, you can ignore this error, the page was deleted!');
      }

      const pagesProxyClone = JSON.parse(JSON.stringify(docSaver.data.value.unsavedData.pages));
      const pagesUpdated = pagesProxyClone.filter((page: IDocumentationPage) => page.id != pageId);

      docSaver.data.value.unsavedData.pages = pagesUpdated;
      if(pageId === pageSaver.data.value.currentSelectedPage.id) {
        pageSaver.data.value.currentSelectedPage = {
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
    <li v-for="category in docSaver.data.value.unsavedData.categories" :key="category.id" class="group">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <h2 class="text-[15px] font-medium" :style="{ color: docSaver.data.value.unsavedData.colors.text }">{{ category.label }}</h2>
          <Button
            @click="deleteCategoryConfirmDialog(category.id)"
            class="opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto hover:!bg-[#f99999]/20 !w-[30px] !h-[30px] border-none"
          >
            <font-awesome-icon icon="fa-solid fa-trash" class="text-[17px] text-[#e07575]"></font-awesome-icon>
          </Button>
        </div>
        <!--Category Pages-->
        <ul class="flex flex-col">
          <li v-for="page in (docSaver.data.value.unsavedData.pages || []).filter(page => page.categoryId === category.id)">
            <div class="group flex items-center justify-between">
              <!--Page Button-->
              <button
                @click="handlePageChange(page.id)"
                :title="page.title"
                class="dinamic-color-page-link max-w-[160px] font-normal truncate duration-300" 
                :style="{ color: pageSaver.data.value.currentSelectedPage.id === page.id? docSaver.data.value.unsavedData.colors.primary : `${docSaver.data.value.unsavedData.colors.text}70` }"
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
            :data="{ categoryId: category.id }"
            :color="docSaver.data.value.unsavedData.colors.text"
            @update:submit="handleNewPage"
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            {{ $t('editor.doc-editor-new-page-button-message') }}
          </InputableButton>
        </li>
      </ul>
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

<style scoped>
.dinamic-color-page-link:hover {
  color: v-bind('docSaver.data.value.unsavedData.colors.primary + 90') !important;
}
</style>