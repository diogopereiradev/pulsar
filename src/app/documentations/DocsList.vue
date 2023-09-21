<script setup lang="ts">
import Paginator, { PageState } from 'primevue/paginator';
import DocCard from '~/app/documentations/DocCard.vue';
import { useDocumentations } from '~/shared/states/documentationsState';
import { Documentation } from '~/shared/storage/models/Documentation';

const ROWS_PER_PAGE = 6;
const docs = useDocumentations();

// Get all docs(title) matched with docs.value.search
const computedSearchData = computed(() => {
  const searchData = docs.value.data.filter(doc => doc.title.toLowerCase().match(docs.value.search.toLowerCase()));
  return searchData;
});

const handlePageChange = (ev: PageState) => {
  if(docs.value.search) {
    const searchData = computedSearchData.value;
    docs.value.currentPageData = searchData.slice(ev.first, ev.first + ev.rows);
  } else {
    docs.value.currentPageData = docs.value.data.slice(ev.first, ev.first + ev.rows);
  }
};

watch([() => docs.value.search, () => docs.value.data], ([search, data]) => {
  if (!search) {
    docs.value.currentPageData = data.slice(0, ROWS_PER_PAGE);
  } else {
    docs.value.currentPageData = computedSearchData.value.slice(0, ROWS_PER_PAGE);
  }
});

// Load all docs in memory
onMounted(async () => {
  const initialDocs = await Documentation.getAll();
  
  if(initialDocs) {
    docs.value.data = initialDocs;
  }
});
</script>

<template>
  <div class="flex flex-col gap-[25px] py-[50px]">
    <h2 class="text-[22px] text-primary/90 font-[500]">{{ $t('documentations.documentations-list-title') }}</h2>
    <div 
      :class="`
        ${docs.currentPageData.length < 1 && 'hidden'} 
        flex 
        ${docs.currentPageData.length <= 2? 'justify-normal' : 'justify-between' } 
        gap-[20px] 
        flex-wrap
    `">
      <DocCard
        :class="docs.currentPageData.length <= 2 && 'grow-0 max-xl:grow'"
        v-for="doc in docs.currentPageData"
        :key="doc.id"
        :data="doc"
      />
    </div>
    <div :class="`${docs.currentPageData.length >= 1 && 'hidden'} w-full h-[240px] 3xl:h-[300px] flex justify-center items-center`">
      <p class="text-[16px] text-primary/40 font-[400]">{{ $t('documentations.documentations-list-empty-message') }}</p>
    </div>
    <div :class="`${docs.currentPageData.length < 1 && 'hidden'} w-full justify-center mt-[10px]`">
      <Paginator
        @page="handlePageChange($event)" 
        :rows="ROWS_PER_PAGE" 
        :total-records="docs.search? computedSearchData.length : docs.data.length /* If */"
      />
    </div>
  </div>
</template>