<script setup lang="ts">
import ControlsMenu from '~/app/editor/ControlsMenu.vue';
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
  <!--Page content-->
  <div class="flex max-2xl:flex-col" v-if="docExists && pageIsLoaded">
    <ControlsMenu />
    <div class="w-full h-screen flex justify-center items-center">
      <p class="text-[18px] text-primary/40 font-[500]">Loading content...</p>
    </div>
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