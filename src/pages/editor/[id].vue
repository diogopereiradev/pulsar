<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import ControlsMenu from '~/app/editor/ControlsMenu.vue';
import ContentArea from '~/app/editor/ContentArea/ContentArea.vue';
import ExportModal from '~/app/editor/ExportModal.vue';
import Toast from 'primevue/toast';
import PageStates from '~/shared/components/PageStates.vue';
import { useDocSave } from '~/shared/compositions/useDocSave';

definePageMeta({
  middleware: ['authentication']
});

const { params } = useRoute();
const docSaver = useDocSave(params.id as string);

provide('docSaver', docSaver);
</script>

<template>
  <Head>
    <Title>{{ `${$t('editor.title')} ${params.id}` }}</Title>
  </Head>
  <PageStates
    :error="{
      status: 404,
      redirectPath: '/documentations'
    }"
    :is-loaded="docSaver.data.value.status.isLoaded"
    :is-error="docSaver.data.value.status.isError"
  >
    <main>
      <ConfirmDialog :pt="{
        root: 'w-[280px] md:w-[400px] lg:w-[600px]',
        header: 'text-primary !bg-secondary !rounded-t-[15px] flex justify-between items-center py-5 px-7',
        content: 'text-primary/80 !bg-secondary py-2.5 px-7',
        footer: 'text-primary !bg-secondary !rounded-b-[15px] flex justify-end p-6'
      }"/>
      <ExportModal />
      <Toast class="z-[9999]" position="bottom-right"/>
      <div class="flex max-2xl:flex-col">
        <ControlsMenu />
        <ContentArea />
      </div>
    </main>
  </PageStates>
</template>