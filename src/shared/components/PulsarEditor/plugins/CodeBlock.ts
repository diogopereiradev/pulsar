import { Plugin } from '../lib/Plugin';
import { WritableView } from '../lib/WritableView';
import { common, createLowlight } from 'lowlight';
import { toHtml } from 'hast-util-to-html';
import { plainTextPaste } from '../lib/utils/plainTextPaste';

const lowlight = createLowlight(common);

export const CodeBlock = Plugin.create({
  name: 'codeblock',
  type: 'text',
  addView(editor, options) {
    const plugin = editor.plugins.find(p => p.name === this.name);

    return {
      tag: 'div',
      attributes: [
        {
          key: 'class',
          value: 'pulsar-editor-codeblock-container'
        }
      ],
      childs: [
        {
          tag: 'p',
          attributes: [
            {
              key: 'class',
              value: 'pulsar-editor-codeblock-language-text'
            }
          ],
          childs: 'Waiting for input'
        },
        {
          tag: 'div',
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
        }
      ]
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
    const langText = blockDom?.querySelector('.pulsar-editor-codeblock-language-text');

    if(!input) return;

    const highlight = lowlight.highlightAuto(block.value as string);
    const highlightedHtml = toHtml(highlight);

    if(!highlightedHtml) return;
    const languageNameLetters = highlight.data!.language!.split('');
    languageNameLetters[0] = languageNameLetters[0].toUpperCase();
    langText!.textContent = languageNameLetters.join('') || 'Waiting for input';
    input.innerHTML = highlightedHtml;
  },
  addStyles(editor, block) {
    return {
      id: 'plugin-codeblock',
      css: () => /* css */`
        .pulsar-editor-codeblock-container {
          position: relative;
          padding: 10px 0px;
        }

        .pulsar-editor-codeblock {
          width: 100%;
          padding: 15px 25px;
          padding-top: 50px;
          background-color: ${editor.theme.secondary};
          border-radius: 10px;
        }

        .pulsar-editor-codeblock-language-text {
          position: absolute;
          left: 0px;
          top: 10px;
          height: 35px;
          background-color: ${editor.theme.primary}60;
          color: ${editor.theme.text};
          margin-bottom: 20px;
          padding: 0px 30px;
          border-top-left-radius: 10px;
          border-bottom-right-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hljs-comment, .hljs-quote { color: ${editor.theme.codeBlockComments}; }

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
          color: ${editor.theme.codeBlockVariable};
        }
    
        .hljs-number,
        .hljs-meta,
        .hljs-built_in,
        .hljs-builtin-name,
        .hljs-literal,
        .hljs-type,
        .hljs-params {
          color: ${editor.theme.codeBlockLiteral};
        }
    
        .hljs-string, .hljs-symbol, .hljs-bullet { color: ${editor.theme.codeBlockString}; }
    
        .hljs-title, .hljs-section { color: ${editor.theme.codeBlockSection}; }
    
        .hljs-keyword, .hljs-selector-tag { color: ${editor.theme.codeBlockKeyword}; }
    
        .hljs-emphasis { font-style: italic; }
    
        .hljs-strong { font-weight: 700; }
      `
    }
  },
  addOnPaste(editor, block, ev) {
    ev.preventDefault();
    plainTextPaste(ev);
  },
  addStorage() {
    return {
      placeholder: ''
    };
  }
});