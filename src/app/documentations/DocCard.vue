<script setup lang="ts">
import { Documentation, IDocumentation } from '~/shared/storage/models/Documentation';
import { useDocumentations } from '~/shared/states/documentationsState';
import { useConfirm } from "primevue/useconfirm";
import EditDocsModal from './EditDocsModal.vue';
import ContextMenu from 'primevue/contextmenu';
import DocPrototype from './DocPrototype.vue';
import { MenuItem } from 'primevue/menuitem';
import { Status } from '~/@types/status';

const props = defineProps<{ data: IDocumentation }>();
const { t } = useI18n();
const docs = useDocumentations();
const confirm = useConfirm();

const editMenuIsOpen = ref(false);
const contextMenuRef = ref();
const contextMenuItems = ref<MenuItem[]>([
  {
    label: t('documentations.documentations-list-item-contextmenu-edit-message'),
    command: (ev) => {
      openEditDocModal();
    }
  },
  {
    label: t('documentations.documentations-list-item-contextmenu-delete-message'),
    class: '[&_span]:!text-[#d4373c] [&_div]:hover:!bg-[#f99999]/10',
    command: deleteConfirmDialog
  }
]);

function openEditDocModal() {
  editMenuIsOpen.value = true;
}

function closeEditModal() {
  editMenuIsOpen.value = false;
}

function deleteConfirmDialog() {
  confirm.require({
    header: t('documentations.delete-doc-dialog-title'),
    message: t('documentations.delete-doc-dialog-message'),
    acceptClass: 'min-w-[80px] min-h-[40px] !font-[400] !bg-[#c22d37] hover:!bg-[#992028] ml-[10px] border-0',
    rejectClass: '!w-[80px] min-h-[40px] !font-[400]',
    acceptLabel: t('documentations.delete-doc-dialog-confirm-button-message'),
    rejectLabel: t('documentations.delete-doc-dialog-cancel-button-message'),
    accept: async () => {
      const result = await Documentation.delete(props.data.id);

      if(result === Status.OK) {
        // Realtime remove from docs list
        const updatedData = docs.value.data.filter(doc => doc.id !== props.data.id);
        docs.value.data = updatedData;
      } else {
        alert('An error occurred on trying to delete the documentation!');
      }
    }
  });
}
</script>

<template>
  <div class="relative group grow w-[370px] bg-secondary/80 rounded-[7px] cursor-pointer">
    <NuxtLinkLocale :to="`/editor/${data.id}`" class="w-full min-h-[300px]">
      <div class="relative flex justify-center pt-[20px] w-full h-[140px] bg-secondary/20 backdrop-contrast-[1.40] rounded-t-[7px] overflow-hidden">
        <div class="absolute left-0 top-0 bg-black/60 w-full h-full"></div>
        <DocPrototype
          :colors="data.colors"
          :features="data.features"
        />
      </div>
      <div class="flex flex-col p-[30px]">
        <div class="flex items-center justify-between">
          <h2 :title="data.title" class="max-w-[100px] text-[20px] text-primary/90 font-[500] truncate">{{ data.title }}</h2>
          <p class="relative text-[15px] text-primary/50 font-[500]">{{ $d(data.createdAt, 'long') }}</p>
        </div>
        <p 
          :title="data.description" 
          class="text-[16px] text-primary/60 font-[400] mt-[20px] break-all"
        >
          {{ data.description.length > 120? data.description.slice(0, 120) + '...' : data.description }}
        </p>
      </div>
    </NuxtLinkLocale>
    <!--Doc ContextMenu-->
    <div class="opacity-0 group-hover:opacity-100 duration-300 absolute right-[30px] top-[30px]">
      <Button @click="contextMenuRef.show($event)" class="min-w-[40px] min-h-[40px] !bg-primary text-[23px] rounded-[6px]" aria-haspopup="true">
        <font-awesome-icon icon="fa-solid fa-ellipsis" />
      </Button>
      <ContextMenu ref="contextMenuRef" :model="contextMenuItems" />
    </div>
    <EditDocsModal 
      :doc-id="data.id" 
      :is-open="editMenuIsOpen"
      @close-modal="closeEditModal"
    />
  </div>
</template>