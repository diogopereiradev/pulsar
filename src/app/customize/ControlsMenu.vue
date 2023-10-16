<script setup lang="ts">
import Tailwind from "primevue/passthrough/tailwind";
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import InputableButton from "./InputableButton.vue";
import ScrollPanel from 'primevue/scrollpanel';
import { usePassThrough } from 'primevue/passthrough';
import { useCustomize } from '~/shared/states/customizeState';
import { Status } from "~/@types/status";
import { Documentation } from "~/shared/storage/models/Documentation";

const { params } = useRoute();
const docId = Number(params.id) || 0;

const customize = useCustomize();
const isOpen = ref(false);

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

onBeforeMount(async () => {
  // Set initial doc data in editor.value.doc
  const docInfos = await Documentation.get(docId);
  docInfos && (customize.value.doc = docInfos);

  // Toggle controls menu based on window size
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1180) {
      isOpen.value = true;
    }
  });
  isOpen.value = window.innerWidth >= 1180;

  // Start auto save
  startAutoSave();
});
</script>

<template>
  <div class="max-2xl:w-full">
    <!--Mobile navbar-->
    <div 
      :class="`${isOpen? 'opacity-0 mt-[-65px]' : ''} 2xl:hidden flex items-center justify-between px-[20px] w-full h-[60px] bg-secondary duration-300`"
    >
      <AppIcon class="min-w-[40px]" size="35" color="#d3d3d3"/>
      <Button @click="isOpen = true" class="2xl:hidden w-[40px] !h-[40px] !bg-transparent hover:!bg-transparent !border-0">
        <font-awesome-icon icon="fa-solid fa-bars" class="text-[25px]" />
      </Button>
    </div>
    <!--Menu-->
    <ScrollPanel 
      :class="`
        ${isOpen? 'max-2xl:fixed' : 'opacity-0 ml-[-500px]'}
        relative
        max-2xl:fixed
        max-2xl:left-0
        max-2xl:top-0
        min-w-[310px]
        max-w-[310px]
        max-md:max-w-[280px]
        max-md:min-w-[0px]
        bg-secondary
        2xl:bg-secondary/70
        h-screen
        z-[201]
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
      <form @submit.prevent="handleSave" class="p-[30px]">
        <!--Back to editor button and mobile close button-->
        <div class="flex items-center justify-between pb-[30px]">
          <NuxtLinkLocale 
            :to="`/editor/${customize.doc.id}`" 
            class="flex items-center gap-[13px] w-[130px] min-h-[40px] bg-primary hover:bg-primary/80 active:bg-primary/60 duration-300 text-primary rounded-[5px] font-[500] pl-[20px]"
            aria-label=""
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            {{ $t('editor.controls-menu-back-to-docs-button-message') }}
          </NuxtLinkLocale>
          <Button @click="isOpen = false" class="2xl:hidden w-[40px] !h-[40px] !bg-transparent hover:!bg-transparent !border-0">
            <font-awesome-icon icon="fa-solid fa-close" class="text-[20px]" />
          </Button>
        </div>
        <hr class="w-full h-[2px] bg-divider/60 border-none mb-[30px]" />
        <div class="flex items-center justify-between">
          <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
          <div class="flex items-center gap-[10px]">
            <!--Save button-->
            <Button
              type="submit"
              class="w-[40px] min-h-[40px] !bg-primary" 
              :title="$t('editor.controls-menu-save-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-save-button-aria-label')"
              :disabled="customize.controlsMenu.isSaved"
            >
              <font-awesome-icon v-if="!customize.controlsMenu.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
              <font-awesome-icon v-if="customize.controlsMenu.isSaving" icon="fa-solid fa-circle-notch" class="text-[16px]" spin/>
            </Button>
          </div>
        </div>
        <hr class="w-full h-[2px] bg-divider/60 border-none my-[30px]" />
        <div class="flex flex-col">
          <h3 class="text-primary/80 text-[18px] font-[500]">{{ $t('customize.controls-menu-customizations-title') }}</h3>
          <!--Customizations-->
          <div class="mt-[15px]" v-if="false">
            <Button class="group !justify-start gap-[15px] w-full !h-[43px] !bg-primary/20 hover:!bg-primary/50 border-none !px-[20px] duration-300">
              <font-awesome-icon icon="fa-solid fa-cube" class="text-[20px] text-secondary/90 duration-300 group-hover:text-primary"></font-awesome-icon>
              <p class="text-[16px] text-secondary group-hover:text-primary duration-300">Navbar</p>
            </Button>
          </div>
          <!--Empty customizations message-->
          <div class="flex justify-center items-center h-[100px]">
            <p class="text-center text-[16px] text-primary/40">{{ $t('customize.controls-menu-empty-customizations-message') }}</p>
          </div>
          <InputableButton
            class="mt-[15px]"
            button-class="!px-[17px] !py-[6px] !text-primary/70 !text-[16px]"
            loading-icon-class="!text-secondary/80"
            input-text-class="!text-primary/70"
          >
            <font-awesome-icon icon="fa-solid fa-plus" class="text-[18px]"></font-awesome-icon>
            {{ $t('customize.controls-menu-new-customization-button-label') }}
          </InputableButton>
        </div>
      </form>
    </ScrollPanel>
    <!--Menu mobile backdrop-->
    <div 
      @click="isOpen = false"
      :class="`2xl:hidden ${!isOpen && 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen bg-[#00000060] z-[200]`"
    ></div>
  </div>
</template>