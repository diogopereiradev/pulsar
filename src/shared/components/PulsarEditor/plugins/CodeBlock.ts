import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';

export const CodeBlock = Plugin.create({
  name: 'codeblock',
  type: 'text',
  addView(editor, options) {
    const plugin = editor.plugins.find(p => p.name === this.name);

    return {
      tag: 'pre',
      attributes: [
        {
          key: 'class',
          value: 'pulsar-editor-codeblock-container'
        }
      ],
      childs: WritableView.create(editor, {
        tag: 'code',
        type: 'multiline',
        attributes: [
          {
            key: 'class',
            value: 'pulsar-editor-codeblock'
          }
        ],
        placeholder: {
          value: plugin?.storage?.placeholder as string || '',
          alwaysShowWhenEmpty: editor.output.blocks.length === 1
        },
        value: options.value || ''
      })
    };
  },
  addShortcuts() {
    return {
      'Enter': (editor, block) => {
        
      }
    }
  },
  addStyles(editor, block) {
    return {
      id: 'plugin-codeblock',
      css: () => /* css */`
        .pulsar-editor-codeblock-container {
          padding: 10px 0px;
        }

        .pulsar-editor-codeblock {
          width: 100%;
          padding: 15px 25px;
          background-color: ${editor.theme.secondary};
          border-radius: 10px;
        }
      `
    }
  },
  addStorage() {
    return {
      placeholder: ''
    };
  }
});