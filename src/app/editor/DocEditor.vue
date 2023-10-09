<script setup lang="ts">
import TiptapEditor from '~/shared/components/Tiptap/TiptapEditor.vue';
import EditorCategories from './EditorCategories.vue';
import IndexesTable from './IndexesTable.vue';
import { useEditor } from '~/shared/states/editorState';

const editor = useEditor();
const mobileNavigationIsOpen = ref(false);

function handleEditorChange(value: string) {
  const updatedPages = editor.value.doc.pages.map(page => {
    if(page.id === editor.value.currentSelectedPage?.id) {
      page.content = value;
    }
    return page;
  });
  editor.value.doc.pages = updatedPages;
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
    class="w-full min-h-screen 2xl:max-h-screen px-[50px] py-[30px] 2xl:overflow-y-scroll"
    :style="{ backgroundColor: editor.doc.colors.background }"
  >
    <!--Doc navbar-->
    <nav class="2xl:hidden flex items-center w-full pb-[25px]">
      <Button @click="mobileNavigationIsOpen = true" class="border-none !bg-transparent hover:!bg-transparent !p-[6px]">
        <font-awesome-icon 
          icon="fa-solid fa-bars"
          class="text-[30px]"
        ></font-awesome-icon>
      </Button>
    </nav>
    <hr class="2xl:hidden w-full mx-auto h-[2px] border-none" :style="{ backgroundColor: editor.doc.colors.divider }" />
    <!--Doc navbar end-->
    <div class="flex pt-[40px] mt-[10px]">
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
          max-2xl:px-[40px]
          max-2xl:py-[50px]
          max-2xl:overflow-y-scroll
          max-w-[220px] 
          w-full 
          flex 
          flex-col 
          gap-[20px]
          z-[11]
          duration-300
        `"
      >
        <!--Mobile close button-->
        <button @click="mobileNavigationIsOpen = false" class="2xl:hidden absolute right-[30px] top-[30px]">
          <font-awesome-icon icon="fa-solid fa-close" class="text-[20px]" :style="{ color: editor.doc.colors.text }"></font-awesome-icon>
        </button>
        <!--Navigation menu title and icon-->
        <div v-if="editor.doc.navigationTitle" class="max-w-[220px] flex items-center gap-[15px]">
          <div
            class="flex justify-center items-center min-w-[45px] h-[45px] rounded-[10px]"
            :style="{ backgroundColor: editor.doc.colors.primary + '40' }"
          >
            <font-awesome-icon 
              icon="fa-solid fa-map" 
              class="text-[19px]"
              :style="{ color: editor.doc.colors.primary }"
            />
          </div>
          <div class="flex flex-col">
            <p :title="editor.doc.navigationTitle" class="max-w-[150px] text-[17px] truncate" :style="{ color: editor.doc.colors.text + '99' }">
              {{ editor.doc.navigationTitle }}
            </p>
            <p :title="editor.doc.navigationSubTitle" class="max-w-[150px] relative text-[15px] mt-[-4px] truncate" :style="{ color: editor.doc.colors.text + '80' }">
              {{ editor.doc.navigationSubTitle }}
            </p>
          </div>
        </div>
        <hr v-if="editor.doc.navigationTitle" class="w-full mx-auto h-[2px] border-none" :style="{ backgroundColor: editor.doc.colors.divider + '40' }" />
        <EditorCategories />
      </div>
      <!--Mobile Navigation menu backdrop-->
      <div 
        @click="mobileNavigationIsOpen = false" 
        :class="`2xl:hidden ${!mobileNavigationIsOpen && 'opacity-0 pointer-events-none'} fixed left-0 top-0 w-screen h-screen bg-[#00000060] duration-300 z-[10]`"
      ></div>
      <!--Editor-->
      <div class="overflow-hidden w-full 2xl:px-[40px]">
        <TiptapEditor
          v-if="editor.currentSelectedPage?.id != -1"
          @update:model-value="(value) => handleEditorChange(value)"
          :content="editor.currentSelectedPage?.content"
          :colors="editor.doc.colors"
        />
        <div v-else class="w-full h-[300px] flex justify-center items-center">
          <p :style="{ color: editor.doc.colors.text + '50' }">{{ $t('editor.non-page-selected-message') }}</p>
        </div>
      </div>
      <!--Indexes Table-->
      <IndexesTable />
    </div>
  </div>
</template>

<style scoped>
  .mobile-navigationmenu-dinamic-bg {
    background-color: v-bind('editor.doc.colors.secondary');
  }

  @media only screen and (min-width: 1180px) {
    .mobile-navigationmenu-dinamic-bg {
      background-color: transparent;
    }
  }
</style>