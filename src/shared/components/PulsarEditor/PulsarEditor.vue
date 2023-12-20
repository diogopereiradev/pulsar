<script setup lang="ts">
import { EditorThemeColors } from './@types/Editor';
import { Editor } from './lib/Editor';

const props = defineProps<{ theme: EditorThemeColors }>();
const editor = Editor.create({
  holder: '.pulsar-editor',
  plugins: [],
  theme: props.theme,
  editable: true
});
</script>

<template>
  <div class="text-white">{{ editor }}</div>
  <div class="pulsar-editor"></div>
</template>