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
    searchbar_blocksmenu_placeholder: t('pulsareditor.searchbar-blocksmenu-placeholder'),
    searchbar_actionsmenu_placeholder: t('pulsareditor.searchbar-actionsmenu-placeholder'),
  },
  plugins: [
    Paragraph.configure({
      menuName: t('pulsareditor.plugin-paragraph'),
      menuIcon: 'fa-solid fa-t',
      menuActions: [
        {
          name: t('pulsareditor.plugin-paragraph-action-moveup'),
          icon: 'fa-solid fa-chevron-up',
          run(editor, block) {
            editor.commands.moveBlockUp(block.id);
          }
        },
        {
          name: t('pulsareditor.plugin-paragraph-action-delete'),
          icon: 'fa-solid fa-xmark',
          run(editor, block) {
            editor.commands.deleteBlock(block.id);
          }
        },
        {
          name: t('pulsareditor.plugin-paragraph-action-movedown'),
          icon: 'fa-solid fa-chevron-down',
          run(editor, block) {
            editor.commands.moveBlockDown(block.id);
          }
        }
      ],
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