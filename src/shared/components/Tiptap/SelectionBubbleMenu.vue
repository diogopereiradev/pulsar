<script setup lang="ts">
import { Editor, BubbleMenu } from '@tiptap/vue-3';
import { IDocumentationColorPalette } from '~/shared/storage/models/Documentation';

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
    class="flex gap-[10px] items-center px-[7px] h-[45px] rounded-[5px]"
    :style="{ backgroundColor: props.colors.secondary }"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
    v-if="editor"
  >
    <!--Bold button-->
    <Button 
      @click="editor.chain().focus().toggleBold().run()"
      class="min-w-[35px] max-h-[35px] duration-300 rounded-[5px] border-none"
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
      class="min-w-[35px] max-h-[35px] duration-300 rounded-[5px] border-none"
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
      class="min-w-[35px] max-h-[35px] duration-300 rounded-[5px] border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('strike')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('link') || editor.isActive('codeBlock')"
    >
      <font-awesome-icon icon="fa-solid fa-strikethrough"></font-awesome-icon>
    </Button>
    <!--Divider-->
    <hr class="w-[1px] h-[70%] border-none py-[5px]" :style="{ backgroundColor: props.colors.divider }" />
    <!--Link button-->
    <Button 
      @click="handleToolbarToggleLink"
      class="min-w-[35px] max-h-[35px] duration-300 rounded-[5px] border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('link')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('codeBlock')"
    >
      <font-awesome-icon icon="fa-solid fa-link"></font-awesome-icon>
    </Button>
    <!--Code block button-->
    <Button 
      @click="editor.chain().focus().toggleCodeBlock().run()"
      class="min-w-[35px] max-h-[35px] duration-300 rounded-[5px] border-none"
      :style="{ 
        color: props.colors.text,
        backgroundColor: editor.isActive('codeBlock')? props.colors.primary : 'transparent'
      }"
      :disabled="editor.isActive('link')"
    >
      <font-awesome-icon icon="fa-solid fa-code"></font-awesome-icon>
    </Button>
  </bubble-menu>
</template>