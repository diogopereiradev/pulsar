<script setup lang="ts">
import MouseLight from '~/shared/components/MouseLight.vue';
import DocsToolbar from '~/app/documentations/DocsToolbar.vue';
import NewDocsModal from '~/app/documentations/NewDocsModal.vue';
</script>

<template>
  <Head>
    <Title>{{ $t('documentations.title') }}</Title>
  </Head>
  <MouseLight />
  <NewDocsModal />
  <div class="mx-auto max-w-[1250px] mt-[50px] px-[20px] md:px-[50px]">
    <DocsToolbar />
  </div>
</template>