<script setup lang="ts">
import { Editor, FloatingMenu } from '@tiptap/vue-3';
import { IDocumentationColorPalette } from '~/database/models/Documentation';

const props = defineProps<{
  editor: Editor | undefined,
  colors: IDocumentationColorPalette
}>();
</script>

<template>
  <floating-menu
    :editor="editor"
    class="rounded-md"
    plugin-key="tableControlsMenu"
    :tippy-options="{ 
      duration: 100, 
      placement: 'bottom-start'
    }" 
    v-if="editor"
    :should-show="({ editor: fnEditor }) => {
      return fnEditor.isActive('table');
    }"
  >
    <div 
      class="flex flex-col gap-2.5 p-2.5 min-h-[44px] rounded-md"
      :style="{
        backgroundColor: props.colors.secondary
      }"
    >
      <div class="flex items-center gap-2.5">
        <Button 
          @click="editor.chain().addRowAfter().focus().run()"
          class="flex gap-1.5 items-center !min-w-[36px] !min-h-[36px] duration-300 rounded-md border-none !px-2.5"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-line') }}</p>
        </Button>
        <Button 
          @click="editor.chain().addColumnAfter().focus().run()"
          class="flex gap-1.5 items-center !min-w-[36px] !min-h-[36px] duration-300 rounded-md border-none !px-2.5"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-column') }}</p>
        </Button>
      </div>
      <hr class="w-[95%] h-[1px] border-none mx-auto" :style="{ backgroundColor: props.colors.divider }" />
      <div class="flex items-center gap-2.5">
        <Button 
          @click="editor.chain().deleteRow().focus().run()"
          class="flex gap-1.5 items-center !min-w-[36px] !min-h-[36px] duration-300 rounded-md border-none !px-2.5"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-minus" class="text-[15px]"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-line') }}</p>
        </Button>
        <Button 
          @click="editor.chain().deleteColumn().focus().run()"
          class="flex gap-1.5 items-center !min-w-[36px] !min-h-[36px] duration-300 rounded-md border-none !px-2.5"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-minus" class="text-[15px]"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-column') }}</p>
        </Button>
      </div>
    </div>
  </floating-menu>
</template>