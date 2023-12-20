<script setup lang="ts">
import MobileNavbar from './components/MobileNavbar.vue';
import NavigationMenuTitle from './components/NavigationMenuTitle.vue';
import NavigationMenu from './components/NavigationMenu/NavigationMenu.vue';
import SaveStatusElement from './components/SaveStatusElement.vue';
import IndexesTable from './components/IndexesTable.vue';
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import { usePageSave } from '~/shared/compositions/usePageSave';
import PulsarEditor from '~/shared/components/PulsarEditor/PulsarEditor.vue';

const docSaver = inject('docSaver') as DocSaverReturnType;
const pageSaver = usePageSave();
const mobileNavigationIsOpen = ref(false);

provide('pageSaver', pageSaver);

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
    class="w-full h-screen px-12 py-7 2xl:overflow-y-scroll"
    :style="{ backgroundColor: docSaver.data.value.unsavedData.colors.background }"
  >
    <MobileNavbar @open="mobileNavigationIsOpen = true" />
    <div class="flex pt-10">
      <!--Navigation Menu-->
      <div :class="`
        mobile-navigationmenu-dinamic-bg
        ${!mobileNavigationIsOpen && 'opacity-0 pointer-events-none'}
        max-2xl:min-w-[220px]
        max-2xl:max-w-[320px]
        max-2xl:h-screen
        w-full
        max-w-[220px]
        max-2xl:fixed
        flex
        flex-col
        z-[11]
        duration-300
        max-2xl:overflow-y-scroll
        max-2xl:px-10
        max-2xl:py-14
      `">
        <!--NavigationMenu mobile close button-->
        <button @click="mobileNavigationIsOpen = false" class="2xl:hidden absolute right-8 top-8">
          <font-awesome-icon icon="fa-solid fa-close" class="text-xl" :style="{ color: docSaver.data.value.unsavedData.colors.text }"></font-awesome-icon>
        </button>
        <NavigationMenuTitle />
        <NavigationMenu />
      </div>
      <!--Markdown Editor-->
      <div class="w-full flex flex-col break-words overflow-hidden 2xl:px-6 pt-1.5">
        <SaveStatusElement />
        <!--Editor-->
        <PulsarEditor
          v-if="!pageSaver.data.value.isLoadingContent && pageSaver.data.value.currentSelectedPage.id !== '-1'"
          :theme="{
            text: toRef(docSaver.data.value.unsavedData.colors, 'text'),
            primary: toRef(docSaver.data.value.unsavedData.colors, 'primary'),
            secondary: toRef(docSaver.data.value.unsavedData.colors, 'secondary'),
          }"
        />
        <!--Editor page loading-->
        <div class="flex justify-center items-center w-full h-[76vh]" v-if="pageSaver.data.value.isLoadingContent">
          <font-awesome-icon icon="fa-solid fa-circle-notch" class="text-secondary/70 text-[40px]" spin></font-awesome-icon>
        </div>
        <!--Editor no page selected-->
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