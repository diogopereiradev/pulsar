import { EditorInstance, EditorOptions } from '../../@types/Editor';
import { getOutput } from './utils/getOutput';

export class Editor {
  static create(options: EditorOptions): EditorInstance {
    const editor: EditorInstance = reactive({
      output: {
        time: Date.now(),
        blocks: []
      },
      getOutput: () => getOutput(editor),
      theme: options.theme,
      dom: {
        holder: undefined
      },
      view: {
        currentSelectedBlock: undefined,
        currentSelectedBlockDOM: undefined,
        currentLine: undefined
      },
      editable: options.editable? options.editable : true,
      plugins: options.plugins,
      commands: {
        addBlockAt: (blockname, line, options) => {},
        setBlock: (blockname, options) => {},
        focusBlock: (blockid) => {},
        focusNextBlock: () => {},
        focusPreviousBlock: () => {},
        moveBlockUp: (blockid) => {},
        moveBlockDown: (blockid) => {},
        focusNextInput: () => {},
        focusPreviousInput: () => {},
        focusNextInputWrappedIn: () => {},
        focusPreviousInputWrappedIn: () => {}
      }
    });

    onMounted(() => {
      const holder = document.querySelector<HTMLElement>(options.holder);

      if(holder) {
        editor.dom.holder = holder;
      } else {
        console.error(`[PulsarEditor] The holder ${options.holder} was not found!`);
      }
    });

    return editor;
  }
}