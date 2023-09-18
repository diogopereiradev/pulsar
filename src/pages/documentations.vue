<script setup lang="ts">
import MouseLight from '~/shared/components/MouseLight.vue';
import DocumentationsToolbar from '~/app/documentations/DocumentationsToolbar.vue';
</script>

<template>
  <Head>
    <Title>{{ $t('documentations.title') }}</Title>
  </Head>
  <MouseLight />
  <div class="mx-auto max-w-[1250px] mt-[50px] px-[20px] md:px-[50px]">
    <DocumentationsToolbar />
  </div>
</template>