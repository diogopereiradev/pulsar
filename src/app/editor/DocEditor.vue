<script setup lang="ts">
import { Editor } from '@tiptap/vue-3';
import TiptapEditor from '~/shared/components/Tiptap/TiptapEditor.vue';
import EditorCategories from './EditorCategories.vue';
import IndexesTable from './IndexesTable.vue';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import { usePageSave } from '~/shared/compositions/usePageSave';

const docSaver = inject('docSaver') as DocSaverReturnType;
const pageSaver = usePageSave();
const mobileNavigationIsOpen = ref(false);

provide('pageSaver', pageSaver);

function parseCodeBlocks(unparsedContent: string, fullViewDom: string) {
  const unparsedDom = new DOMParser().parseFromString(unparsedContent, 'text/html');
  const fullDom = new DOMParser().parseFromString(fullViewDom, 'text/html');

  fullDom.querySelectorAll('.highlighted-codeblock').forEach(codeBlock => {
    const unparsedCodeBlocks = unparsedDom.querySelectorAll('.highlighted-codeblock');

    unparsedCodeBlocks.forEach(unparsedCodeBlock => {
      unparsedCodeBlock.innerHTML = codeBlock.innerHTML;
    });
  });
  return unparsedDom.body.innerHTML;
}

function parseTablesWrapper(unparsedContent: string, fullViewDom: string) {
  const unparsedDom = new DOMParser().parseFromString(unparsedContent, 'text/html');
  const fullDom = new DOMParser().parseFromString(fullViewDom, 'text/html');

  fullDom.querySelectorAll('.tableWrapper').forEach(tablewrapper => {
    const unparsedCodeBlocks = unparsedDom.querySelectorAll('.pulsar-table');

    unparsedCodeBlocks.forEach(unparsedCodeBlock => {
      unparsedCodeBlock.outerHTML = tablewrapper.outerHTML;
    });
  });
  return unparsedDom.body.innerHTML;
}

function handleEditorChange(value: string, textEditorInstance: Editor) {
  // const parsedCodeBlocksDom = parseCodeBlocks(value, textEditorInstance.view.dom.innerHTML);
  // const parsedTablesWrapperDom = parseTablesWrapper(parsedCodeBlocksDom, textEditorInstance.view.dom.innerHTML);
  const content = value;
  pageSaver.data.value.unsavedContent = content;
}

onBeforeMount(() => {
  if(window.innerWidth >= 1180) {
    mobileNavigationIsOpen.value = true;
  };
  window.addEventListener('resize', () => {
    if(window.innerWidth >= 1180) {
      mobileNavigationIsOpen.value = true;
    }
  });
});
</script>

