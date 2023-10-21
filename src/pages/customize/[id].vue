<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import DatabaseSync from '~/shared/components/DatabaseSync.vue';
import ControlsMenu from '~/app/customize/ControlsMenu.vue';
import PageStates from '~/shared/components/PageStates.vue';
import { Documentation } from '~/database/models/Documentation';
import { useCustomize } from '~/shared/states/customizeState';

definePageMeta({
  layout: 'customize'
});

const { params } = useRoute();
const customize = useCustomize();
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
      :success-condition="async () => (await Documentation.get(Number(params.id))? true : false)"
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
        <DatabaseSync :doc-id="customize.doc.id" />
      </main>
    </PageStates>
  </div>
</template>

<style>
  .wrapper {
    background-color: v-bind('customize.doc.colors.background');
    height: 100vh;
  }
</style>