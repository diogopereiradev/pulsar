import { EditorStyles } from './@types/Editor';

export function DefaultStyles(): EditorStyles {
  return {
    id: 'pulsar-editor-default-styles',
    css: (editor) => /* css */`
      .pulsar-editor-block {
        transition: .3s;
      }

      .pulsar-editor-block.pulsar-editor-selected {
        background-color: ${editor.theme.primary}20;
        transition: .3s;
        margin-top: 7px;
        border-radius: 10px;
        padding: 15px;
      }
    `
  };
}