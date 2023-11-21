<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import ControlsMenu from '~/app/customize/ControlsMenu.vue';
import Toast from 'primevue/toast';
import PageStates from '~/shared/components/PageStates.vue';
import { useDocSave } from '~/shared/compositions/useDocSave';
import { useCustomizationSave } from '~/shared/compositions/useCustomizationSave';

definePageMeta({
  middleware: ['authentication']
});

const { params } = useRoute();
const docSaver = useDocSave(params.id as string);
const customizationSaver = useCustomizationSave();

provide('docSaver', docSaver);
provide('customizationSaver', customizationSaver);
</script>

<template>
  <div>
    <Head>
      <Title>{{ $t('customize.title') + ' ' + params.id }}</Title>
    </Head>
    <PageStates
      :error="{
        status: 404,
        redirectPath: '/documentations'
      }"
      :is-loaded="docSaver.data.value.status.isLoaded"
      :is-error="docSaver.data.value.status.isError"
    >
      <main class="wrapper">
        <Toast class="z-[9999]" position="bottom-right"/>
        <ConfirmDialog :pt="{
          root: 'w-[280px] md:w-[400px] lg:w-[600px] rounded-md',
          header: 'text-primary !bg-secondary rounded-t-md flex justify-between items-center py-5 px-7',
          content: 'text-primary !bg-secondary py-2.5 px-7',
          footer: 'text-primary !bg-secondary rounded-b-md flex justify-end p-6'
        }"/>
        <div class="flex max-2xl:flex-col w-full">
          <ControlsMenu />
          <div class="w-full max-2xl:h-[400px] flex justify-center items-center">
            <p class="text-primary/50">{{ $t('customize.empty-customization-preview-message') }}</p>
          </div>
        </div>
      </main>
    </PageStates>
  </div>
</template>

<style>
  .wrapper {
    background-color: v-bind('docSaver.data.value.unsavedData.colors.background');
    height: 100vh;
  }
</style>