import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';

export const Paragraph = Plugin.create({
  name: 'paragraph',
  type: 'text',
  addView(editor, options) {
    const plugin = editor.plugins.find(p => p.name === this.name);

    return {
      tag: 'div',
      childs: WritableView.create(editor, {
        tag: 'p',
        type: 'singleline',
        attributes: [
          {
            key: 'class',
            value: 'pulsar-editor-paragraph'
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
        editor.commands.addBlockAt('paragraph', { 
          line: editor.view.currentLine? editor.view.currentLine + 1 : undefined, 
          value: undefined 
        });
      }
    }
  },
  addStorage() {
    return {
      placeholder: ''
    };
  }
});