<script setup lang="ts">
import { useConfirm } from "primevue/useconfirm";
import ScrollPanel from 'primevue/scrollpanel';
import Tailwind from "primevue/passthrough/tailwind";
import { usePassThrough } from 'primevue/passthrough';
import DocPrototype from '~/shared/components/DocPrototype.vue';
import { useCustomize } from '~/shared/states/customizeState';
import { DocSaverReturnType } from "~/shared/compositions/useDocSave";

const { t } = useI18n();
const confirm = useConfirm();
const customize = useCustomize();
const docSaver = inject('docSaver') as DocSaverReturnType;

function deleteCustomizationConfirmDialog(customizationId: number) {
  confirm.require({
    header: t('customize.delete-customization-dialog-title'),
    message: t('customize.delete-customization-dialog-message'),
    acceptClass: '!w-20 !h-10 !font-normal !bg-[#c22d37] hover:!bg-[#992028] ml-2.5 !border-none',
    rejectClass: '!w-20 !h-10 !font-normal',
    rejectLabel: t('customize.delete-customization-dialog-cancel-button-message'),
    acceptLabel: t('customize.delete-customization-dialog-confirm-button-message'),
    accept: async () => {
      const updatedCustomizations = JSON.parse(JSON.stringify(docSaver.data.value.unsavedData.customizations.filter(c => c.id != customizationId)));
      customize.value.controlsMenu.customizationInfosMenu.isOpen = false;
      docSaver.data.value.unsavedData.customizations = updatedCustomizations;
    }
  });
}

function openCodeEditor() {
  customize.value.codeEditor.isOpen = true;
  customize.value.controlsMenu.isOpen = false;
  customize.value.controlsMenu.customizationInfosMenu.isOpen = false;
}
</script>

<template>
  <ScrollPanel 
    :class="`
      fixed
      top-0
      ${customize.controlsMenu.customizationInfosMenu.isOpen && 
        customize.controlsMenu.customizationInfosMenu.data? 
        'left-0' : 
        '-left-80 opacity-0 pointer-events-none'
      } 
      max-w-[320px]
      w-full
      h-screen 
      bg-secondary 
      duration-300
      z-[300]
    `"
    :pt="
      usePassThrough(Tailwind, { 
        scrollpanel: { 
          barY: '!bg-secondary/30 contrast-200' 
        }
      }, 
      { mergeProps: true, mergeSections: true }
    )"
  >
    <div class="flex flex-col w-full h-80 bg-secondary_darken pt-10 overflow-hidden">
      <div class="flex self-end pr-7 pb-8 gap-2">
        <Button @click="customize.controlsMenu.customizationInfosMenu.isOpen = false" class="!w-[100px] !h-10">
          {{ $t('customize.customization-infos-menu-close-button-label') }}
        </Button>
        <Button @click="openCodeEditor()" class="!w-[100px] !h-10 !bg-primary hover:!bg-primary/70">
          {{ $t('customize.customization-infos-menu-edit-button-label') }}
        </Button>
        <Button 
          @click="deleteCustomizationConfirmDialog(Number(customize.controlsMenu.customizationInfosMenu.data?.id))" 
          class="!w-10 !h-10 !bg-[#f99999]/30 border-none"
        >
          <font-awesome-icon icon="fa-solid fa-trash" class="text-[#f99999] text-xl"></font-awesome-icon>
        </Button>
      </div>
      <div class="flex justify-center items-center">
        <DocPrototype
          class="mt-5"
          :colors="docSaver.data.value.unsavedData.colors"
          :features="docSaver.data.value.unsavedData.features"
          :selected-region="customize.controlsMenu.customizationInfosMenu.data?.region"
        />
      </div>
    </div>
    <div class="flex flex-col gap-3.5 p-7 mb-5">
      <h3 class="text-[15px] text-primary/80 font-medium">
        Id: 
        <span class="flex items-center w-full h-10 bg-secondary_darken text-primary/70 font-normal rounded-lg px-5 mt-2">
          {{ customize.controlsMenu.customizationInfosMenu.data?.id }}
        </span>
      </h3>
      <h3 class="text-[15px] text-primary/80 font-medium">
        {{ $t('customize.customization-infos-menu-title-label') }}: 
        <span class="flex items-center w-full h-10 bg-secondary_darken text-primary/70 font-normal rounded-lg px-5 mt-2">
          {{ customize.controlsMenu.customizationInfosMenu.data?.title }}
        </span>
      </h3>
      <h3 class="flex flex-col text-[15px] text-primary/80 font-medium">
        {{ $t('customize.customization-infos-menu-region-label') }}: 
        <span class="flex items-center w-full h-10 bg-secondary_darken text-primary/70 font-normal rounded-lg px-5 mt-2">
          {{ customize.controlsMenu.customizationInfosMenu.data?.region.split('').map((r, i) => i === 0? r.toUpperCase() : r).join('') }}
        </span>
      </h3>
    </div>
  </ScrollPanel>
</template>