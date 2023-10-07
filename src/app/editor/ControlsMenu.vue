<script setup lang="ts">
import lodash from 'lodash';
import { Status } from '~/@types/status';
import Tailwind from "primevue/passthrough/tailwind";
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import ScrollPanel from 'primevue/scrollpanel';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import ColorPicker from 'primevue/colorpicker';
import InputSwitch from 'primevue/inputswitch';
import { usePassThrough } from 'primevue/passthrough';
import { Documentation, IDocumentation, IDocumentationColorPalette } from '~/shared/storage/models/Documentation';
import { useEditor } from '~/shared/states/editorState';

const { params } = useRoute();
const docId = Number(params.id) || 0;

const isOpen = ref(false);
const editor = useEditor();

// Array to dinamically generate "color pickers" of the menu
type ColorName = keyof IDocumentationColorPalette;
const colors: ColorName[] = [
  'background', 
  'primary', 
  'secondary', 
  'highlight', 
  'text', 
  'navbarTitle', 
  'divider',
  'codeBlockText',
  'codeBlockLiteral',
  'codeBlockKeyword',
  'codeBlockSection',
  'codeBlockString',
  'codeBlockVariable'
];

const onColorChange = (type: keyof IDocumentation['colors'], val: string) => {
  editor.value.doc.colors[type] = `#${val}`;
}

async function handleSave() {
  if(!editor.value.controlsMenu.isSaved) {
    editor.value.controlsMenu.isSaving = true;
    const result = await Documentation.edit(docId, {
      ...JSON.parse(JSON.stringify(editor.value.doc))
    });

    if(result === Status.OK) {
      editor.value.controlsMenu.isSaved = true;
    }
    editor.value.controlsMenu.isSaving = false;
  }
}

function startAutoSave() {
  setInterval(() => {
    if(!editor.value.controlsMenu.isSaved && !editor.value.controlsMenu.isSaving && editor.value.doc.features.autoSave) {
      handleSave();
    }
  }, 2000);
}

// Check if editor.value.doc or currentSelectedPage has been modified. If the data has been changed, the user can save the data
watch(() => editor.value.doc, async (_, oldDocData) => {
  if(!oldDocData.id) return;
  const docInfos = await Documentation.get(docId);

  if(lodash.isEqual(oldDocData, docInfos)) {
    editor.value.controlsMenu.isSaved = true;
  } else {
    editor.value.controlsMenu.isSaved = false;
  }
}, { deep: true });

onBeforeMount(async () => {
  // Set initial doc data in editor.value.doc
  const docInfos = await Documentation.get(docId);
  docInfos && (editor.value.doc = docInfos);

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
        2xl:bg-secondary/60
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
        <!--Back to documentations button and mobile close button-->
        <div class="flex items-center justify-between pb-[30px]">
          <NuxtLinkLocale 
            to="/documentations" 
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
            <!--Preview button-->
            <NuxtLinkLocale
              :to="`/preview/${editor.doc.id}`"
              class="flex justify-center items-center w-[40px] min-h-[40px] !bg-[#d8985d] rounded-[5px]" 
              :title="$t('editor.controls-menu-previewmode-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-previewmode-button-aria-label')"
            >
              <font-awesome-icon icon="fa-solid fa-eye" class="text-[#fff]" />
            </NuxtLinkLocale>
            <!--Export doc button-->
            <Button 
              type="button"
              class="w-[40px] min-h-[40px] !bg-primary" 
              :title="$t('editor.controls-menu-previewmode-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-previewmode-button-aria-label')"
            >
              <font-awesome-icon icon="fa-solid fa-download" />
            </Button>
            <!--Save button-->
            <Button
              type="submit"
              class="w-[40px] min-h-[40px] !bg-primary" 
              :title="$t('editor.controls-menu-save-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-save-button-aria-label')"
              :disabled="editor.controlsMenu.isSaved"
            >
              <font-awesome-icon v-if="!editor.controlsMenu.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
              <font-awesome-icon v-if="editor.controlsMenu.isSaving" icon="fa-solid fa-circle-notch" class="text-[16px]" spin/>
            </Button>
          </div>
        </div>
        <hr class="w-full h-[2px] bg-divider/60 border-none my-[30px]" />
        <!--Controls-->
        <div class="flex flex-col pt-[5px] pb-[20px]">
          <!--Indexes table-->
          <div class="w-full flex justify-between gap-[8px] mb-[40px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-autosave-input-label') }}</label>
            <InputSwitch v-model="editor.doc.features.autoSave"/>
          </div>
          <h2 class="text-[18px] text-primary/80 font-[500]">{{ $t('editor.controls-menu-basic-infos-title') }}</h2>
          <!--Title input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-title-input-label') }}</label>
            <InputText
              v-model="editor.doc.title"
              class="rounded-[5px] contrast-200 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-title-input-placeholder')"
              required
            />
          </div>
          <!--Description input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-description-input-label') }}</label>
            <TextArea
              v-model="editor.doc.description"
              class="!border-secondary/60 contrast-200 max-h-[150px]"
              :placeholder="$t('editor.controls-menu-description-input-placeholder')"
              required
            />
          </div>
          <!--Indexes table-->
          <div class="w-full flex justify-between gap-[8px] mt-[40px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-indexestable-input-label') }}</label>
            <InputSwitch v-model="editor.doc.features.indexesTable"/>
          </div>
          <!--Colors-->
          <div class="w-full flex flex-col gap-[8px] mt-[30px]">
            <label class="text-lg text-primary/70 font-[500]">{{ $t('editor.controls-menu-colors-area-title') }}</label>
            <div class="w-full flex flex-col flex-wrap gap-[25px] mt-[10px]">
              <div
                v-for="color of colors"
                :key="color"
                class="w-full flex items-center justify-between gap-[8px]"
              >
                <label class="text-sm text-primary/40 font-[500]">{{ color }}</label>
                <ColorPicker 
                  class="w-[80px]"
                  :model-value="editor.doc.colors[color]" 
                  @update:model-value="(val: string) => onColorChange(color, val)" 
                  format="hex" 
                />
              </div>
            </div>
          </div>
          <label class="text-lg text-primary/70 font-[500] mt-[40px]">{{ $t('editor.controls-menu-texts-area-title') }}</label>
          <!--Navigation title input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-texts-navigation-title') }}</label>
            <InputText
              v-model="editor.doc.navigationTitle"
              class="rounded-[5px] contrast-200 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-navigation-title-input-placeholder')"
            />
          </div>
          <!--Navigation sub title input-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-texts-navigation-sub-title') }}</label>
            <InputText
              v-model="editor.doc.navigationSubTitle"
              class="rounded-[5px] contrast-200 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-navigatio-sub-title-input-placeholder')"
              :disabled="editor.doc.navigationTitle? false : true"
            />
          </div>
          <!--Indexes Table TItle-->
          <div class="w-full flex flex-col gap-[8px] mt-[20px]">
            <label class="text-sm text-primary/40 font-[500]">{{ $t('editor.controls-menu-texts-indexestable-title') }}</label>
            <InputText
              v-model="editor.doc.indexesTableTitle"
              class="rounded-[5px] contrast-200 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-navigation-indexestable-title-input-placeholder')"
            />
          </div>
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