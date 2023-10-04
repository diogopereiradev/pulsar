<script setup lang="ts">
import { Editor, FloatingMenu } from '@tiptap/vue-3';
import { IDocumentationColorPalette } from '~/shared/storage/models/Documentation';

const props = defineProps<{
  editor: Editor | undefined,
  colors: IDocumentationColorPalette
}>();

function handleCreateTable() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .insertTable({ rows: 2, cols: 2, withHeaderRow: true })
    .run();
}

function handleCreateImage() {
  if(!props.editor) return;
  const url = window.prompt('URL:');

  if(url && url != '') {
    props.editor
      .chain()
      .focus()
      .undo()
      .setImage({ src: url })
      .run();
  }
}

function handleBulletList() {
  if(!props.editor) return;
  props.editor
    .chain()
    .focus()
    .undo()
    .toggleBulletList()
    .run();
}
</script>

<template>
  <floating-menu
    :editor="editor"
    class="border-[1px] border-solid rounded-[5px]"
    plugin-key="commandsFloatingMenu"
    :tippy-options="{ duration: 100, placement: 'bottom-start' }" 
    v-if="editor"
    :should-show="({ state }) => {
      const currentLine = state.doc.nodeAt(state.selection.from - 1);
      const currentLineText = currentLine?.text;
      return currentLineText === '/';
    }"
    :style="{ borderColor: props.colors.primary + '70' }"
  >
    <ul class="flex flex-col" :style="{ backgroundColor: props.colors.secondary }">
      <li>
        <Button
          @click="handleCreateTable"
          :title="$t('markdowneditor.slashcommands-popup-table-description')"
          class="dinamic-button-bg flex items-center !justify-start w-[250px] h-[80px] !rounded-t-[5px] !rounded-b-[0px] border-none !px-[15px] !py-[15px]"
          :style="{ backgroundColor: props.colors.secondary }"
        >
          <div 
            class="flex justify-center items-center min-w-[50px] h-[50px] rounded-[5px]"
            :style="{ 
              backgroundColor: props.colors.primary,
              color: props.colors.text + 'c9'
            }"
          >
            <font-awesome-icon icon="fa-solid fa-table" class="text-[20px]"></font-awesome-icon>
          </div>
          <div class="relative flex flex-col items-start justify-center h-full px-[15px]">
            <h3 
              class="truncate"
              :style="{ color: props.colors.text + 'c9' }"
            >
              {{ $t('markdowneditor.slashcommands-popup-table-title') }}
            </h3>
            <p 
              class="max-w-[150px] text-[15px] truncate"
              :style="{ color: props.colors.text + '70' }"
            >
              {{ $t('markdowneditor.slashcommands-popup-table-description') }}
            </p>
          </div>
        </Button>
      </li>
      <li>
        <Button 
          @click="handleCreateImage"
          :title="$t('markdowneditor.slashcommands-popup-image-description')"
          class="dinamic-button-bg flex items-center !justify-start w-[250px] h-[80px] !rounded-t-[0px] !rounded-b-[5px] border-none !px-[15px] !py-[15px]"
          :style="{ backgroundColor: props.colors.secondary }"
        >
          <div 
            class="flex justify-center items-center min-w-[50px] h-[50px] rounded-[5px]"
            :style="{ 
              backgroundColor: props.colors.primary,
              color: props.colors.text + 'c9'
            }"
          >
            <font-awesome-icon icon="fa-solid fa-image" class="text-[20px]"></font-awesome-icon>
          </div>
          <div class="relative flex flex-col items-start justify-center h-full px-[15px]">
            <h3 
              class="truncate"
              :style="{ color: props.colors.text + 'c9' }"
            >
              {{ $t('markdowneditor.slashcommands-popup-image-title') }}
            </h3>
            <p 
              class="max-w-[150px] text-[15px] truncate"
              :style="{ color: props.colors.text + '70' }"
            >
              {{ $t('markdowneditor.slashcommands-popup-image-description') }}
            </p>
          </div>
        </Button>
      </li>
      <li>
        <Button 
          @click="handleBulletList"
          :title="$t('markdowneditor.slashcommands-popup-bulletlist-description')"
          class="dinamic-button-bg flex items-center !justify-start w-[250px] h-[80px] !rounded-t-[0px] !rounded-b-[5px] border-none !px-[15px] !py-[15px]"
          :style="{ backgroundColor: props.colors.secondary }"
        >
          <div 
            class="flex justify-center items-center min-w-[50px] h-[50px] rounded-[5px]"
            :style="{ 
              backgroundColor: props.colors.primary,
              color: props.colors.text + 'c9'
            }"
          >
            <font-awesome-icon icon="fa-solid fa-list" class="text-[18px]"></font-awesome-icon>
          </div>
          <div class="relative flex flex-col items-start justify-center h-full px-[15px]">
            <h3 
              class="truncate"
              :style="{ color: props.colors.text + 'c9' }"
            >
              {{ $t('markdowneditor.slashcommands-popup-bulletlist-title') }}
            </h3>
            <p 
              class="max-w-[150px] text-[15px] truncate"
              :style="{ color: props.colors.text + '70' }"
            >
              {{ $t('markdowneditor.slashcommands-popup-bulletlist-description') }}
            </p>
          </div>
        </Button>
      </li>
    </ul>
  </floating-menu>
</template>

<style scoped>
.dinamic-button-bg:hover {
  background-color: v-bind('colors.primary + "70"') !important;
}
</style>