<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import DatabaseSync from '~/shared/components/DatabaseSync.vue';
import ControlsMenu from '~/app/customize/ControlsMenu.vue';
import PageStates from '~/shared/components/PageStates.vue';
import { useCustomize } from '~/shared/states/customizeState';
import { IDocumentation } from '~/@types/declarations/Documentation';

definePageMeta({
  middleware: ['authentication']
});

const { params } = useRoute();
const pageIsLoaded = ref(false);
const pageIsError = ref(false);
const customize = useCustomize();

onBeforeMount(async () => {
  // Set initial doc data in editor.value.doc
  const result = await $fetch(`/api/getDoc?id=${params.id}`, {
    method: 'GET'
  });
  const typedResult = result as { count: number, limit: number, docs: IDocumentation[] };

  if(typedResult && typedResult.docs.length > 0) {
    customize.value.unsavedDoc = typedResult.docs[0];
    customize.value.docDataSinceLastSave = JSON.parse(JSON.stringify(typedResult.docs[0]));
    pageIsLoaded.value = true;
  } else {
    pageIsError.value = true;
  }
});
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
      :is-loaded="pageIsLoaded"
      :is-error="pageIsError"
    >
      <main class="wrapper">
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
        <DatabaseSync :doc-id="customize.unsavedDoc.id" />
      </main>
    </PageStates>
  </div>
</template>

<style>
  .wrapper {
    background-color: v-bind('customize.unsavedDoc.colors.background');
    height: 100vh;
  }
</style>