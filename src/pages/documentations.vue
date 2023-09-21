<script setup lang="ts">
import MouseLight from '~/shared/components/MouseLight.vue';
import DocsToolbar from '~/app/documentations/DocsToolbar.vue';
import NewDocsModal from '~/app/documentations/NewDocsModal.vue';
import DocsList from '~/app/documentations/DocsList.vue';
</script>

<template>
  <Head>
    <Title>{{ $t('documentations.title') }}</Title>
  </Head>
  <MouseLight />
  <NewDocsModal />
  <div class="mx-auto max-w-[1250px] mt-[30px] 3xl:mt-[60px] px-[20px] md:px-[50px]">
    <DocsToolbar />
    <DocsList />
  </div>
</template>