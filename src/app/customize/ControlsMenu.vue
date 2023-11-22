<script setup lang="ts">
import Tailwind from "primevue/passthrough/tailwind";
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import ScrollPanel from 'primevue/scrollpanel';
import { usePassThrough } from 'primevue/passthrough';
import { useCustomize } from '~/shared/states/customizeState';
import { IDocumentationCustomization } from "~/@types/declarations/Documentation";
import NewCustomizationModal from './NewCustomizationModal.vue';
import CustomizationInfosMenu from './CustomizationInfosMenu.vue';
import CodeEditor from './CodeEditor/CodeEditor.vue';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import { CustomizationSaverReturnType } from "~/shared/compositions/useCustomizationSave";

const customize = useCustomize();
const docSaver = inject('docSaver') as DocSaverReturnType;
const customizationSaver = inject('customizationSaver') as CustomizationSaverReturnType;

function openCustomizationInfosMenu(customization: IDocumentationCustomization) {
  customize.value.controlsMenu.customizationInfosMenu.data = customization;
  customizationSaver.data.value.currentSelectedCustomization = customization;
  setTimeout(() => {
    customize.value.controlsMenu.customizationInfosMenu.isOpen = true;
  }, 50);
}

onBeforeMount(async () => {
  // Toggle controls menu based on window size
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1180) {
      customize.value.controlsMenu.isOpen = true;
    }
  });
  customize.value.controlsMenu.isOpen = window.innerWidth >= 1180;
});
</script>

<template>
  <div class="max-2xl:w-full">
    <!--Mobile navbar-->
    <nav 
      :class="`${customize.controlsMenu.isOpen || customize.codeEditor.isOpen? 'opacity-0 -mt-16' : ''} 2xl:hidden flex items-center justify-between px-5 w-full h-16 bg-secondary duration-300`"
    >
      <AppIcon class="min-w-[40px]" size="35" color="#d3d3d3"/>
      <Button 
        @click="customize.controlsMenu.isOpen = true"
        :aria-label="$t('customize.controls-menu-open-button-aria-label')"
        class="2xl:hidden w-[40px] !h-[40px] !bg-transparent hover:!bg-transparent !border-0"
      >
        <font-awesome-icon icon="fa-solid fa-bars" class="text-[25px]" />
      </Button>
    </nav>
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
      <form @submit.prevent="docSaver.save" class="p-8">
        <!--Back to editor button and mobile close button-->
        <div class="flex items-center justify-between pb-7">
          <NuxtLinkLocale 
            :to="`/editor/${docSaver.data.value.unsavedData.id}`"
            :aria-label="$t('customize.controls-menu-back-to-editor-button-message')"
            class="flex items-center gap-3 w-32 h-10 bg-primary hover:bg-primary/80 active:bg-primary/60 duration-300 text-primary rounded-md font-medium pl-5"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            {{ $t('customize.controls-menu-back-to-editor-button-message') }}
          </NuxtLinkLocale>
          <Button 
            @click="customize.controlsMenu.isOpen = false" 
            class="2xl:hidden w-10 !h-10 !bg-transparent hover:!bg-transparent !border-0"
          >
            <font-awesome-icon icon="fa-solid fa-close" class="text-xl" />
          </Button>
        </div>
        <hr class="w-full h-0.5 bg-divider/60 border-none mb-7" />
        <div class="flex items-center justify-between">
          <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
          <div class="flex items-center gap-2.5">
            <!--Preview button-->
            <NuxtLinkLocale
              :to="`/preview/${docSaver.data.value.unsavedData.id}`"
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
              :disabled="docSaver.data.value.status.isSaved"
            >
              <font-awesome-icon v-if="!docSaver.data.value.status.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
              <font-awesome-icon v-if="docSaver.data.value.status.isSaving" icon="fa-solid fa-circle-notch" class="text-base" spin/>
            </Button>
            <!--New customization button-->
            <Button
              @click="customize.controlsMenu.newCustomizationModal.isOpen = true"
              :title="$t('customize.controls-menu-new-customization-button-label')"
              class="w-10 !h-10 !bg-primary/80 hover:!bg-primary border-none"
            >
              <font-awesome-icon icon="fa-solid fa-plus" class="text-lg text-primary"></font-awesome-icon>
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
          </div>
          <!--Customizations-->
          <div class="flex flex-col gap-2.5 mt-7" v-if="docSaver.data.value.unsavedData.customizations.length >= 1">
            <Button
              v-for="customization in docSaver.data.value.unsavedData.customizations"
              @click="openCustomizationInfosMenu(customization)"
              class="group !justify-start gap-3.5 w-full !min-h-[43px] !bg-primary/[0.15] hover:!bg-primary/50 border-none !px-5 duration-300"
            >
              <font-awesome-icon icon="fa-solid fa-microchip" class="text-xl text-secondary/90 duration-300 group-hover:text-primary"></font-awesome-icon>
              <p class="text-base text-secondary group-hover:text-primary duration-300">{{ customization.title }}</p>
            </Button>
          </div>
          <!--Empty customizations message-->
          <div class="flex justify-center items-center h-[200px]" v-if="docSaver.data.value.unsavedData.customizations.length < 1">
            <p class="text-center text-base text-primary/40">{{ $t('customize.controls-menu-empty-customizations-message') }}</p>
          </div>
        </div>
      </form>
    </ScrollPanel>
    <!--Code editor menu-->
    <CodeEditor />
    <!--Customization infos menu-->
    <CustomizationInfosMenu />
    <!--New customization modal-->
    <NewCustomizationModal />
    <!--Menu mobile backdrop-->
    <div 
      @click="customize.controlsMenu.isOpen = false"
      :class="`2xl:hidden ${!customize.controlsMenu.isOpen && 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen bg-[#00000060] z-[200]`"
    ></div>
  </div>
</template>