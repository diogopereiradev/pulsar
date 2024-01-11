import { EditorInstance, EditorStyles } from '../@types/Editor';
import { PluginHTMLTags } from '../@types/Plugin';
import { StyleManager } from '../listeners/StyleManager';
import { Block } from './Block';
import { generateId } from './utils/generateId';
import { getBlockFromChild } from './utils/getBlockFromChild';

type WritableViewOptions = {
  tag: PluginHTMLTags,
  type: 'multiline' | 'singleline',
  attributes: {
    key: string,
    value: string
  }[],
  placeholder?: {
    value: string,
    alwaysShowWhenEmpty: boolean
  },
  value?: string | string[]
};

type WritableAreaShortcut = {
  [key: string]: (editor: EditorInstance, view: HTMLElement, ev: KeyboardEvent) => void;
};

export class WritableView {
  private static isSelected = false;

  static create(editor: EditorInstance, options: WritableViewOptions): HTMLElement {
    const view = document.createElement(options.tag);
    const viewId = generateId();

    options.attributes.forEach(attr => {
      view.setAttribute(attr.key, attr.value);
    });
    view.classList.add('pulsar-editor-writable-area');
    view.classList.add(options.type === 'multiline'? 'pulsar-editor-writable-area-multiline' : 'pulsar-editor-writable-area-singleline');
    
    if(options.placeholder?.alwaysShowWhenEmpty) {
      view.classList.add('always-placeholder-when-empty');
    } else {
      view.classList.add('on-focus-placeholder');
    }

    view.setAttribute('data-wrte-area-id', viewId);
    view.setAttribute('contenteditable', 'true');
    view.setAttribute('placeholder', options.placeholder?.value || '');
    view.innerHTML = options.value as string || '';

    if(!options.value) view.classList.add('pulsar-editor-empty');

    StyleManager.append(editor, this.addStyles());

    view.onkeydown = (ev) => this.onKeydown(editor, view, ev);
    view.onkeyup = (ev) => {
      delete editor.view.keysPressed![ev.key.toLowerCase()];
    };
    view.onclick = () => this.addOnClick(editor, viewId);
    view.oninput = this.addOnChange(editor, view);
    view.onfocus = () => this.addOnFocus(editor, view, viewId);
    view.onblur = () => this.addOnBlur(editor, viewId);

    return view;
  }

  private static onKeydown(editor: EditorInstance, view: HTMLElement, ev: KeyboardEvent) {
    editor.view.keysPressed![ev.key.toLowerCase()] = true;
    
    const shortcuts = this.addShortcuts();

    Object.keys(shortcuts).forEach(keys => {
      const keyMap = keys.toLowerCase().split('-');

      if(keyMap.length > 2) return;

      if(
        keyMap.length === 1 && 
        !editor.view.keysPressed!['control'] && 
        !editor.view.keysPressed!['alt'] && 
        !editor.view.keysPressed!['shift'] && 
        ev.key.toLowerCase() === keyMap[0]
      ) {
        shortcuts[keys]?.(editor, view, ev);
      }

      if(keyMap.length === 2 && editor.view.keysPressed![keyMap[0]] && editor.view.keysPressed![keyMap[1]]) {
        shortcuts[keys]?.(editor, view, ev);
      }
    });
  }

  private static addStyles(): EditorStyles {
    return {
      id: 'writable-area-styles',
      css: (editor) => /* css */`
        .pulsar-editor-writable-area-singleline br {
          display: none;
        }
  
        .pulsar-editor-writable-area-singleline * {
          display: inline;
        }

        .pulsar-editor-writable-area-multiline {
          display: inline-block;
          white-space: pre-wrap;
        }
  
        .pulsar-editor-writable-area {
          position: relative;
          font-family: Roboto;
          font-weight: 400;
          color: ${editor.theme.text};
          outline: none;
          overflow-wrap: break-word;
        }

        .pulsar-editor-writable-area::-moz-selection {
          color: ${editor.theme.text};
          background-color: ${editor.theme.primary}40;
        }

        .pulsar-editor-writable-area::selection {
          color: ${editor.theme.text};
          background-color: ${editor.theme.primary}50;
        }

        .pulsar-editor-writable-area.pulsar-editor-empty.always-placeholder-when-empty:before {
          content: attr(placeholder);
          position: absolute;
          font-family: Roboto;
          font-weight: 400;
          color: ${editor.theme.text};
          opacity: 0.6;
          cursor: text;
          pointer-events: none;
        }
  
        .pulsar-editor-writable-area.pulsar-editor-empty.on-focus-placeholder:focus:before {
          content: attr(placeholder);
          position: absolute;
          font-family: Roboto;
          font-weight: 400;
          color: ${editor.theme.text};
          opacity: 0.6;
          cursor: text;
          pointer-events: none;
        }
      `
    };
  }

