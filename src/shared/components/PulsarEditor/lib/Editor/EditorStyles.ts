import { EditorStyles } from '../../@types/Editor';

export function DefaultStyles(): EditorStyles {
  return {
    id: 'pulsar-editor-default-styles',
    css: (editor) => /* css */`
      .pulsar-editor {
        display: inline-block;
        display: flex;
        word-break: break-all;
        height: 100%;
      }

      .pulsar-editor-blocks {
        width: 100%;
        height: 100%;
        padding-bottom: 28px;
      }

      .pulsar-editor-block {
        transition: .3s;
      }

      .pulsar-editor-blocks-toolbar {
        min-width: 70px;
        height: 100%;
        padding-right: 10px;
      }

      .pulsar-editor-blocks-toolbar-buttons {
        position: absolute;
        display: flex;
        align-items: center;
        gap: 1px;
      }

      .pulsar-editor-toolbar-createblocks-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 25px;
        min-height: 25px;
        background-color: transparent;
        border-radius: 3px;
        color: ${editor.theme.text}90;
        font-size: 16px;
        transition: .3s;
      }

      .pulsar-editor-toolbar-createblocks-button:hover {
        background-color: ${editor.theme.text}30;
      }

      .pulsar-editor-toolbar-blockoptions-button {
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 25px;
        min-height: 25px;
        background-color: transparent;
        border-radius: 3px;
        color: ${editor.theme.text}90;
        font-size: 16px;
        transition: .3s;
      }

      .pulsar-editor-toolbar-blockoptions-button:hover {
        background-color: ${editor.theme.text}30;
      }

      .pulsar-editor-toolbar-blockoptions-button div {
        display: flex;
        gap: 2px;
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

      @media screen and (max-width: 768px) {
        .pulsar-editor {
          flex-direction: column-reverse;
        }

        .pulsar-editor-blocks-toolbar-buttons {
          gap: 10px;
          margin-top: 35px;
        }

        .pulsar-editor-toolbar-createblocks-button {
          width: 35px;
          height: 35px;
          background-color: ${editor.theme.primary};
        }

        .pulsar-editor-toolbar-createblocks-button:hover {
          background-color: ${editor.theme.primary}60;
        }

        .pulsar-editor-toolbar-blockoptions-button {
          width: 35px;
          height: 35px;
          background-color: ${editor.theme.primary};
        }
  
        .pulsar-editor-toolbar-blockoptions-button:hover {
          background-color: ${editor.theme.primary}60;
        }
      }
    `
  };
}