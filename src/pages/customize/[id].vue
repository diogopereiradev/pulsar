<script setup lang="ts">
import Error from '~/shared/components/Error.vue';
import Loading from '~/shared/components/Loading.vue';
import DatabaseSync from '~/shared/components/DatabaseSync.vue';
import ControlsMenu from '~/app/customize/ControlsMenu.vue';
import { Documentation } from '~/shared/storage/models/Documentation';
import { useCustomize } from '~/shared/states/customizeState';

definePageMeta({
  layout: 'customize'
});

const { params } = useRoute();
const docId = Number(params.id) || 0;

const customize = useCustomize();
const pageIsLoaded = ref(false);
const docExists = ref(false);

onBeforeMount(async () => {
  const id = Number(params.id) || 0;
  const doc = await Documentation.get(id);

  // Verify if documentation exists in database
  setTimeout(() => {
    if(doc) {
      docExists.value = true;
      customize.value.doc = doc;
    } else {
      docExists.value = false;
    }
    pageIsLoaded.value = true;
  }, 500);
});
</script>

<template>
  <div>
    <Head>
      <Title>{{ $t('customize.title') + ' ' + docId }}</Title>
    </Head>
    <main v-if="pageIsLoaded && docExists">
      <div class="flex">
        <ControlsMenu />
      </div>
    </main>
    <!--Page state component-->
    <Loading v-if="!pageIsLoaded" />
    <DatabaseSync
    :doc-id="customize.doc.id"
      v-if="pageIsLoaded && docExists"
    />
    <Error 
      v-if="!docExists && pageIsLoaded"
      :status="404"
      :message="$t('editor.error-notfound-message')"
      :redirect-button-label="$t('editor.error-notfound-button-label')"
      redirect-path="/documentations"
    />
  </div>
</template>