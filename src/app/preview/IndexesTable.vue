<script setup lang="ts">
import { usePreview } from '~/shared/states/previewState';

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
</script>

<template>
  <div class="pulsar-indexes-table-container">
    <div class="pulsar-indexes-table" v-if="headings.length >= 1 && preview.doc?.features.indexesTable">
      <h2
        :style="{ 
          color: preview.doc?.colors.text + 'e9',
          fontWeight: '500',
          fontSize: '15px'
        }"
      >
        {{ preview.doc?.indexesTableTitle }}
      </h2>
      <ul
        :style="{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '10px'
        }"
      >
        <li v-for="heading in headings">
          <button @click="heading.scrollIntoView()" :style="{ color: preview.doc?.colors.text + 'a1', fontSize: '15px' }">
            {{ heading.textContent }}
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
  .pulsar-indexes-table-container {
    min-width: 180px;
  }

  .pulsar-indexes-table {
    position: fixed;
  }

  @media only screen and (max-width: 1180px) {
    .pulsar-indexes-table {
      margin-left: 20px;
    }
  }

  @media only screen and (max-width: 768px) {
    .pulsar-indexes-table-container {
      display: none;
    }
  }
</style>