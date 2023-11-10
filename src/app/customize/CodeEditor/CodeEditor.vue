<script setup lang="ts">
import 'splitpanes/dist/splitpanes.css';
import HtmlEditor from './HtmlEditor.vue';
import CssEditor from './CssEditor.vue';
import JavascriptEditor from './JavascriptEditor.vue';
import { Splitpanes, Pane } from 'splitpanes';
import { useCustomize } from '~/shared/states/customizeState';
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import { ResetCss } from '~/shared/dfb/files/src/assets/ResetCss';

const customize = useCustomize();
const currentMobileTab = ref<'HtmlEditor' | 'CssEditor' | 'JavascriptEditor'>('HtmlEditor');
const mobileEditors = {
  HtmlEditor,
  CssEditor,
  JavascriptEditor
};

function closeCodeEditor() {
  customize.value.codeEditor.isOpen = false;
  customize.value.controlsMenu.isOpen = true;
  customize.value.controlsMenu.customizationInfosMenu.isOpen = false;
}

function openPreview() {
  customize.value.codeEditor.onlyShowResult = true;
  customize.value.controlsMenu.isOpen = false;
}

async function handleSave() {
  /*
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
  */
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
  /*
  if(!currentCustomizationData?.id || currentCustomizationData.id === -1) return;
  const docInfos = await Documentation.get(customize.value.doc.id);

  if(lodash.isEqual(currentCustomizationData, docInfos?.customizations.find(c => c.id === currentCustomizationData.id))) {
    customize.value.controlsMenu.isSaved = true;
  } else {
    customize.value.controlsMenu.isSaved = false;
  }
  */
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

// Check if the device is small and update the key "isMobile"
onMounted(() => {
  window.addEventListener('resize', () => {
    if(window.innerWidth <= 768) {
      customize.value.codeEditor.isMobile = true;
    } else {
      customize.value.codeEditor.isMobile = false;
      customize.value.codeEditor.onlyShowResult = false;
    }
  });
  if(window.innerWidth <= 768) {
    customize.value.codeEditor.isMobile = true;
  }
});
</script>

<template>
  <aside :class="`${customize.codeEditor.isOpen? '' : 'opacity-0 pointer-events-none'} duration-300 fixed left-0 top-0 flex w-screen h-screen z-[305]`">
    <splitpanes
      @resize="resizeStart()"
      @resized="resizeEnd()"
      :vertical="customize.codeEditor.isMobile? false : true"
      :horizontal="customize.codeEditor.isMobile? true : false"
    >
      <pane 
        :size="customize.codeEditor.isMobile? 55 : 25" 
        :max-size="customize.codeEditor.isMobile? 55 : 80"
        :min-size="customize.codeEditor.onlyShowResult? false : 24"
        :class="`max-lg:h-[240px] min-w-[280px] ${customize.codeEditor.onlyShowResult? '!max-h-[110px]' : ''}`"
      >
        <div :class="`relative h-full ${customize.codeEditor.onlyShowResult? '' : 'bg-secondary'}`">
          <!--Customization title and close button-->
          <div :class="`flex justify-between items-center h-24 px-7 ${customize.codeEditor.onlyShowResult? 'hidden' : ''}`">
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
          <!--Desktop Editors-->
          <splitpanes horizontal :class="`${customize.codeEditor.isMobile? '!hidden' : ''} !h-[calc(100%-96px)]`" first-splitter>
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
          <!--Mobile Editors-->
          <div :class="`flex lg:hidden flex-col h-full ${customize.codeEditor.onlyShowResult? 'hidden' : ''}`">
            <div class="flex overflow-x-scroll w-full min-h-[40px] bg-secondary_darken mb-2.5 -mt-1.5">
              <button 
                @click="currentMobileTab = 'HtmlEditor'"
                :class="`h-full px-7 ${currentMobileTab === 'HtmlEditor'? 'bg-primary/60' : ''}`"
              >
                HTML
              </button>
              <button 
                @click="currentMobileTab = 'CssEditor'"
                :class="`h-full px-7 ${currentMobileTab === 'CssEditor'? 'bg-primary/60' : ''}`"
              >
                CSS
              </button>
              <button 
                @click="currentMobileTab = 'JavascriptEditor'"
                :class="`h-full px-7 ${currentMobileTab === 'JavascriptEditor'? 'bg-primary/60' : ''}`"
              >
                JavaScript
              </button>
              <button 
                @click="openPreview()"
                class="h-full px-7"
              >
                Preview
              </button>
            </div>
            <component :is="mobileEditors[currentMobileTab]"></component>
          </div>
          <!--Preview close button-->
          <div :class="`flex flex-col items-center justify-center w-full h-full ${customize.codeEditor.onlyShowResult? '' : 'hidden'}`">
            <button 
              @click="customize.codeEditor.onlyShowResult = false"
              class="w-10 min-h-[40px] !bg-primary rounded-full"
            >
              <font-awesome-icon icon="fa-solid fa-eye"></font-awesome-icon>
            </button>
            <hr class="w-[85%] h-px border-none mt-5 mx-auto" :style="{ backgroundColor: customize.doc.colors.divider + 'a9' }"/>
          </div>
        </div>
      </pane>
      <pane 
        :size="customize.codeEditor.isMobile? 45 : 75" 
        :min-size="customize.codeEditor.isMobile? 20 : 20" 
      >
        <iframe
          id="pulsar-code-preview"
          class="w-full h-full"
          :style="{ backgroundColor: customize.doc.colors.background }"
        ></iframe>
      </pane>
    </splitpanes>
  </aside>
</template>

<style>
  .cm-editor {
    height: v-bind('customize.codeEditor.isMobile? "130px" : "100%"');
  }

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
    background-color: v-bind('customize.codeEditor.isMobile && !customize.codeEditor.onlyShowResult? "#131524" : "transparent"');
  }

  .splitpanes--horizontal > .splitpanes__splitter:before {
    content: '';
    position: absolute;
    left: 0;
    top: v-bind('customize.codeEditor.isMobile? "0px" : "6px"');
    width: 100%;
    height: v-bind('customize.codeEditor.isMobile? "0px" : "50px"');
    z-index: 1;
  }

  .splitpanes--vertical > .splitpanes__splitter {
    position: relative;
    width: 12px;
    height: 100%;
    background-color: #131524;
  }
</style>