<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog';
import MouseLight from '~/shared/components/MouseLight.vue';
import DocsToolbar from '~/app/documentations/DocsToolbar.vue';
import NewDocsModal from '~/app/documentations/NewDocsModal.vue';
import DocsList from '~/app/documentations/DocsList.vue';
import DocUploadModal from '~/app/documentations/DocUploadModal.vue';
</script>

<template>
  <Head>
    <Title>{{ $t('documentations.title') }}</Title>
  </Head>
  <ConfirmDialog :pt="{
    root: 'w-[280px] md:w-[400px] lg:w-[600px] rounded-[5px]',
    header: 'text-primary !bg-secondary rounded-t-[5px] flex justify-between items-center py-[20px] px-[30px]',
    content: 'text-primary !bg-secondary py-[10px] px-[30px]',
    footer: 'text-primary !bg-secondary rounded-b-[5px] flex justify-end py-[25px] px-[25px]'
  }"/>
  <MouseLight />
  <NewDocsModal />
  <DocUploadModal />
  <div class="mx-auto max-w-[1250px] mt-[30px] 3xl:mt-[60px] px-[20px] md:px-[50px]">
    <DocsToolbar />
    <DocsList />
  </div>
</template>