<script setup lang="ts">
import Tailwind from "primevue/passthrough/tailwind";
import AppIcon from '~/shared/components/icons/AppIcon.vue';
import ScrollPanel from 'primevue/scrollpanel';
import { useConfirm } from 'primevue/useconfirm';
import InputText from 'primevue/inputtext';
import TextArea from 'primevue/textarea';
import InputSwitch from 'primevue/inputswitch';
import { usePassThrough } from 'primevue/passthrough';
import { IDocumentation, IDocumentationColorPalette } from '~/@types/declarations/Documentation';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import config from '~/server/config';
import { useEditor } from '~/shared/states/editorState';
import HexColorPicker from '~/shared/components/utils/HexColorPicker.vue';

const { t } = useI18n();
const isOpen = ref(false);
const editor = useEditor();
const confirm = useConfirm();
const docSaver = inject('docSaver') as DocSaverReturnType;
const visibilityIsCopied = ref(false);

// Array to dinamically generate "color pickers" of the menu
type ColorName = keyof IDocumentationColorPalette;
const colors: ColorName[] = [
  'background', 
  'primary', 
  'secondary', 
  'text', 
  'divider',
  'scrollbar',
  'codeBlockText',
  'codeBlockLiteral',
  'codeBlockKeyword',
  'codeBlockSection',
  'codeBlockString',
  'codeBlockVariable'
];

const onColorChange = (type: keyof IDocumentation['colors'], val: string) => {
  docSaver.data.value.unsavedData.colors[type] = val.includes('#')? val : `#${val}`;
}

function copyShareableLink() {
  const host = window.location.host;
  visibilityIsCopied.value = true;
  window.navigator.clipboard.writeText(`${host.match('localhost')? 'http://' : 'https://'}${host}/doc/${docSaver.data.value.unsavedData.id}`);
}

function changeVisibilityConfirm() {
  confirm.require({
    header: `${t('editor.controls-menu-confirm-visibility-dialog-title')} ${docSaver.data.value.unsavedData.isPublic? t('others.private-word') : t('others.public-word')}?`,
    message: t('editor.controls-menu-confirm-visibility-dialog-description'),
    acceptClass: '!w-32 !h-11 !font-normal !bg-primary/60 hover:!bg-primary/80 ml-2.5 !border-none',
    rejectClass: '!w-32 !h-11 !font-normal',
    acceptLabel: t('editor.controls-menu-confirm-visibility-dialog-accept-button-text'),
    rejectLabel: t('editor.controls-menu-confirm-visibility-dialog-reject-button-text'),
    accept: async () => {
      changeDocVisibility();
    }
  });
}

async function changeDocVisibility() {
  docSaver.data.value.unsavedData.isPublic = !docSaver.data.value.unsavedData.isPublic;
}

watch(visibilityIsCopied, val => {
  if(val) {
    setTimeout(() => {
      visibilityIsCopied.value = false;
    }, 3000);
  }
});

onBeforeMount(async () => {
  // Toggle controls menu based on window size
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1180) {
      isOpen.value = true;
    }
  });
  isOpen.value = window.innerWidth >= 1180;
});
</script>

