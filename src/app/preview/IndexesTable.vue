<script setup lang="ts">
import { usePreview } from '~/shared/states/previewState';

const indexesTableRef = ref<HTMLDivElement>();
const headings = ref<HTMLHeadingElement[]>([]);
const preview = usePreview();

function initHeadings() {
  const newHeadings = document.querySelectorAll<HTMLHeadingElement>('.pulsar-heading-indexed');
  const filteredHeadings = Array.from(newHeadings).filter(heading => heading.textContent);
  headings.value = filteredHeadings;
}

watch(() => preview.value.currentSelectedPage, () => {
  initHeadings();
});

// Lock the table position when reach the scroll limit
watch(indexesTableRef, table => {
  if(table) {
    window.addEventListener('scroll', ev => {
      const container = table.parentElement;

      if(container) {
        const currentPercentage = (window.scrollY / container.scrollHeight) * 100;
        
        if(currentPercentage >= 83) {
          table.style.position = 'absolute';
          table.style.bottom = '80px';
        } else {
          table.style.position = 'fixed';
          table.style.bottom = 'auto';
        }
      }
    });
  }
});
</script>

<template>
  <div class="pulsar-indexes-table-container">
    <div 
      ref="indexesTableRef" 
      class="pulsar-indexes-table" 
      v-if="headings.length >= 1 && preview.doc?.features.indexesTable"
    >
      <h2 class="pulsar-indexes-table-title">
        {{ preview.doc?.indexesTableTitle }}
      </h2>
      <ul class="pulsar-indexes-table-list">
        <li v-for="heading in headings">
          <button @click="heading.scrollIntoView()" class="pulsar-indexes-table-list-button">
            {{ heading.textContent }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .pulsar-indexes-table-container {
    position: relative;
    min-width: 180px;
  }

  .pulsar-indexes-table {
    position: fixed;
    overflow-y: auto;
    max-height: 100vh;
    padding-right: 40px;
    padding-bottom: 20px;
    scrollbar-width: thin;
    margin-left: 20px;
  }

  .pulsar-indexes-table::-webkit-scrollbar {
    width: 2px;
  }
  
  .pulsar-indexes-table::-webkit-scrollbar-thumb {
    background-color: v-bind('preview.doc?.colors.text + "50"');
  }

  .pulsar-indexes-table-title {
    color: v-bind('preview.doc?.colors.text + "e9"');
    font-weight: 500;
    font-size: 15px;
  }

  .pulsar-indexes-table-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
  }

  .pulsar-indexes-table-list-button {
    color: v-bind('preview.doc?.colors.text + "a1"');
    font-size: 15px;
  }

  @media only screen and (max-width: 1180px) {
    .pulsar-indexes-table {
      margin-left: 40px;
    }
  }

  @media only screen and (max-width: 768px) {
    .pulsar-indexes-table-container {
      display: none;
    }
  }
</style>