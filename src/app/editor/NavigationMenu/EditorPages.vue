<script setup lang="ts">
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { IDocumentationCategory, IDocumentationPage } from '~/@types/declarations/Documentation';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import { PageSaverReturnType } from '~/shared/compositions/usePageSave';
import { generateId } from '~/server/utils/generateId';
import config from '~/server/config';
import InputableButton from './InputableButton.vue';
import PageItem from './PageItem.vue';

type Props = {
  category: IDocumentationCategory
};
defineProps<Props>();

const { t } = useI18n();
const confirm = useConfirm();
const toast = useToast();
const docSaver = inject('docSaver') as DocSaverReturnType;
const pageSaver = inject('pageSaver') as PageSaverReturnType;

const showInfo = (message?: string) => {
  toast.add({
    severity: 'info',
    summary: 'Info',
    detail: message || 'Error on executing this action',
    life: 6000,
    contentStyleClass: '!bg-[#263252] !text-[#bacaf7]'
  });
}

async function handlePageChange(pageId: string) {
  if(pageSaver.data.value.status.isSaving || !pageSaver.data.value.status.isSaved) {
    showInfo(t('editor.info-page-change-on-saving'));
    return;
  }

  const page = docSaver.data.value.unsavedData.pages.find(page => page.id === pageId);
    
  if(page) {
    pageSaver.data.value.currentSelectedPage = page;
  } else {
    console.error('Invalid page id!');
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
        pageSaver.data.value.currentSelectedPage = {
          id: '-1',
          title: '',
          categoryId: 0
        }
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
  <!--Category Pages-->
  <ul class="flex flex-col">
    <li v-for="page in (docSaver.data.value.unsavedData.pages || []).filter(page => page.categoryId === category.id)">
      <PageItem
        :page="page"
        @update:page-change="handlePageChange"
        @page-delete="deletePageConfirmDialog"
      />
    </li>
  </ul>
  <InputableButton
    class="mt-1.5"
    :data="{ categoryId: category.id }"
    :color="docSaver.data.value.unsavedData.colors.text"
    @update:submit="handleNewPage"
  >
    <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
    {{ $t('editor.doc-editor-new-page-button-message') }}
  </InputableButton>
</template>