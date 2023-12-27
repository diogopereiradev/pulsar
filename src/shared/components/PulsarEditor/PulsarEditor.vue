<script setup lang="ts">
import { EditorThemeColors } from './@types/Editor';
import { Editor } from './lib/Editor';
import { Heading } from './plugins/Heading';
import { Paragraph } from './plugins/Paragraph';

const props = defineProps<{ theme: EditorThemeColors }>();
const editor = Editor.create({
  holder: '.pulsar-editor',
  plugins: [
    Paragraph,
    Heading
  ],
  theme: props.theme,
  editable: true
});
</script>

<template>
  <div class="pulsar-editor"></div>
  <button @click="editor.commands.setBlock('paragraph', { value: '' })">Add something 1</button>
  <button @click="editor.commands.setBlock('heading', { value: '', data: { level: 1 } })">Add something 2</button>
</template>