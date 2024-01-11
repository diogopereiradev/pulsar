<script setup lang="ts">
import { EditorThemeColors } from './@types/Editor';
import { Editor } from './lib/Editor';
import { Paragraph } from './plugins/Paragraph';

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
  <div class="text-white">{{ editor.view.currentLine }}</div>
</template>