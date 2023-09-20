<script setup lang="ts">
import DocCard from '~/app/documentations/DocCard.vue';
import { useDocumentations } from '~/shared/states/documentationsState';

const docs = useDocumentations();
</script>

<template>
  <div class="flex flex-col gap-[25px] py-[50px]">
    <h2 class="text-[22px] text-primary/90 font-[500]">{{ $t('documentations.documentations-list-title') }}</h2>
    <div :class="`${docs.data.length < 1 && 'hidden'} flex ${docs.data.length <= 2? 'justify-normal' : 'justify-between' } gap-[20px] flex-wrap`">
      <DocCard
        :class="docs.data.length <= 2 && 'grow-0 max-xl:grow'"
        v-for="doc in docs.data"
        :id="doc.id"
        :title="doc.title"
        :description="doc.description"
        :pages="doc.pages"
        :colors="doc.colors"
        :features="doc.features"
        :created-at="doc.createdAt"
      />
    </div>
    <div :class="`${docs.data.length >= 1 && 'hidden'} w-full h-[240px] 3xl:h-[300px] flex justify-center items-center`">
      <p class="text-[16px] text-primary/40 font-[400]">{{ $t('documentations.documentations-list-empty-message') }}</p>
    </div>
  </div>
</template>