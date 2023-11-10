<script setup lang="ts">
import { Editor, BubbleMenu } from '@tiptap/vue-3';
import { IDocumentationColorPalette } from '~/database/models/Documentation';

const props = defineProps<{
  editor: Editor | undefined,
  colors: IDocumentationColorPalette
}>();

function handleToolbarToggleLink() {
  if(!props.editor?.isActive('link')) {
    const url = window.prompt('URL:');
    if(url) {
      props.editor?.chain()
        .focus()
        .setLink({ href: url })
        .unsetBold()
        .unsetItalic()
        .unsetStrike()
        .run();
    }
  } else {
    props.editor?.chain().focus().unsetLink().run();
  }
}
</script>

<template>
  <bubble-menu
    class="flex gap-2.5 items-center px-2 h-11 rounded-md"
    :style="{ backgroundColor: props.colors.secondary }"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    v-if="editor"
  >
    <!--Bold button-->
    <Button 
      @click="editor.chain().focus().toggleBold().run()"
      class="!w-9 !h-9 duration-300 rounded-md border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('bold')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('link') || editor.isActive('codeBlock')"
    >
      <font-awesome-icon icon="fa-solid fa-bold"></font-awesome-icon>
    </Button>
    <!--Italic button-->
    <Button 
      @click="editor.chain().focus().toggleItalic().run()"
      class="!w-9 !h-9 duration-300 rounded-md border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('italic')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('link') || editor.isActive('codeBlock')"
    >
      <font-awesome-icon icon="fa-solid fa-italic"></font-awesome-icon>
    </Button>
    <!--Strike button-->
    <Button 
      @click="editor.chain().focus().toggleStrike().run()"
      class="!w-9 !h-9 duration-300 rounded-md border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('strike')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('link') || editor.isActive('codeBlock')"
    >
      <font-awesome-icon icon="fa-solid fa-strikethrough"></font-awesome-icon>
    </Button>
    <!--Divider-->
    <hr class="w-px h-[70%] border-none py-1" :style="{ backgroundColor: props.colors.divider }" />
    <!--Link button-->
    <Button 
      @click="handleToolbarToggleLink"
      class="!w-9 !h-9 duration-300 rounded-md border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('link')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('codeBlock')"
    >
      <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
    </Button>
  </bubble-menu>
</template>~/shared/database/models/Documentation~/indexedDB/models/Documentation