<script setup lang="ts">
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import DocsToolbar from '~/app/documentations/DocsToolbar.vue';
import NewDocsModal from '~/app/documentations/NewDocsModal.vue';
import DocsList from '~/app/documentations/DocsList.vue';

definePageMeta({
  layout: 'with-navbar',
  middleware: 'authentication'
});
</script>

<template>
  <Head>
    <Title>{{ $t('documentations.title') }}</Title>
  </Head>
  <ConfirmDialog :pt="{
    root: 'w-[280px] md:w-[400px] lg:w-[600px] rounded-[15px]',
    header: 'text-primary !bg-secondary rounded-t-[15px] flex justify-between items-center py-5 px-7',
    content: 'text-primary !bg-secondary py-2.5 px-7',
    footer: 'text-primary !bg-secondary rounded-b-[15px] flex justify-end p-6'
  }"/>
  <NewDocsModal />
  <Toast class="z-[9999]" position="bottom-right"/>
  <div class="mx-auto max-w-[1250px] mt-7 3xl:mt-16 px-5 md:px-12">
    <DocsToolbar />
    <DocsList />
  </div>
</template>