<script setup lang="ts">
import 'splitpanes/dist/splitpanes.css';
import lodash from 'lodash';
import HtmlEditor from './HtmlEditor.vue';
import CssEditor from './CssEditor.vue';
import JavascriptEditor from './JavascriptEditor.vue';
import { Splitpanes, Pane } from 'splitpanes';
import { useCustomize } from '~/shared/states/customizeState';
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import { Documentation } from '~/database/models/Documentation';
import { Status } from '~/@types/status';
import { ResetCss } from '~/shared/dfb/profiles/Vite/files/src/assets/ResetCss';

const customize = useCustomize();

function closeCodeEditor() {
  customize.value.codeEditor.isOpen = false;
  customize.value.controlsMenu.isOpen = true;
  customize.value.controlsMenu.customizationInfosMenu.isOpen = false;
}

async function handleSave() {
  if(!customize.value.controlsMenu.isSaved) {
    const editingCustomization = customize.value.controlsMenu.customizationInfosMenu.data;
    
    if(editingCustomization) {
      customize.value.controlsMenu.isSaving = true;
      const updatedCustomizations = JSON.parse(JSON.stringify(customize.value.doc.customizations.filter(c => c.id != editingCustomization.id && c.id != -1)));
      const result = await Documentation.edit(customize.value.doc.id, {
        customizations: [...updatedCustomizations, JSON.parse(JSON.stringify(editingCustomization))]
      });
  
      if(result === Status.OK) {
        customize.value.controlsMenu.isSaved = true;
      }
      customize.value.controlsMenu.isSaving = false;
    }
  }
}

function startAutoSave() {
  setInterval(() => {
    if(!customize.value.controlsMenu.isSaved && !customize.value.controlsMenu.isSaving && customize.value.doc.features.autoSave) {
      handleSave();
    }
  }, 2000);
}

function resizeStart() {
  const previewFrame = document.querySelector<HTMLIFrameElement>('#pulsar-code-preview');

  if(previewFrame) {
    previewFrame.style.pointerEvents = 'none';
  }
}

function resizeEnd() {
  const previewFrame = document.querySelector<HTMLIFrameElement>('#pulsar-code-preview');
  
  if(previewFrame) {
    previewFrame.style.pointerEvents = 'auto';
  }
}

// Check if data has been modified. If the data has been changed, the user can save the data
watch(() => customize.value.controlsMenu.customizationInfosMenu.data, async (_, currentCustomizationData) => {
  if(!currentCustomizationData?.id || currentCustomizationData.id === -1) return;
  const docInfos = await Documentation.get(customize.value.doc.id);

  if(lodash.isEqual(currentCustomizationData, docInfos?.customizations.find(c => c.id === currentCustomizationData.id))) {
    customize.value.controlsMenu.isSaved = true;
  } else {
    customize.value.controlsMenu.isSaved = false;
  }
}, { deep: true });

// Loads preview data
watch(() => customize.value.controlsMenu.customizationInfosMenu.data.content, (content) => {
  const previewFrame = document.querySelector<HTMLIFrameElement>('#pulsar-code-preview');
  
  previewFrame?.contentDocument?.location.reload();

  setTimeout(() => {
    const style = document.createElement('style');
    const script = document.createElement('script');

    style.innerHTML = ResetCss() + ' ' + content.css ;
    script.innerHTML = content.javascript;

    if(previewFrame && previewFrame.contentDocument) {
      previewFrame.contentDocument.head.innerHTML = style.outerHTML;
      previewFrame.contentDocument.body.innerHTML = content.html;
      previewFrame.contentDocument.body.appendChild(script);
    }
  }, 500);
}, { deep: true });

onBeforeMount(async () => {
  // Start auto save
  startAutoSave();
});
</script>

