import { EditorInstance, EditorOptions } from '../../@types/Editor';
import { EditorShortcuts } from './EditorShortcuts';
import { DefaultStyles } from './EditorStyles';
import { Renderer } from '../../listeners/Renderer';
import { Selection } from '../../listeners/Selection';
import { StyleManager } from '../../listeners/StyleManager';
import { focusInput } from './commands/focusInput';
import { focusNextInput } from './commands/focusNextInput';
import { focusPreviousInput } from './commands/focusPreviousInput';
import { setBlock } from './commands/setBlock';
import { getOutput } from './utils/getOutput';
import { EditorEvents } from './EditorEvents';
import { BlockToolbar } from '../BlockToolbar';
import { BlockToolbarStyles } from '../BlockToolbar/styles';

export class Editor {
  static create(options: EditorOptions): EditorInstance {
    const editor: EditorInstance = reactive({
      output: {
        time: Date.now(),
        blocks: []
      },
      getOutput: () => getOutput(editor),
      theme: options.theme,
      messages: options.messages,
      selection: {
        offset: 0,
        node: undefined,
        text: undefined,
        selectedBlocks: [],
        selectionBox: {
          isDragging: false,
          isMoving: false,
          range: {
            start: { x: 0, y: 0 },
            end: { x: 0, y: 0 }
          }
        }
      },
      toolbar: {
        currentBlock: ''
      },
      dom: {
        editorStyles: undefined,
        blocksContainer: undefined
      },
      view: {
        currentSelectedBlock: undefined,
        currentSelectedBlockDOM: undefined,
        currentSelectedBlockPos: undefined,
        currentSelectedInputPos: undefined,        
        keysPressed: {},
        styles: {
          time: 0,
          chunks: []
        }
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
    Selection.create(editor);
    StyleManager.create(editor);
    EditorShortcuts.create(editor);
    EditorEvents.create(editor);

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
        holder.appendChild(BlockToolbar.create(editor));
        holder.appendChild(blocksContainer);

        StyleManager.append(editor, DefaultStyles());
        StyleManager.append(editor, BlockToolbarStyles());

        Selection.createSelectionBox(editor);
        editor.commands.setBlock('paragraph', {
          value: ''
        });

        editor.toolbar.currentBlock = editor.output.blocks[0].id;
      } else {
        console.error(`[PulsarEditor] The holder ${options.holder} was not found!`);
      }
    });

    return editor;
  }
}