<template>
  <div 
    class="w-full min-h-screen 2xl:max-h-screen px-12 py-7 2xl:overflow-y-scroll"
    :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.background }"
  >
    <!--Doc navbar-->
    <nav class="2xl:hidden flex items-center w-full pb-6">
      <Button @click="mobileNavigationIsOpen = true" class="border-none !bg-transparent hover:!bg-transparent !p-1.5">
        <font-awesome-icon 
          icon="fa-solid fa-bars"
          class="text-3xl"
        ></font-awesome-icon>
      </Button>
    </nav>
    <hr class="2xl:hidden w-full mx-auto h-0.5 border-none" :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.divider }" />
    <!--Doc navbar end-->
    <div class="flex pt-10 mt-2.5">
      <!--Navigation Menu-->
      <div 
        :class="`
          mobile-navigationmenu-dinamic-bg
          ${!mobileNavigationIsOpen && 'opacity-0 pointer-events-none'}
          max-2xl:min-w-[220px]
          max-2xl:max-w-[320px]
          max-2xl:h-screen
          max-2xl:fixed 
          max-2xl:left-0 
          max-2xl:top-0
          max-2xl:px-10
          max-2xl:py-14
          max-2xl:overflow-y-scroll
          max-w-[220px] 
          w-full 
          flex 
          flex-col 
          gap-5
          z-[11]
          duration-300
        `"
      >
        <!--Mobile close button-->
        <button @click="mobileNavigationIsOpen = false" class="2xl:hidden absolute right-8 top-8">
          <font-awesome-icon icon="fa-solid fa-close" class="text-xl" :style="{ color: docSaver.data.value.unsavedData.colors.text }"></font-awesome-icon>
        </button>
        <!--Navigation menu title and icon-->
        <div v-if="docSaver.data.value.unsavedData.messages.navigationTitle" class="max-w-[220px] flex items-center gap-3.5">
          <div
            class="flex justify-center items-center w-12 h-12 rounded-lg"
            :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.primary + '40' }"
          >
            <font-awesome-icon 
              icon="fa-solid fa-map" 
              class="text-[19px]"
              :style="{ color: docSaver.data.value.unsavedData.colors.primary }"
            />
          </div>
          <div class="flex flex-col">
            <p :title="docSaver.data.value.unsavedData.messages.navigationTitle" class="max-w-[150px] text-[17px] truncate" :style="{ color: docSaver.data.value.unsavedData.colors.text + '99' }">
              {{ docSaver.data.value.unsavedData.messages.navigationTitle }}
            </p>
            <p :title="docSaver.data.value.unsavedData.messages.navigationSubTitle" class="max-w-[150px] relative text-[15px] -mt-1 truncate" :style="{ color: docSaver.data.value.unsavedData.colors.text + '80' }">
              {{ docSaver.data.value.unsavedData.messages.navigationSubTitle }}
            </p>
          </div>
        </div>
        <hr v-if="docSaver.data.value.unsavedData.messages.navigationTitle" class="w-full mx-auto h-0.5 border-none" :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.divider + '40' }" />
        <EditorCategories />
      </div>
      <!--Mobile Navigation menu backdrop-->
      <div 
        @click="mobileNavigationIsOpen = false" 
        :class="`2xl:hidden ${!mobileNavigationIsOpen && 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen bg-[#00000060] duration-300 z-[10]`"
      ></div>
      <!--Editor-->
      <div class="flex flex-col overflow-hidden w-full 2xl:px-10">
        <!--Saving or Saved messages-->
        <div class="w-full flex items-center gap-3 justify-end mb-6" v-if="pageSaver.data.value.currentSelectedPage.id !== '-1' && !pageSaver.data.value.isLoadingContent">
          <div class="px-5 py-1.5 rounded-[10px]" :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.secondary + '80' }">
            <div class="flex items-center gap-3" v-if="!pageSaver.data.value.status.isSaved && !pageSaver.data.value.status.isTyping">
              <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-lg text-secondary/70" spin></font-awesome-icon>
              <h2 class="text-base text-primary/70">{{ $t('editor.editor-saving-message') }}</h2>
            </div>
            <div class="flex items-center gap-3" v-else-if="pageSaver.data.value.status.isTyping">
              <font-awesome-icon icon="fa-solid fa-keyboard" class="text-lg text-secondary/70" beat-fade></font-awesome-icon>
              <h2 class="text-base text-primary/70">{{ $t('editor.editor-typing-message') }}</h2>
            </div>
            <div class="flex items-center gap-3" v-else-if="!pageSaver.data.value.status.isTyping">
              <font-awesome-icon icon="fa-solid fa-check" class="text-lg text-secondary/70"></font-awesome-icon>
              <h2 class="text-base text-primary/70">{{ $t('editor.editor-saved-message') }}</h2>
            </div>
          </div>
        </div>
        <TiptapEditor
          v-if="pageSaver.data.value.currentSelectedPage?.id !== '-1' && !pageSaver.data.value.isLoadingContent"
          @update:model-value="handleEditorChange"
          :content="pageSaver.data.value.unsavedContent"
          :colors="docSaver.data.value.unsavedData.colors"
        />
        <div class="flex justify-center items-center w-full h-[76vh]" v-else-if="pageSaver.data.value.isLoadingContent">
          <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-secondary/70 text-[40px]" spin></font-awesome-icon>
        </div>
        <div v-else class="w-full h-[300px] flex justify-center items-center">
          <p :style="{ color: docSaver.data.value.unsavedData.colors.text + '50' }">{{ $t('editor.non-page-selected-message') }}</p>
        </div>
      </div>
      <!--Indexes Table-->
      <IndexesTable />
    </div>
  </div>
</template>

<style scoped>
  .mobile-navigationmenu-dinamic-bg {
    background-color: v-bind('docSaver.data.value.unsavedData.colors.secondary');
  }

  @media only screen and (min-width: 1180px) {
    .mobile-navigationmenu-dinamic-bg {
      background-color: transparent;
    }
  }
</style>