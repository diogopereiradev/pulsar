import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';
import { common, createLowlight } from 'lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import { toHtml } from 'hast-util-to-html';

const lowlight = createLowlight(common);
lowlight.register({ javascript })

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
        tag: 'div',
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
  addOnUnfocus(editor, block) {
    const blockDom = editor.dom.blocksContainer?.querySelector(`[data-block-id="${block.id}"]`);
    const input = blockDom?.querySelector('.pulsar-editor-writable-area');

    if(!input) return;

    const highlight = lowlight.highlightAuto(block.value as string);
    const highlightedHtml = toHtml(highlight);

    if(!highlightedHtml) return;
    input.innerHTML = highlightedHtml;
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

        .hljs-comment, .hljs-quote { color: #606060; }

        .hljs-variable,
        .hljs-template-variable,
        .hljs-attribute,
        .hljs-tag,
        .hljs-name,
        .hljs-regexp,
        .hljs-link,
        .hljs-name,
        .hljs-selector-id,
        .hljs-selector-class {
          color: #fff999;
        }
    
        .hljs-number,
        .hljs-meta,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-literal,
        .hljs-type,
        .hljs-params {
          color: #ffff;
        }
    
        .hljs-string, .hljs-symbol, .hljs-bullet { color: #1f1f; }
    
        .hljs-title, .hljs-section { color: #fff999; }
    
        .hljs-keyword, .hljs-selector-tag { color: #1f1f; }
    
        .hljs-emphasis { font-style: italic;}
    
        .hljs-strong { font-weight: 700; }
      `
    }
  },
  addStorage() {
    return {
      placeholder: ''
    };
  }
});