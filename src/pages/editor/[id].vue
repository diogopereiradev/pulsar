<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import ControlsMenu from '~/app/editor/ControlsMenu.vue';
import DocEditor from '~/app/editor/DocEditor.vue';
import ExportModal from '~/app/editor/ExportModal.vue';
import Toast from 'primevue/toast';
import { useEditor } from '~/shared/states/editorState';
import PageStates from '~/shared/components/PageStates.vue';
import { IDocumentation } from '~/@types/declarations/Documentation';

definePageMeta({
  middleware: ['authentication']
});

const { params } = useRoute();
const pageIsLoaded = ref(false);
const pageIsError = ref(false);
const editor = useEditor();

onBeforeMount(async () => {
  // Reset old editor currentSelectedPage, because if you change documentation without reloading the page the SPA saves the old state
  editor.value.currentSelectedPage = {
    ...JSON.parse(JSON.stringify(editor.value.currentSelectedPage)),
    id: -1
  };

  // Set initial doc data in editor.value.doc
  const result = await $fetch(`/api/getDoc?id=${params.id}`, {
    method: 'GET'
  });
  const typedResult = result as { count: number, limit: number, docs: IDocumentation[] };

  if(typedResult && typedResult.docs.length > 0) {
    editor.value.unsavedDoc = typedResult.docs[0];
    editor.value.docDataSinceLastSave = JSON.parse(JSON.stringify(typedResult.docs[0]));
    pageIsLoaded.value  =true;
  } else {
    pageIsError.value = true;
  }
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
    :is-loaded="pageIsLoaded"
    :is-error="pageIsError"
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
        <DocEditor />
      </div>
    </main>
  </PageStates>
</template>