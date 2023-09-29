<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import ControlsMenu from '~/app/editor/ControlsMenu.vue';
import DocEditor from '~/app/editor/DocEditor.vue';
import Error from '~/shared/components/Error.vue';
import Loading from '~/shared/components/Loading.vue';
import { Documentation } from '~/shared/storage/models/Documentation';

definePageMeta({ layout: 'editor' });

const { params } = useRoute();
const pageIsLoaded = ref(false);
const docExists = ref(false);

onBeforeMount(async () => {
  const id = Number(params.id) || 0;
  const doc = await Documentation.get(id);

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
    root: 'w-[280px] md:w-[400px] lg:w-[600px] rounded-[5px]',
    header: 'text-primary !bg-secondary rounded-t-[5px] flex justify-between items-center py-[20px] px-[30px]',
    content: 'text-primary !bg-secondary py-[10px] px-[30px]',
    footer: 'text-primary !bg-secondary rounded-b-[5px] flex justify-end py-[25px] px-[25px]'
  }"/>
  <!--Page content-->
  <div class="flex max-2xl:flex-col" v-if="docExists && pageIsLoaded">
    <ControlsMenu />
    <DocEditor />
  </div>
  <!--Loading and Error components-->
  <Loading v-if="!pageIsLoaded" />
  <Error 
    v-if="!docExists && pageIsLoaded" 
    :status="404"
    :message="$t('editor.error-notfound-message')"
    :redirect-button-label="$t('editor.error-notfound-button-label')"
    redirect-path="/documentations"
  />
</template>