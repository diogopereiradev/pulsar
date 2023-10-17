<script setup lang="ts">
import lodash from 'lodash';
import Tailwind from "primevue/passthrough/tailwind";
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import InputSwitch from 'primevue/inputswitch';
import ScrollPanel from 'primevue/scrollpanel';
import { usePassThrough } from 'primevue/passthrough';
import { useCustomize } from '~/shared/states/customizeState';
import { Status } from "~/@types/status";
import { Documentation } from "~/shared/storage/models/Documentation";
import NewCustomizationModal from './NewCustomizationModal.vue';

const { params } = useRoute();
const docId = Number(params.id) || 0;

const customize = useCustomize();

async function handleSave() {
  if(!customize.value.controlsMenu.isSaved) {
    customize.value.controlsMenu.isSaving = true;
    const result = await Documentation.edit(docId, {
      ...JSON.parse(JSON.stringify(customize.value.doc))
    });

    if(result === Status.OK) {
      customize.value.controlsMenu.isSaved = true;
    }
    customize.value.controlsMenu.isSaving = false;
  }
}

function startAutoSave() {
  setInterval(() => {
    if(!customize.value.controlsMenu.isSaved && !customize.value.controlsMenu.isSaving && customize.value.doc.features.autoSave) {
      handleSave();
    }
  }, 2000);
}

// Check if editor.value.doc or currentSelectedPage has been modified. If the data has been changed, the user can save the data
watch(() => customize.value.doc, async (_, oldDocData) => {
  if(!oldDocData.id) return;
  const docInfos = await Documentation.get(docId);

  if(lodash.isEqual(oldDocData, docInfos)) {
    customize.value.controlsMenu.isSaved = true;
  } else {
    customize.value.controlsMenu.isSaved = false;
  }
}, { deep: true });

onBeforeMount(async () => {
  // Set initial doc data in editor.value.doc
  const docInfos = await Documentation.get(docId);
  docInfos && (customize.value.doc = docInfos);

  // Toggle controls menu based on window size
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1180) {
      customize.value.controlsMenu.isOpen = true;
    }
  });
  customize.value.controlsMenu.isOpen = window.innerWidth >= 1180;

  // Start auto save
  startAutoSave();
});
</script>

<template>
  <div class="max-2xl:w-full">
    <!--Mobile navbar-->
    <div 
      :class="`${customize.controlsMenu.isOpen? 'opacity-0 -mt-16' : ''} 2xl:hidden flex items-center justify-between px-5 w-full h-16 bg-secondary duration-300`"
    >
      <AppIcon class="min-w-[40px]" size="35" color="#d3d3d3"/>
      <Button @click="customize.controlsMenu.isOpen = true" class="2xl:hidden w-[40px] !h-[40px] !bg-transparent hover:!bg-transparent !border-0">
        <font-awesome-icon icon="fa-solid fa-bars" class="text-[25px]" />
      </Button>
    </div>
    <!--Menu-->
    <ScrollPanel 
      :class="`
        ${customize.controlsMenu.isOpen? 'max-2xl:fixed' : 'opacity-0 pointer-events-none'}
        relative
        max-2xl:fixed
        max-2xl:left-0
        max-2xl:top-0
        min-w-[310px]
        max-w-[310px]
        max-md:max-w-[280px]
        max-md:min-w-0
        bg-secondary
        2xl:bg-secondary/70
        h-screen
        z-[201]
        duration-300
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
      <form @submit.prevent="handleSave" class="p-8">
        <!--Back to editor button and mobile close button-->
        <div class="flex items-center justify-between pb-7">
          <NuxtLinkLocale 
            :to="`/editor/${customize.doc.id}`" 
            class="flex items-center gap-3 w-32 h-10 bg-primary hover:bg-primary/80 active:bg-primary/60 duration-300 text-primary rounded-md font-medium pl-5"
            aria-label=""
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            {{ $t('editor.controls-menu-back-to-docs-button-message') }}
          </NuxtLinkLocale>
          <Button @click="customize.controlsMenu.isOpen = false" class="2xl:hidden w-10 !h-10 !bg-transparent hover:!bg-transparent !border-0">
            <font-awesome-icon icon="fa-solid fa-close" class="text-xl" />
          </Button>
        </div>
        <hr class="w-full h-0.5 bg-divider/60 border-none mb-7" />
        <div class="flex items-center justify-between">
          <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
          <div class="flex items-center gap-2.5">
            <!--Preview button-->
            <NuxtLinkLocale
              :to="`/preview/${customize.doc.id}`"
              class="flex justify-center items-center w-10 min-h-[40px] !bg-[#d8985d] rounded-md" 
              :title="$t('editor.controls-menu-previewmode-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-previewmode-button-aria-label')"
            >
              <font-awesome-icon icon="fa-solid fa-eye" class="text-[#fff]" />
            </NuxtLinkLocale>
            <!--Save button-->
            <Button
              type="submit"
              class="w-10 min-h-[40px] !bg-primary" 
              :title="$t('editor.controls-menu-save-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-save-button-aria-label')"
              :disabled="customize.controlsMenu.isSaved"
            >
              <font-awesome-icon v-if="!customize.controlsMenu.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
              <font-awesome-icon v-if="customize.controlsMenu.isSaving" icon="fa-solid fa-circle-notch" class="text-base" spin/>
            </Button>
          </div>
        </div>
        <hr class="w-full h-0.5 bg-divider/60 border-none my-7" />
        <div class="flex flex-col mt-7">
          <!--Customizations title-->
          <div class="flex justify-between items-center">
            <div class="flex gap-3.5 items-center">
              <font-awesome-icon icon="fa-solid fa-microchip" class="text-[26px] text-primary"></font-awesome-icon>
              <h3 class="text-primary/80 text-lg font-medium">{{ $t('customize.controls-menu-customizations-title') }}</h3>
            </div>
            <!--New customization button-->
            <Button
              @click="customize.controlsMenu.newCustomizationModal.isOpen = true"
              :title="$t('customize.controls-menu-new-customization-button-label')"
              class="w-10 !h-10 !bg-primary/80 hover:!bg-primary border-none"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="text-lg text-primary"></font-awesome-icon>
            </Button>
          </div>
          <!--Customizations-->
          <div class="flex flex-col gap-2.5 mt-7" v-if="customize.doc.customizations.length >= 1">
            <Button
              v-for="customization in customize.doc.customizations" 
              class="group !justify-start gap-3.5 w-full !min-h-[43px] !bg-primary/[0.15] hover:!bg-primary/50 border-none !px-5 duration-300"
            >
              <font-awesome-icon icon="fa-solid fa-microchip" class="text-xl text-secondary/90 duration-300 group-hover:text-primary"></font-awesome-icon>
              <p class="text-base text-secondary group-hover:text-primary duration-300">{{ customization.title }}</p>
            </Button>
          </div>
          <!--Empty customizations message-->
          <div class="flex justify-center items-center h-[200px]" v-if="customize.doc.customizations.length < 1">
            <p class="text-center text-base text-primary/40">{{ $t('customize.controls-menu-empty-customizations-message') }}</p>
          </div>
        </div>
      </form>
    </ScrollPanel>
    <!--New customization modal-->
    <NewCustomizationModal />
    <!--Menu mobile backdrop-->
    <div 
      @click="customize.controlsMenu.isOpen = false"
      :class="`2xl:hidden ${!customize.controlsMenu.isOpen && 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen bg-[#00000060] z-[200]`"
    ></div>
  </div>
</template>