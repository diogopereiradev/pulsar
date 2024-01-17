import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';

export const Heading3 = Plugin.create({
  name: 'heading-3',
  type: 'text',
  addView(editor, options) {
    const plugin = editor.plugins.find(p => p.name === this.name);

    return {
      tag: 'div',
      childs: WritableView.create(editor, {
        tag: 'h3',
        type: 'singleline',
        attributes: [
          {
            key: 'class',
            value: 'pulsar-editor-heading-3'
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
        const textBeforeCaret = JSON.parse(JSON.stringify(block.value)).slice(0, editor.selection.offset);
        const textAfterCaret = JSON.parse(JSON.stringify(block.value)).slice(editor.selection.offset);

        const blockDom = editor.dom.blocksContainer?.querySelector(`[data-block-id="${block.id}"]`);
        if(!blockDom) return;

        const view = blockDom.querySelector('.pulsar-editor-writable-area');
        if(!view) return;

        view.textContent = textBeforeCaret;
        block.value = textBeforeCaret;
        editor.commands.addBlockAt('paragraph', { 
          line: editor.view.currentLine? editor.view.currentLine + 1 : undefined, 
          value: textAfterCaret
        });
      }
    }
  },
  addStyles(editor, block) {
    return {
      id: 'plugin-heading-3',
      css: () => /* css */`
        .pulsar-editor-heading-3 {
          font-size: 1.9rem;
          font-weight: 700;
          color: ${editor.theme.text};
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