  private static addShortcuts(): WritableAreaShortcut {
    return {
      'ArrowUp': (editor, view, ev) => {
        if(view.textContent === '') {
          ev.preventDefault();
          editor.commands.focusPreviousInput();
        }

        if(editor.selection.offset !== 0 || typeof editor.selection.offset === 'undefined') return;
        ev.preventDefault();
        editor.commands.focusPreviousInput();
      },
      
      'ArrowDown': (editor, view, ev) => {
        const currentCaretPos = editor.selection.offset || 0;
        const currentContentLength = view.textContent?.length || 0;

        if(currentCaretPos < currentContentLength) return;
        ev.preventDefault();
        editor.commands.focusNextInput();
      },

      'ArrowLeft': (editor, view, ev) => {
        const blockDom = getBlockFromChild(view);
        const blockId = blockDom?.dataset.blockId;
        const blockPos = editor.output.blocks.findIndex(b => b.id === blockId);

        if(blockPos === 0 || editor.selection.offset !== 0 || typeof editor.selection.offset === 'undefined') return;
        ev.preventDefault();
        editor.commands.focusPreviousInput();
      },

      'ArrowRight': (editor, view, ev) => {
        const currentCaretPos = editor.selection.offset || 0;
        const currentContentLength = view.textContent?.length || 0;

        if(currentCaretPos < currentContentLength) return;
        ev.preventDefault();
        editor.commands.focusNextInput();
      },

      'Control-A': (editor, view, ev) => {
        if(this.isSelected && editor.selection.text?.replaceAll('\n', '') === view.textContent?.replaceAll('\n', '')) {
          ev.preventDefault();
          editor.output.blocks.forEach(b => {
            Block.select(editor, b.id);
          });
          window.getSelection()?.removeAllRanges();
        } else {
          this.isSelected = true;
          editor.selection.text = view.textContent || '';
        }
      },
      
      'Escape': (editor, view, ev) => {
        editor.selection.selectedBlocks = [];
        editor.selection.text = undefined;
        editor.selection.node = undefined;
        editor.selection.offset = 0;
      },

      'Control-C': (editor, view, ev) => {
        if(editor.selection.selectedBlocks && editor.selection.selectedBlocks.length <= 0) return;
        ev.preventDefault();

        let result = '';

        editor.selection.selectedBlocks?.forEach((bid, i) => {
          const block = editor.output.blocks.find(b => b.id === bid);
          const plugin = editor.plugins.find(p => p.name === block?.type);
          
          if(block) {
            const text = plugin?.onCopy?.(editor, block);
            result += (i === 0? '' : '\n') + text;
          }
        });
        navigator.clipboard.writeText(result);
      },

      'Alt-ArrowUp': (editor, view, ev) => {
        editor.commands.moveBlockUp(editor.view.currentSelectedBlock || '');
      },

      'Alt-ArrowDown': (editor, view, ev) => {
        editor.commands.moveBlockDown(editor.view.currentSelectedBlock || '');
      }
    };
  }

  private static addOnChange(editor: EditorInstance, view: HTMLElement) {
    const isEmptyCheck = (target: HTMLElement) => {
      if(target.textContent?.length === 0) {
        target.classList.add('pulsar-editor-empty');
      } else {
        target.classList.remove('pulsar-editor-empty');
      }
    };

    const updateValue = (target: HTMLElement) => {
      const content = target.textContent;
      const blockDom = getBlockFromChild(target);
      const blockId = blockDom?.dataset.blockId;

      if(blockId) {
        const block = editor.output.blocks.find(b => b.id === blockId);
        block && (block.value = content || '');
      }
    }

    return () => {
      isEmptyCheck(view);
      updateValue(view);
    }
  }

  private static addOnClick(editor: EditorInstance, viewid: string) {
    editor.selection.selectedBlocks = [];
  }

  private static addOnFocus(editor: EditorInstance, view: HTMLElement, viewid: string) {
    const inputs = document.querySelectorAll('.pulsar-editor-writable-area');

    inputs.forEach((inp, i) => {
      if((inp as HTMLElement).dataset.wrteAreaId === viewid) {
        editor.view.currentSelectedInputPos = i;
      }
    });
    editor.selection.selectedBlocks = [];
    editor.selection.text = undefined;
    editor.selection.node = undefined;
    editor.selection.offset = 0;

    const block = getBlockFromChild(view);
    Block.focus(editor, block?.dataset.blockId);
  }

  private static addOnBlur(editor: EditorInstance, viewId: string) {
    editor.selection.selectedBlocks = [];
    editor.selection.text = undefined;
    editor.selection.node = undefined;
    editor.selection.offset = 0;
  }
}