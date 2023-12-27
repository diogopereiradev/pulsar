import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';

export const Heading = Plugin.create({
  name: 'heading',
  type: 'text',
  addView(editor, options) {
    return {
      tag: 'div',
      childs: WritableView.create(editor, {
        tag: `h${options.data?.level || 1}`,
        type: 'singleline',
        attributes: [
          {
            key: 'class',
            value: `pulsar-editor-heading pulsar-editor-heading-h${options.data?.level || 1}`
          }
        ],
        placeholder: `Type your H${options.data?.level || 1}`,
        value: options.value || ''
      })
    };
  },
  addStyles(_, block) {
    return {
      id: 'heading-styles',
      css: (editor) => /* css */`
        .pulsar-editor-heading {
          font-weight: 700;
          font-family: Roboto;
          color: ${editor.theme.text};
        }

        .pulsar-editor-heading-h1 {
          font-size: 2rem;
        }

        .pulsar-editor-heading-h2 {
          font-size: 1.6rem;
        }

        .pulsar-editor-heading-h3 {
          font-size: 1.4rem;
        }

        .pulsar-editor-heading-h4 {
          font-size: 1.2rem;
        }
      `,
    };
  },
  addOnCopy(editor, block) {
    const markdownAnnotation = Array.from({ length: block.data?.level as number || 1 }).map(() => '#');
    return (markdownAnnotation.join('') + ' ' + block.value as string) || '';
  },
});