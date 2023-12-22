import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';

export const Paragraph = Plugin.create({
  name: 'paragraph',
  addView(editor) {
    return {
      tag: 'div',
      childs: WritableView.create(editor, {
        tag: 'p',
        attributes: [
          {
            key: 'class',
            value: 'pulsar-editor-paragraph'
          }
        ],
        placeholder: 'Type something',
        value: ''
      })
    };
  },
});