<template>
  <aside :class="`${customize.codeEditor.isOpen? '' : 'opacity-0 pointer-events-none'} duration-300 fixed left-0 top-0 flex w-screen h-screen z-[305]`">
    <splitpanes
      @resize="resizeStart()"
      @resized="resizeEnd()"
      vertical
    >
      <pane 
        :size="25" 
        :min-size="24" 
        :max-size="80"
      >
        <div class="relative h-full bg-secondary">
          <div class="flex justify-between items-center h-24 px-7">
            <div class="flex items-center gap-3.5">
              <AppIcon class="min-w-[40px]" color="#d3d3d3"/>
              <h2 class="text-xl text-primary font-bold">{{ customize.controlsMenu.customizationInfosMenu.data?.title }}</h2>
            </div>
            <div class="flex items-center gap-4">
              <!--Save button-->
              <Button
                @click="handleSave()"
                class="w-10 min-h-[40px] !bg-primary" 
                :title="$t('editor.controls-menu-save-button-aria-label')" 
                :aria-label="$t('editor.controls-menu-save-button-aria-label')"
                :disabled="customize.controlsMenu.isSaved"
              >
                <font-awesome-icon v-if="!customize.controlsMenu.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
                <font-awesome-icon v-if="customize.controlsMenu.isSaving" icon="fa-solid fa-circle-notch" class="text-base" spin/>
              </Button>
              <button @click="closeCodeEditor()" class="flex items-center justify-center">
                <font-awesome-icon icon="fa-solid fa-close" class="text-xl text-primary"></font-awesome-icon>
              </button>
            </div>
          </div>
          <splitpanes horizontal class="!h-[calc(100%-96px)]" first-splitter>
            <pane class="min-h-[40px]">
              <div class="w-full min-h-[40px] max-h-[53px] bg-secondary_darken/80">
                <div class="w-40 h-full bg-secondary_darken contrast-[0.9] flex gap-2.5 items-center px-5 border-t-4 border-secondary">
                  <font-awesome-icon icon="fa-solid fa-code" class="text-primary text-lg"></font-awesome-icon>
                  <p class="text-base text-primary font-bold">HTML</p>
                </div>
              </div>
              <HtmlEditor class="min-h-0 overflow-y-auto"/>
            </pane>
            <pane class="min-h-[40px]">
              <div class="w-full min-h-[40px] max-h-[53px] bg-secondary_darken/80">
                <div class="w-40 h-full bg-secondary_darken contrast-[0.9] flex gap-2.5 items-center px-5 border-t-4 border-secondary">
                  <font-awesome-icon icon="fa-solid fa-code" class="text-primary text-lg"></font-awesome-icon>
                  <p class="text-base text-primary font-bold">CSS</p>
                </div>
              </div>
              <CssEditor class="min-h-0 overflow-y-auto"/>
            </pane>
            <pane class="min-h-[40px]">
              <div class="w-full min-h-[40px] max-h-[53px] bg-secondary_darken/80">
                <div class="w-40 h-full bg-secondary_darken contrast-[0.9] flex gap-2.5 items-center px-5 border-t-4 border-secondary">
                  <font-awesome-icon icon="fa-solid fa-code" class="text-primary text-lg"></font-awesome-icon>
                  <p class="text-base text-primary font-bold">JavaScript</p>
                </div>
              </div>
              <JavascriptEditor class="min-h-0 overflow-y-auto"/>
            </pane>
          </splitpanes>
        </div>
      </pane>
      <pane 
        :size="75" 
        :min-size="20"
      >
        <iframe
          id="pulsar-code-preview"
          class="w-full h-full ml-1"
          :style="{ backgroundColor: customize.doc.colors.background }"
        ></iframe>
      </pane>
    </splitpanes>
  </aside>
</template>

<style>
  .splitpanes__pane {
    height: 100%;
    display: flex;
    flex-direction: column;
    font-family: Roboto, Arial, sans-serif;
    color: rgba(255, 255, 255, 0.6);
  }

  .splitpanes--horizontal > .splitpanes__splitter {
    position: relative;
    width: 100%;
    height: 5px;
    background-color: transparent;
  }

  .splitpanes--horizontal > .splitpanes__splitter:before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 100%;
    height: 50px;
    z-index: 1;
  }

  .splitpanes--vertical > .splitpanes__splitter {
    position: relative;
    width: 12px;
    height: 100%;
    background-color: #131524;
  }
</style>