<script setup lang="ts">
import { useEditor } from '~/shared/states/editorState';

const editor = useEditor();
const headings = ref<HTMLHeadingElement[]>([]);

function updateHeadings() {
  const newHeadings = document.querySelectorAll<HTMLHeadingElement>('.tiptap-heading-element');
  const filteredHeadings = Array.from(newHeadings).filter(heading => heading.textContent);
  headings.value = filteredHeadings;
}

// Monitor new headings in page and change the state to the new headings
watch([() => editor.value.doc.pages, () => editor.value.currentSelectedPage], () => {
  updateHeadings();
});
</script>

<template>
  <div class="w-[350px]" v-if="headings.length >= 1 && headings[0].textContent">
    <h2
      class="font-[500] text-[15px]"
      :style="{ color: editor.doc.colors.text + 'e9' }"
    >
      {{ editor.doc.indexesTableTitle }}
    </h2>
    <ul class="flex flex-col gap-[10px] mt-[10px]">
      <li v-for="heading in headings">
        <button @click="heading.scrollIntoView()" class="text-[15px]" :style="{ color: editor.doc.colors.text + 'a1' }">
          {{ heading.textContent }}
        </button>
      </li>
    </ul>
  </div>
</template> 