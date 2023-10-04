<script setup lang="ts">
import { Editor, FloatingMenu } from '@tiptap/vue-3';
import { IDocumentationColorPalette } from '~/shared/storage/models/Documentation';

const props = defineProps<{
  editor: Editor | undefined,
  colors: IDocumentationColorPalette
}>();
</script>

<template>
  <floating-menu
    :editor="editor"
    class="rounded-[5px]"
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
      class="flex flex-col gap-[10px] px-[10px] py-[10px] min-h-[45px] rounded-[5px]"
      :style="{
        backgroundColor: props.colors.secondary
      }"
    >
      <div class="flex items-center gap-[10px]">
        <Button 
          @click="editor.chain().addRowAfter().focus().run()"
          class="flex gap-[5px] items-center min-w-[35px] min-h-[35px] duration-300 rounded-[5px] border-none !px-[10px]"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-line') }}</p>
        </Button>
        <Button 
          @click="editor.chain().addColumnAfter().focus().run()"
          class="flex gap-[5px] items-center min-w-[35px] min-h-[35px] duration-300 rounded-[5px] border-none !px-[10px]"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-plus"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-column') }}</p>
        </Button>
      </div>
      <hr class="w-[95%] h-[1px] border-none mx-auto" :style="{ backgroundColor: props.colors.divider }" />
      <div class="flex items-center gap-[10px]">
        <Button 
          @click="editor.chain().deleteRow().focus().run()"
          class="flex gap-[5px] items-center min-w-[35px] min-h-[35px] duration-300 rounded-[5px] border-none !px-[10px]"
          :style="{ 
            color: props.colors.text
          }"
        >
          <font-awesome-icon icon="fa-solid fa-minus" class="text-[15px]"></font-awesome-icon>
          <p>{{ $t('markdowneditor.slashcommands-popup-table-floatingmenu-line') }}</p>
        </Button>
        <Button 
          @click="editor.chain().deleteColumn().focus().run()"
          class="flex gap-[5px] items-center min-w-[35px] min-h-[35px] duration-300 rounded-[5px] border-none !px-[10px]"
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