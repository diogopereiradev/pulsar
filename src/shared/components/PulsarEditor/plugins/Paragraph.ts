import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';

export const Paragraph = Plugin.create({
  name: 'paragraph',
  type: 'text',
  addView(editor, options) {
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
        placeholder: 'Type something',
        value: options.value || ''
      })
    };
  },
  addOnCopy(editor, block) {
    return block.value as string || '';
  },
});