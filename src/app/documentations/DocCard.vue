<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import { useToast } from 'primevue/usetoast';
import ContextMenu from 'primevue/contextmenu';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { MenuItem } from 'primevue/menuitem';
import { IDocumentation } from '~/@types/declarations/Documentation';
import { useDocumentations } from "~/shared/states/documentationsState";

const props = defineProps<{ data: IDocumentation }>();
const docs = useDocumentations();
const { t } = useI18n();
const toast = useToast();
const confirm = useConfirm();

const isOpening = ref(false);

const contextMenuRef = ref();
const contextMenuItems = ref<MenuItem[]>([
  {
    label: t('documentations.documentations-list-item-contextmenu-delete-message'),
    class: '[&_span]:!text-[#d4373c] [&_div]:hover:!bg-[#f99999]/10',
    command: deleteConfirmDialog
  }
]);

const showError = (message: string) => {
  toast.add({ 
    severity: 'error', 
    summary: 'Error', 
    detail: message,
    life: 6000
  });
};

function deleteConfirmDialog() {
  confirm.require({
    header: t('documentations.delete-doc-dialog-title'),
    message: t('documentations.delete-doc-dialog-message'),
    acceptClass: '!w-32 !h-11 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 border-0',
    rejectClass: '!w-32 !h-11 !font-normal',
    acceptLabel: t('documentations.delete-doc-dialog-confirm-button-message'),
    rejectLabel: t('documentations.delete-doc-dialog-cancel-button-message'),
    accept: async () => {
      const headers = useRequestHeaders(['cookie']) as HeadersInit;
      const result: { status: number, message?: string } = await $fetch('/api/deleteDoc', {
        method: 'POST',
        headers,
        body: {
          id: props.data.id
        }
      });

      if(result.status === 200) {
        const updatedData = docs.value.data.filter(doc => doc.id !== props.data.id);
        docs.value.data = updatedData;
      } else {
        showError(result.message || 'Error on deleting the documentation!');
      }
    }
  });
}
</script>

<template>
  <div class="relative group grow w-[370px] bg-secondary/80 rounded-lg cursor-pointer">
    <!--Card Frame-->
    <NuxtLinkLocale @click="isOpening = true" :to="`/editor/${data.id}`" class="w-full min-h-[300px]" v-if="!isOpening">
      <div class="relative flex justify-center pt-5 w-full h-[140px] rounded-t-lg overflow-hidden">
        <div class="absolute left-0 top-0 bg-black/60 w-full h-full"></div>
        <DocPrototype
          :colors="data.colors"
          :features="data.features"
        />
      </div>
      <div class="flex flex-col p-8">
        <div class="flex items-center justify-between">
          <h2 :title="data.title" class="max-w-[100px] text-xl text-primary/90 font-medium truncate">{{ data.title }}</h2>
          <p class="relative text-[15px] text-primary/50 font-medium">{{ $d(new Date(data.createdAt), 'long') }}</p>
        </div>
        <p 
          :title="data.description" 
          class="text-base text-primary/60 font-normal mt-5 break-all"
        >
          {{ data.description.length > 120? data.description.slice(0, 120) + '...' : data.description }}
        </p>
      </div>
    </NuxtLinkLocale>
    <!--Is Opening Step-->
    <div class="flex flex-col gap-5 justify-center items-center max-h-[300px] h-[274px]" v-else>
      <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-[50px] text-secondary" spin></font-awesome-icon>
      <h3 class="text-center w-[300px] text-primary/80">{{ $t('documentations.doc-card-loading-message') }}</h3>
    </div>
    <!--Doc ContextMenu-->
    <div class="opacity-0 group-hover:opacity-100 duration-300 absolute right-8 top-8" v-if="!isOpening">
      <Button @click="contextMenuRef.show($event)" class="!w-10 !h-10 !bg-primary text-[23px] rounded-md" aria-haspopup="true">
        <font-awesome-icon icon="fa-solid fa-ellipsis" />
      </Button>
      <ContextMenu ref="contextMenuRef" :model="contextMenuItems" />
    </div>
  </div>
</template>