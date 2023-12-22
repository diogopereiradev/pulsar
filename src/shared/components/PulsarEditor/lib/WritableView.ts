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
  value?: string
};

type WritableAreaShortcut = {
  [key: string]: (editor: EditorInstance) => void;
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
    view.innerHTML = options.value || '';

    if(!options.value) view.classList.add('pulsar-editor-empty');

    if(editor.dom.editorStyles && !editor.dom.editorStyles.innerHTML.match('.pulsar-editor-writable-area')) {
      editor.dom.editorStyles.innerHTML += this.addStyles(editor);
    }

    view.onkeydown = (ev) => {
      const shortcuts = this.addShortcuts();
      Object.keys(shortcuts).forEach(key => {
        if(ev.key === key) {
          shortcuts[key]?.(editor);
        }
      });
    };
    view.oninput = this.addOnChange(view);
    view.onfocus = () => this.addOnFocus(editor, viewId);

    return view;
  }

  private static addStyles(editor: EditorInstance) {
    return /* css */`
      .pulsar-editor-writable-area {
        position: relative;
        font-family: Roboto;
        font-weight: 400;
        color: ${editor.theme.text};
        outline: none;
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
      'ArrowUp': (editor) => {
        editor.commands.focusPreviousInput();
      },
      'ArrowDown': (editor) => {
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