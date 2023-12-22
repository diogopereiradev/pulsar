import { EditorInstance, EditorOptions } from '../../@types/Editor';
import { Renderer } from '../../Renderer';
import { focusInput } from './commands/focusInput';
import { focusNextInput } from './commands/focusNextInput';
import { focusPreviousInput } from './commands/focusPreviousInput';
import { setBlock } from './commands/setBlock';
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
        editorStyles: undefined,
        blocksContainer: undefined
      },
      view: {
        currentSelectedBlock: undefined,
        currentSelectedBlockDOM: undefined,
        currentSelectedBlockLine: undefined,
        currentSelectedInputPos: undefined
      },
      editable: options.editable? options.editable : true,
      plugins: options.plugins,
      commands: {
        addBlockAt: (blockname, line, options) => {},
        setBlock: (blockname, options) => setBlock(editor, blockname, options),
        focusBlock: (blockid) => {},
        focusNextBlock: () => {},
        focusPreviousBlock: () => {},
        moveBlockUp: (blockid) => {},
        moveBlockDown: (blockid) => {},
        focusInput: (inputid) => focusInput(editor, inputid),
        focusNextInput: () => focusNextInput(editor),
        focusPreviousInput: () => focusPreviousInput(editor)
      }
    });

    Renderer.create(editor);

    onMounted(() => {
      const holder = document.querySelector<HTMLElement>(options.holder);

      if(holder) {
        const editorStyles = document.createElement('style');
        const blocksContainer = document.createElement('div');
  
        editorStyles.classList.add('pulsar-editor-styles');
        blocksContainer.classList.add('pulsar-editor-blocks');

        editor.dom.editorStyles = editorStyles;
        editor.dom.blocksContainer = blocksContainer;

        holder.appendChild(editorStyles);
        holder.appendChild(blocksContainer);
      } else {
        console.error(`[PulsarEditor] The holder ${options.holder} was not found!`);
      }
    });

    return editor;
  }
}