<script setup lang="ts">
import { EditorThemeColors } from './@types/Editor';
import { Editor } from './lib/Editor';
import { Heading1 } from './plugins/Heading1';
import { Heading2 } from './plugins/Heading2';
import { Heading3 } from './plugins/Heading3';
import { Heading4 } from './plugins/Heading4';
import { Paragraph } from './plugins/Paragraph';
import { CodeBlock } from './plugins/CodeBlock';

const { t } = useI18n();
const props = defineProps<{ theme: EditorThemeColors }>();
const editor = Editor.create({
  holder: '.pulsar-editor',
  messages: {
    notfound: t('pulsareditor.notfound'),
    actionsmenu_action_moveup: t('pulsareditor.actionsmenu-action-moveup'),
    actionsmenu_action_movedown: t('pulsareditor.actionsmenu-action-movedown'),
    actionsmenu_action_delete: t('pulsareditor.actionsmenu-action-delete'),
    searchbar_blocksmenu_placeholder: t('pulsareditor.searchbar-blocksmenu-placeholder'),
    searchbar_actionsmenu_placeholder: t('pulsareditor.searchbar-actionsmenu-placeholder'),
  },
  plugins: [
    Paragraph.configure({
      menuName: t('pulsareditor.plugin-paragraph'),
      menuIcon: 'fa-solid fa-t',
      menuActions: [],
      storage: {
        placeholder: t('pulsareditor.plugin-paragraph-placeholder')
      }
    }),
    CodeBlock.configure({
      menuName: t('pulsareditor.plugin-codeblock'),
      menuIcon: 'fa-solid fa-code',
      menuActions: [],
      storage: {
        placeholder: t('pulsareditor.plugin-codeblock-placeholder')
      }
    }),
    Heading1.configure({
      menuName: t('pulsareditor.plugin-heading-1'),
      menuIcon: 'fa-solid fa-heading',
      menuActions: [],
      storage: {
        placeholder: t('pulsareditor.plugin-heading-1-placeholder')
      }
    }),
    Heading2.configure({
      menuName: t('pulsareditor.plugin-heading-2'),
      menuIcon: 'fa-solid fa-heading',
      menuActions: [],
      storage: {
        placeholder: t('pulsareditor.plugin-heading-2-placeholder')
      }
    }),
    Heading3.configure({
      menuName: t('pulsareditor.plugin-heading-3'),
      menuIcon: 'fa-solid fa-heading',
      menuActions: [],
      storage: {
        placeholder: t('pulsareditor.plugin-heading-3-placeholder')
      }
    }),
    Heading4.configure({
      menuName: t('pulsareditor.plugin-heading-4'),
      menuIcon: 'fa-solid fa-heading',
      menuActions: [],
      storage: {
        placeholder: t('pulsareditor.plugin-heading-4-placeholder')
      }
    }),
  ],
  theme: props.theme,
  editable: true
});
</script>

<template>
  <div class="pulsar-editor"></div>
</template>