import { EditorInstance } from '../@types/Editor';
import { PluginHTMLTags } from '../@types/Plugin';
import { generateId } from './utils/generateId';

type WritableViewOptions = {
  tag: PluginHTMLTags,
  attributes: {
    key: string,
    value: string
  }[],
  placeholder?: string,
  value?: string | string[]
};

type WritableAreaShortcut = {
  [key: string]: (editor: EditorInstance, view: HTMLElement, ev: KeyboardEvent) => void;
};

export class WritableView {
  static create(editor: EditorInstance, options: WritableViewOptions): HTMLElement {
    const view = document.createElement(options.tag);
    const viewId = generateId();

    options.attributes.forEach(attr => {
      view.setAttribute(attr.key, attr.value);
    });
    view.classList.add('pulsar-editor-writable-area');
    view.setAttribute('data-wrte-area-id', viewId);
    view.setAttribute('contenteditable', 'true');
    view.setAttribute('placeholder', options.placeholder || '');
    view.innerHTML = options.value as string || '';

    if(!options.value) view.classList.add('pulsar-editor-empty');

    if(editor.dom.editorStyles && !editor.dom.editorStyles.innerHTML.match('.pulsar-editor-writable-area')) {
      editor.dom.editorStyles.innerHTML += this.addStyles(editor);
    }

    view.onkeydown = (ev) => {
      const shortcuts = this.addShortcuts();
      Object.keys(shortcuts).forEach(key => {
        if(ev.key === key) {
          shortcuts[key]?.(editor, view, ev);
        }
      });
    };
    view.oninput = this.addOnChange(view);
    view.onfocus = () => this.addOnFocus(editor, viewId);

    return view;
  }

  private static addStyles(editor: EditorInstance) {
    return /* css */`
      .pulsar-editor-writable-area br {
        display: none;
      }

      .pulsar-editor-writable-area * {
        display: inline;
      }

      .pulsar-editor-writable-area {
        position: relative;
        font-family: Roboto;
        font-weight: 400;
        color: ${editor.theme.text};
        outline: none;
        overflow-wrap: break-word;
      }

      .pulsar-editor-writable-area.pulsar-editor-empty:focus:before {
        content: attr(placeholder);
        position: absolute;
        font-family: Roboto;
        font-weight: 400;
        color: ${editor.theme.text};
        opacity: 0.6;
        cursor: text;
      }
    `;
  }

  private static addShortcuts(): WritableAreaShortcut {
    return {
      'ArrowUp': (editor, view, ev) => {
        const sel = window.getSelection();
        const viewNodes = view.childNodes;

        if(viewNodes[0] !== sel?.anchorNode || sel?.anchorOffset !== 0) return;
        ev.preventDefault();
        editor.commands.focusPreviousInput();
      },
      'ArrowDown': (editor, view, ev) => {
        const sel = window.getSelection();
        const currentSelectedTextNode = (sel?.anchorNode as HTMLElement).textContent;

        if(sel!.anchorOffset < currentSelectedTextNode!.length) return;
        ev.preventDefault();
        editor.commands.focusNextInput();
      }
    };
  }

  private static addOnChange(view: HTMLElement) {
    const isEmptyCheck = (target: HTMLElement) => {
      if(target.textContent?.length === 0) {
        target.classList.add('pulsar-editor-empty');
      } else {
        target.classList.remove('pulsar-editor-empty');
      }
    };

    return () => {
      isEmptyCheck(view);
    }
  }

  private static addOnFocus(editor: EditorInstance, viewid: string) {
    const inputs = document.querySelectorAll('.pulsar-editor-writable-area');

    inputs.forEach((inp, i) => {
      if((inp as HTMLElement).dataset.wrteAreaId === viewid) {
        editor.view.currentSelectedInputPos = i;
      }
    });
  }
}