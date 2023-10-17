<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import ControlsMenu from '~/app/editor/ControlsMenu.vue';
import DocEditor from '~/app/editor/DocEditor.vue';
import ExportModal from '~/app/editor/ExportModal.vue';
import DatabaseSync from '~/shared/components/DatabaseSync.vue';
import Error from '~/shared/components/Error.vue';
import Loading from '~/shared/components/Loading.vue';
import { useEditor } from '~/shared/states/editorState';
import { Documentation } from '~/shared/storage/models/Documentation';

definePageMeta({ layout: 'editor' });

const { params } = useRoute();
const editor = useEditor();
const pageIsLoaded = ref(false);
const docExists = ref(false);

onBeforeMount(async () => {
  const id = Number(params.id) || 0;
  const doc = await Documentation.get(id);

  // Reset old editor currentSelectedPage, because if you change documentation without reloading the page the SPA saves the old state
  editor.value.currentSelectedPage = {
    ...JSON.parse(JSON.stringify(editor.value.currentSelectedPage)),
    id: -1
  };

  // Verify if documentation exists in database
  setTimeout(() => {
    if(doc) {
      docExists.value = true;
    } else {
      docExists.value = false;
    }
    pageIsLoaded.value = true;
  }, 500);
});
</script>

<template>
  <Head>
    <Title>{{ `${$t('editor.title')} ${params.id}` }}</Title>
  </Head>
  <ConfirmDialog :pt="{
    root: 'w-[280px] md:w-[400px] lg:w-[600px] rounded-md',
    header: 'text-primary !bg-secondary rounded-t-md flex justify-between items-center py-5 px-7',
    content: 'text-primary !bg-secondary py-2.5 px-7',
    footer: 'text-primary !bg-secondary rounded-b-md flex justify-end p-6'
  }"/>
  <ExportModal />
  <!--Page content-->
  <div class="flex max-2xl:flex-col" v-if="docExists && pageIsLoaded">
    <ControlsMenu />
    <DocEditor />
  </div>
  <!--Page state components-->
  <Loading v-if="!pageIsLoaded" />
  <DatabaseSync
    :doc-id="editor.doc.id"
    v-if="pageIsLoaded && docExists"
  />
  <Error 
    v-if="!docExists && pageIsLoaded" 
    :status="404"
    :message="$t('editor.error-notfound-message')"
    :redirect-button-label="$t('editor.error-notfound-button-label')"
    redirect-path="/documentations"
  />
</template>