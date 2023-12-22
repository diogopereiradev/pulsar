<script setup lang="ts">
import { EditorThemeColors } from './@types/Editor';
import { Editor } from './lib/Editor';
import { Paragraph } from './plugins/Paragraph';

const props = defineProps<{ theme: EditorThemeColors }>();
const editor = Editor.create({
  holder: '.pulsar-editor',
  plugins: [
    Paragraph
  ],
  theme: props.theme,
  editable: true
});
</script>

<template>
  <div class="text-white">{{ editor }}</div>
  <button @click="editor.commands.setBlock('paragraph', { value: 'sdadsa' })">Add something</button>
  <div class="pulsar-editor"></div>
</template>