<template>
  <div class="max-2xl:w-full">
    <!--Mobile navbar-->
    <div 
      :class="`${isOpen? 'opacity-0 -mt-16' : ''} 2xl:hidden flex items-center justify-between px-5 w-full h-[60px] bg-secondary duration-300`"
    >
      <AppIcon class="min-w-[40px]" size="35" color="#d3d3d3"/>
      <Button @click="isOpen = true" class="2xl:hidden w-10 !h-[40px] !bg-transparent hover:!bg-transparent !border-0">
        <font-awesome-icon icon="fa-solid fa-bars" class="text-[25px]" />
      </Button>
    </div>
    <!--Menu-->
    <ScrollPanel 
      :class="`
        ${isOpen? 'max-2xl:fixed' : 'opacity-0 pointer-events-none'}
        relative
        max-2xl:fixed
        max-2xl:left-0
        max-2xl:top-0
        min-w-[330px]
        max-w-[330px]
        max-md:max-w-[330px]
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
      <form @submit.prevent="" class="p-8">
        <!--Back to documentations button and mobile close button-->
        <div class="flex items-center justify-between pb-7">
          <NuxtLinkLocale 
            to="/documentations" 
            class="flex items-center gap-3 w-32 h-10 bg-primary hover:bg-primary/80 active:bg-primary/60 duration-300 text-primary rounded-md font-medium pl-5"
          >
            <font-awesome-icon icon="fa-solid fa-arrow-left-long" />
            {{ $t('editor.controls-menu-back-to-docs-button-message') }}
          </NuxtLinkLocale>
          <Button @click="isOpen = false" class="2xl:hidden w-10 !h-[40px] !bg-transparent hover:!bg-transparent !border-0">
            <font-awesome-icon icon="fa-solid fa-close" class="text-[20px]" />
          </Button>
        </div>
        <hr class="w-full h-0.5 bg-divider/60 border-none mb-7" />
        <div class="flex items-center justify-between">
          <AppIcon class="min-w-[40px]" size="40" color="#d3d3d3"/>
          <div class="flex items-center gap-2.5">
            <!--Preview button-->
            <NuxtLinkLocale
              :to="`/preview/${docSaver.data.value.unsavedData.id}`"
              class="flex justify-center items-center w-10 h-10 !bg-[#d8985d] rounded-md" 
              :title="$t('editor.controls-menu-previewmode-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-previewmode-button-aria-label')"
            >
              <font-awesome-icon icon="fa-solid fa-eye" class="text-[#fff]" />
            </NuxtLinkLocale>
            <!--Export doc button-->
            <Button
              type="button"
              @click="editor.exportDocModal.isOpen = true"
              class="w-10 !h-10 !bg-primary" 
              :title="$t('editor.controls-menu-exportdoc-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-exportdoc-button-aria-label')"
            >
              <font-awesome-icon v-if="!editor.exportDocModal.isDownloading" icon="fa-solid fa-download" />
              <font-awesome-icon v-if="editor.exportDocModal.isDownloading" icon="fa-solid fa-circle-notch" class="text-base" spin/>
            </Button>
            <!--Save button-->
            <Button
              @click="docSaver.save"
              class="w-10 !h-10 !bg-primary" 
              :title="$t('editor.controls-menu-save-button-aria-label')" 
              :aria-label="$t('editor.controls-menu-save-button-aria-label')"
              :disabled="docSaver.data.value.status.isSaved"
            >
              <font-awesome-icon v-if="!docSaver.data.value.status.isSaving" icon="fa-solid fa-floppy-disk" class="text-[17px]"/>
              <font-awesome-icon v-if="docSaver.data.value.status.isSaving" icon="fa-solid fa-circle-notch" class="text-base" spin/>
            </Button>
          </div>
        </div>
        <hr class="w-full h-0.5 bg-divider/60 border-none my-7" />
        <!--Controls-->
        <div class="flex flex-col pb-5">
          <!--Change visibility box-->
          <div class="flex flex-col w-full min-h-[100px] bg-[#303553]/40 rounded-[7px] shadow-sm mb-7 px-6 py-4">
            <h2 class="text-[17px] text-primary/80 font-medium">{{ $t('editor.controls-menu-visibility-box-title') }}</h2>
            <p class="text-[15px] text-primary/50 mt-0.5">
              {{ $t('editor.controls-menu-visibility-box-description') }}
            </p>
            <div class="flex items-center justify-between mt-3">
              <h2 class="text-[15px] text-primary/80 font-medium">Status</h2>
              <h2 :class="`text-[15px] duration-300 ${docSaver.data.value.unsavedData.isPublic? 'text-[#4cbf3f]' : 'text-[#4cbf3f]'} font-medium`">
                {{ docSaver.data.value.unsavedData.isPublic? $t('others.public-word') : $t('others.private-word') }}
              </h2>
            </div>
            <Button @click="changeVisibilityConfirm" class="!w-full !h-10 !bg-primary/10 hover:!bg-primary/30 !text-primary/90 mt-4">
              {{ $t('editor.controls-menu-visibility-box-turn-button-text') }}
              {{ docSaver.data.value.unsavedData.isPublic? $t('others.private-word') : $t('others.public-word') }}
            </Button>
            <Button 
              @click="copyShareableLink" 
              class="!w-full !h-10 hover:!bg-primary/30 !text-primary/90 mt-4" v-if="docSaver.data.value.unsavedData.isPublic"
            >
              {{ visibilityIsCopied? $t('editor.controls-menu-visibility-box-share-copied-button-text') : $t('editor.controls-menu-visibility-box-share-button-text') }}
            </Button>
          </div>
          <hr class="w-full h-0.5 bg-divider/60 border-none mb-7" />
          <!--Auto save-->
          <div class="w-full flex justify-between gap-2 mb-10">
            <label class="text-sm text-primary/40 font-medium">{{ $t('editor.controls-menu-autosave-input-label') }}</label>
            <InputSwitch v-model="docSaver.data.value.unsavedData.features.autoSave"/>
          </div>
          <!--Customize-->
          <div class="w-full flex items-center justify-between gap-2 mb-10">
            <label class="text-sm text-primary/40 font-medium">{{ $t('editor.controls-menu-customize-input-label') }}</label>
            <NuxtLinkLocale 
              :to="`/customize/${docSaver.data.value.unsavedData.id}`" 
              class="flex items-center justify-center text-primary/80 w-32 h-10 border-solid border-[1px] border-primary/40 hover:bg-primary hover:text-primary duration-300 rounded-lg"
            >
              {{ $t('editor.controls-menu-customize-input-text') }}
            </NuxtLinkLocale>
          </div>
          <h2 class="text-[18px] text-primary/80 font-medium">{{ $t('editor.controls-menu-basic-infos-title') }}</h2>
          <!--Title input-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <div class="flex items-center justify-between">
              <label class="text-md text-primary/70 font-medium">{{ $t('documentations.new-doc-modal-title-input-label') }}</label>
              <p :class="`text-[15px] ${docSaver.data.value.unsavedData.title.length >= config.DOC_TITLE_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                {{ docSaver.data.value.unsavedData.title.length }}/{{ config.DOC_TITLE_LIMIT }}
              </p>
            </div>
            <InputText
              v-model="docSaver.data.value.unsavedData.title"
              class="rounded-md contrast-200 !h-11 !border-secondary/60"
              :placeholder="$t('documentations.new-doc-modal-title-input-placeholder')"
              :minlength="3"
              :maxlength="config.DOC_TITLE_LIMIT"
              required
            />
          </div>
          <!--Description input-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <div class="flex items-center justify-between">
              <label class="text-md text-primary/70 font-medium">{{ $t('documentations.new-doc-modal-description-input-label') }}</label>
              <p :class="`text-[15px] ${docSaver.data.value.unsavedData.description.length >= config.DOC_DESCRIPTION_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                {{ docSaver.data.value.unsavedData.description.length }}/{{ config.DOC_DESCRIPTION_LIMIT }}
              </p>
            </div>
            <TextArea
              v-model="docSaver.data.value.unsavedData.description"
              class="!border-secondary/60 contrast-200 max-h-[74px]"
              :placeholder="$t('documentations.new-doc-modal-description-input-placeholder')"
              :minlength="10"
              :maxlength="config.DOC_DESCRIPTION_LIMIT"
              required
            />
          </div>
          <!--Indexes table-->
          <div class="w-full flex justify-between gap-2 mt-10">
            <label class="text-sm text-primary/40 font-medium">{{ $t('editor.controls-menu-indexestable-input-label') }}</label>
            <InputSwitch v-model="docSaver.data.value.unsavedData.features.indexesTable"/>
          </div>
          <!--Colors-->
          <div class="w-full flex flex-col gap-2 mt-7">
            <h2 class="text-lg text-primary/70 font-medium">{{ $t('editor.controls-menu-colors-area-title') }}</h2>
            <div class="w-full flex flex-col flex-wrap gap-6 mt-2.5">
              <div
                v-for="color of colors"
                :key="color"
                class="w-full flex flex-col"
              >
                <div class="w-full flex items-center justify-between gap-2">
                  <label class="text-sm text-primary/40 font-medium">{{ color }}</label>
                  <HexColorPicker
                    :model-value="docSaver.data.value.unsavedData.colors[color]"
                    @update:model-value="(val: string) => onColorChange(color, val)"
                  />
                </div>
              </div>
            </div>
          </div>
          <label class="text-lg text-primary/70 font-medium mt-10">{{ $t('editor.controls-menu-texts-area-title') }}</label>
          <!--Navigation title input-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <div class="flex items-center justify-between">
              <label class="text-md text-primary/70 font-medium">{{ $t('editor.controls-menu-texts-navigation-title') }}</label>
              <p :class="`text-[15px] ${docSaver.data.value.unsavedData.messages.navigationTitle.length >= config.DOC_NAVIGATION_TITLE_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                {{ docSaver.data.value.unsavedData.messages.navigationTitle.length }}/{{ config.DOC_NAVIGATION_TITLE_LIMIT }}
              </p>
            </div>
            <InputText
              v-model="docSaver.data.value.unsavedData.messages.navigationTitle"
              class="rounded-md contrast-200 !h-11 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-texts-navigation-title')"
              :minlength="3"
              :maxlength="config.DOC_NAVIGATION_TITLE_LIMIT"
              required
            />
          </div>
          <!--Navigation sub title input-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <div class="flex items-center justify-between">
              <label class="text-md text-primary/70 font-medium">{{ $t('editor.controls-menu-texts-navigation-sub-title') }}</label>
              <p :class="`text-[15px] ${docSaver.data.value.unsavedData.messages.navigationSubTitle.length >= config.DOC_NAVIGATION_SUB_TITLE_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                {{ docSaver.data.value.unsavedData.messages.navigationSubTitle.length }}/{{ config.DOC_NAVIGATION_SUB_TITLE_LIMIT }}
              </p>
            </div>
            <InputText
              v-model="docSaver.data.value.unsavedData.messages.navigationSubTitle"
              class="rounded-md contrast-200 !h-11 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-texts-navigation-sub-title')"
              :minlength="3"
              :maxlength="config.DOC_NAVIGATION_SUB_TITLE_LIMIT"
              required
            />
          </div>
          <!--Indexes Table TItle-->
          <div class="w-full flex flex-col gap-2 mt-5">
            <div class="flex items-center justify-between">
              <label class="text-md text-primary/70 font-medium">{{ $t('editor.controls-menu-texts-indexestable-title') }}</label>
              <p :class="`text-[15px] ${docSaver.data.value.unsavedData.messages.indexesTableTitle.length >= config.DOC_INDEXES_TABLE_TITLE_LIMIT? 'text-[#e46565]' : 'text-primary/70'}`">
                {{ docSaver.data.value.unsavedData.messages.indexesTableTitle.length }}/{{ config.DOC_INDEXES_TABLE_TITLE_LIMIT }}
              </p>
            </div>
            <InputText
              v-model="docSaver.data.value.unsavedData.messages.indexesTableTitle"
              class="rounded-md contrast-200 !h-11 !border-secondary/60"
              :placeholder="$t('editor.controls-menu-navigation-indexestable-title-input-placeholder')"
              :minlength="3"
              :maxlength="config.DOC_INDEXES_TABLE_TITLE_LIMIT"
              required
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