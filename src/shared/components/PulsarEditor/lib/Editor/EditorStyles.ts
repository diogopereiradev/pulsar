import { EditorStyles } from '../../@types/Editor';

export function DefaultStyles(): EditorStyles {
  return {
    id: 'pulsar-editor-default-styles',
    css: (editor) => /* css */`
      .pulsar-editor {
        height: 100%;
      }

      .pulsar-editor-blocks {
        height: 100%;
        padding-bottom: 28px;
      }

      .pulsar-editor-block {
        transition: .3s;
      }

      .pulsar-editor-block.pulsar-editor-selected {
        background-color: ${editor.theme.primary}20;
        transition: .3s;
      }

      .pulsar-editor-selection-box {
        position: absolute;
        transform-origin: left top;
        border-radius: 10px;
        background-color: ${editor.theme.primary}20;
        border-color: ${editor.theme.primary}60;
        border-width: 2px;
        pointer-events: none;
        opacity: 0;
      }
    `
  };
}