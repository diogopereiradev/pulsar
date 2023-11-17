<script setup lang="ts">
import { DocSaverReturnType } from '~/shared/compositions/useDocSave';
import { PageSaverReturnType } from '~/shared/compositions/usePageSave';

const headings = ref<HTMLHeadingElement[]>([]);
const docSaver = inject('docSaver') as DocSaverReturnType;
const pageSaver = inject('pageSaver') as PageSaverReturnType;

function updateHeadings() {
  const newHeadings = document.querySelectorAll<HTMLHeadingElement>('.pulsar-heading-indexed');
  const filteredHeadings = Array.from(newHeadings).filter(heading => heading.textContent);
  headings.value = filteredHeadings;
}

// Monitor if the page was changed and check for new headings on page
watch(() => pageSaver.data.value.unsavedContent, (content) => {
  if(!content) return;
  setTimeout(() => {
    updateHeadings();
  }, 100);
})

// Load the index headings on pagin changing
watch(() => pageSaver.data.value.isLoadingContent, (isLoadingContent) => {
  if(isLoadingContent) return;
  setTimeout(() => {
    updateHeadings();
  }, 100);
})
</script>

<template>
  <div class="max-lg:hidden max-2xl:ml-[70px] min-w-[180px] max-2xl:w-[250px]" v-if="headings.length >= 1 && docSaver.data.value.unsavedData.features.indexesTable && pageSaver.data.value.currentSelectedPage.id !== '-1'">
    <h2
      class="font-medium text-[15px] truncate"
      :style="{ color: docSaver.data.value.unsavedData.colors.text + 'e9' }"
    >
      {{ docSaver.data.value.unsavedData.messages.indexesTableTitle }}
    </h2>
    <ul class="flex flex-col gap-2.5 mt-2.5">
      <li v-for="heading in headings">
        <button @click="heading.scrollIntoView()" class="max-w-[180px] text-[15px] truncate" :style="{ color: docSaver.data.value.unsavedData.colors.text + 'a1' }">
          {{ heading.textContent }}
        </button>
      </li>
    </ul>
  </div>
</template> 