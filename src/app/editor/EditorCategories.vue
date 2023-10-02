<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useEditor } from '~/shared/states/editorState';
import { Documentation, IDocumentationCategory, IDocumentationPage, documentationDataEmptyObj } from '~/shared/storage/models/Documentation';
import InputableButton from './InputableButton.vue';
import { Status } from "~/@types/status";

const { t } = useI18n();
const confirm = useConfirm();
const editor = useEditor();

async function handlePageChange(pageId: number) {
  const result = await Documentation.get(editor.value.doc.id);

  if(result) {
    const page = result.pages.find(page => page.id === pageId);
    
    if(page) {
      editor.value.currentSelectedPage = page;
    } else {
      console.error('Invalid page id!');
    }
  } else {
    console.error('An error occurred on getting page data!');
  }
}

async function handleNewCategory(value: string) {
  if(!value) return;

  const newCategory: IDocumentationCategory = {
    id: Math.round(Math.random() * (10000 - 1) + 1),
    label: value
  };
  const categoriesCopy = JSON.parse(JSON.stringify(editor.value.doc.categories));
  
  const result = await Documentation.edit(editor.value.doc.id, {
    categories: [...categoriesCopy, newCategory]
  });

  if(result === Status.OK) {
    setTimeout(() => editor.value.doc.categories = [...categoriesCopy, newCategory], 500);
  } else {
    console.error('An error occurred on creating a new category!');
  }
}

async function handleNewPage(value: string, categoryId: number) {
  if(!value) return;

  const newPage: IDocumentationPage = {
    id: Math.round(Math.random() * (10000 - 1) + 1),
    categoryId,
    title: value,
    children: [],
    content: '',
    createdAt: Date.now(),
    lastUpdateAt: Date.now()
  };
  const pagesCopy = JSON.parse(JSON.stringify(editor.value.doc.pages));
  
  const result = await Documentation.edit(editor.value.doc.id, {
    pages: [...pagesCopy, newPage]
  });
  
  if(result === Status.OK) {
    editor.value.doc.pages = [...pagesCopy, newPage];
  } else {
    console.error('An error occurred on creating a new page!');
  }
}

function deleteCategoryConfirmDialog(categoryId: number) {
  confirm.require({
    header: t('editor.delete-category-dialog-title'),
    message: t('editor.delete-category-dialog-message'),
    acceptClass: 'min-w-[80px] min-h-[40px] !font-[400] !bg-[#c22d37] hover:!bg-[#992028] ml-[10px] border-0',
    rejectClass: '!w-[80px] min-h-[40px] !font-[400]',
    acceptLabel: t('editor.delete-category-dialog-confirm-button-message'),
    rejectLabel: t('editor.delete-category-dialog-cancel-button-message'),
    accept: async () => {
      const categoryPagesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.pages));
      const pagesUpdated = categoryPagesProxyClone.filter((page: IDocumentationPage) => page.categoryId != categoryId);
      const categoriesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.categories));
      const categoriesUpdated = categoriesProxyClone.filter((category: IDocumentationCategory) => category.id != categoryId);
      const result = await Documentation.edit(editor.value.doc.id, {
        categories: categoriesUpdated,
        pages: pagesUpdated
      });

      if(result === Status.OK) {
        editor.value.doc.categories = categoriesUpdated;
        if(categoryId === editor.value.currentSelectedPage.categoryId) {
          editor.value.currentSelectedPage = {
            ...pagesUpdated[0],
            id: -1
          }
        }
      } else {
        alert('An error occurred on trying to delete the category!');
      }
    }
  });
}

function deletePageConfirmDialog(pageId: number) {
  confirm.require({
    header: t('editor.delete-page-dialog-title'),
    message: t('editor.delete-page-dialog-message'),
    acceptClass: 'min-w-[80px] min-h-[40px] !font-[400] !bg-[#c22d37] hover:!bg-[#992028] ml-[10px] border-0',
    rejectClass: '!w-[80px] min-h-[40px] !font-[400]',
    acceptLabel: t('editor.delete-page-dialog-confirm-button-message'),
    rejectLabel: t('editor.delete-page-dialog-cancel-button-message'),
    accept: async () => {
      const pagesProxyClone = JSON.parse(JSON.stringify(editor.value.doc.pages));
      const pagesUpdated = pagesProxyClone.filter((page: IDocumentationCategory) => page.id != pageId);
      const result = await Documentation.edit(editor.value.doc.id, {
        pages: pagesUpdated
      });

      if(result === Status.OK) {
        editor.value.doc.pages = pagesUpdated;
        if(pageId === editor.value.currentSelectedPage.id) {
          editor.value.currentSelectedPage = {
            ...pagesUpdated[0],
            id: -1
          }
        }
      } else {
        alert('An error occurred on trying to delete the category!');
      }
    }
  });
}
</script>

<template>
  <ul class="flex flex-col gap-[10px]">
    <li v-for="category in editor.doc.categories" :key="category.id" class="group">
      <div class="flex flex-col">
        <div class="flex items-center justify-between">
          <h2 class="text-[15px] font-[500]" :style="{ color: editor.doc.colors.text }">{{ category.label }}</h2>
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
              <button
                @click="handlePageChange(page.id)"
                :title="page.title"
                class="max-w-[160px] font-[400] truncate duration-300" 
                :style="{ color: editor.currentSelectedPage.id === page.id? editor.doc.colors.primary : `${editor.doc.colors.text}70` }"
                @mouseenter="($event.currentTarget as HTMLButtonElement).style.color = editor.doc.colors.primary"
                @mouseleave="editor.currentSelectedPage.id != page.id && (($event.currentTarget as HTMLButtonElement).style.color = `${editor.doc.colors.text}70`)"
              >
                {{ page.title }}
              </button>
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
      <ul class="mt-[5px]">
        <li>
          <InputableButton
            :color="editor.doc.colors.text"
            @update:submit="(value) => handleNewPage(value, category.id)"
          >
            <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
            {{ $t('editor.doc-editor-new-page-button-message') }}
          </InputableButton>
        </li>
      </ul>
    </li>
    <li class="mt-[10px]">
      <InputableButton
        :color="editor.doc.colors.text"
        @update:submit="handleNewCategory"
      >
        <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
        {{ $t('editor.doc-editor-new-category-button-message') }}
      </InputableButton>
    </li>
  </ul>
</template>