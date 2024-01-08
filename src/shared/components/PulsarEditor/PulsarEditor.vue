<script setup lang="ts">
import { EditorThemeColors } from './@types/Editor';
import { Editor } from './lib/Editor';
import { Paragraph } from './plugins/Paragraph';

const { t } = useI18n();
const props = defineProps<{ theme: EditorThemeColors }>();
const editor = Editor.create({
  holder: '.pulsar-editor',
  messages: {
    notfound: t('pulsareditor.notfound')
  },
  plugins: [
    Paragraph.configure({
      menuName: t('pulsareditor.plugin-paragraph'),
      menuIcon: 'fa-solid fa-t',
      storage: {
        placeholder: 'Type \"/\" to see the options'
      }
    })
  ],
  theme: props.theme,
  editable: true
});
</script>

<template>
  <div class="pulsar-editor"></div>
</template>