<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import ControlsMenu from '~/app/editor/ControlsMenu.vue';
import DocEditor from '~/app/editor/DocEditor.vue';
import ExportModal from '~/app/editor/ExportModal.vue';
import DatabaseSync from '~/shared/components/DatabaseSync.vue';
import { useEditor } from '~/shared/states/editorState';
import { Documentation } from '~/database/models/Documentation';
import PageStates from '~/shared/components/PageStates.vue';

definePageMeta({
  middleware: 'authentication'
});

const { params } = useRoute();
const editor = useEditor();

onBeforeMount(async () => {
  // Reset old editor currentSelectedPage, because if you change documentation without reloading the page the SPA saves the old state
  editor.value.currentSelectedPage = {
    ...JSON.parse(JSON.stringify(editor.value.currentSelectedPage)),
    id: -1
  };
});
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
    :success-condition="async () => (await Documentation.get(Number(params.id))? true : false)"
  >
    <main>
      <ConfirmDialog :pt="{
        root: 'w-[280px] md:w-[400px] lg:w-[600px]',
        header: 'text-primary !bg-secondary !rounded-t-[15px] flex justify-between items-center py-5 px-7',
        content: 'text-primary !bg-secondary py-2.5 px-7',
        footer: 'text-primary !bg-secondary !rounded-b-[15px] flex justify-end p-6'
      }"/>
      <ExportModal />
      <div class="flex max-2xl:flex-col">
        <ControlsMenu />
        <DocEditor />
      </div>
      <DatabaseSync :doc-id="editor.doc.id" />
    </main>
  </PageStates>
</template>