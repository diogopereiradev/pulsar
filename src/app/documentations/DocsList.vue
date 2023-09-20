<script setup lang="ts">
import Paginator, { PageState } from 'primevue/paginator';
import DocCard from '~/app/documentations/DocCard.vue';
import { useDocumentations } from '~/shared/states/documentationsState';
import { IDocumentation } from '~/shared/storage/models/Documentation';

const ROWS_PER_PAGE = 6;

const docs = useDocumentations();
const pageData = ref<IDocumentation[]>([]);

const handlePageChange = (ev: PageState) => {
  pageData.value = docs.value.data.slice(ev.first, ev.first + ev.rows);
};

watch(() => docs.value.data, () => {
  // Load initial page data
  pageData.value = docs.value.data.slice(0, ROWS_PER_PAGE);
});
</script>

<template>
  <div class="flex flex-col gap-[25px] py-[50px]">
    <h2 class="text-[22px] text-primary/90 font-[500]">{{ $t('documentations.documentations-list-title') }}</h2>
    <div :class="`${pageData.length < 1 && 'hidden'} flex ${pageData.length <= 2? 'justify-normal' : 'justify-between' } gap-[20px] flex-wrap`">
      <DocCard
        :class="pageData.length <= 2 && 'grow-0 max-xl:grow'"
        v-for="doc in pageData"
        :key="doc.id"
        :id="doc.id"
        :title="doc.title"
        :description="doc.description"
        :pages="doc.pages"
        :colors="doc.colors"
        :features="doc.features"
        :created-at="doc.createdAt"
      />
    </div>
    <div :class="`${pageData.length >= 1 && 'hidden'} w-full h-[240px] 3xl:h-[300px] flex justify-center items-center`">
      <p class="text-[16px] text-primary/40 font-[400]">{{ $t('documentations.documentations-list-empty-message') }}</p>
    </div>
    <div :class="`${pageData.length < 1 && 'hidden'} w-full justify-center mt-[10px]`">
      <Paginator @page="handlePageChange($event)" :rows="ROWS_PER_PAGE" :total-records="docs.data.length" />
    </div>
  </div>
</template>