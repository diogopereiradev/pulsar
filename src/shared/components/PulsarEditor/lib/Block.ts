import { EditorBlock } from '../@types/Block';
import { generateId } from './utils/generateId';
import { EditorCommandBlockOptions, EditorInstance } from '../@types/Editor';
import { BlockToolbar } from './BlockToolbar';

export class Block {
  static create(blockname: string, options?: EditorCommandBlockOptions): EditorBlock {
    return {
      id: generateId(),
      type: blockname,
      data: options?.data,
      value: options?.value,
      editorData: {
        isDeleted: false
      }
    };
  }

  static destroy(editor: EditorInstance, blockid: string) {
    editor.output.blocks = editor.output.blocks.map(b => {
      if(b.id !== blockid) return b;
      return {
        ...b,
        editorData: {
          ...b.editorData,
          isDeleted: true
        }
      };
    });
    editor.output.time = Date.now();
  }

  static focus(editor: EditorInstance, blockid: string | undefined) {
    if(!blockid) return;
    const block = editor.output.blocks.find(b => b? b.id === blockid : undefined);
    const blockDom = editor.dom.blocksContainer?.querySelector(`[data-block-id="${blockid}"]`);

    if(!blockDom || !block) return;

    const firstWritableArea = blockDom.querySelector<HTMLElement>('.pulsar-editor-writable-area');
    const inputs = Array.from(editor.dom.blocksContainer?.querySelectorAll('.pulsar-editor-writable-area') || []);

    firstWritableArea?.focus();
    BlockToolbar.moveToBlock(editor, blockid);
    editor.view.currentLine = Array.from(editor.dom.blocksContainer?.childNodes || []).findIndex(n => n === blockDom);
    editor.view.currentSelectedInputPos = inputs.findIndex(inp => inp === firstWritableArea);
    editor.view.currentSelectedBlockDOM = blockDom as HTMLElement;
  }

  static select(editor: EditorInstance, blockid: string) {
    const block = editor.output.blocks.find(b => b? b.id === blockid : undefined);
    const plugin = editor.plugins.find(p => p? p.name === block?.type : undefined);

    if(!block || !plugin) return;

    const blockDom = document.querySelector(`[data-block-id="${blockid}"]`);
      
    if(blockDom?.classList.contains('pulsar-editor-selected')) return;
    blockDom?.classList.add('pulsar-editor-selected');
    editor.selection.selectedBlocks = editor.selection.selectedBlocks?.concat(block.id);
    plugin?.onSelected?.(editor, block);
  }

  static unselect(editor: EditorInstance, blockid: string) {
    const block = editor.output.blocks.find(b => b? b.id === blockid : undefined);
    const plugin = editor.plugins.find(p => p? p.name === block?.type : undefined);

    if(!block || !plugin) return;

    const blockDom = document.querySelector(`[data-block-id="${blockid}"]`);

    if(!blockDom?.classList.contains('pulsar-editor-selected')) return;
    blockDom?.classList.remove('pulsar-editor-selected');
    editor.selection.selectedBlocks = editor.selection.selectedBlocks?.filter(bid => bid !== blockid);
    plugin?.onUnselected?.(editor, block);
  }

  static node(editor: EditorInstance, block: EditorBlock, view: HTMLElement) {
    const blockDom = document.createElement('div');

    blockDom.classList.add('pulsar-editor-block');
    blockDom.setAttribute('data-block-id', block.id);

    blockDom.addEventListener('keydown', (ev) => {
      this.shortcuts(editor, block, ev);
    });

    blockDom.addEventListener('mouseenter', () => {
      BlockToolbar.moveToBlock(editor, block.id);
    });

    blockDom.addEventListener('click', () => {
      BlockToolbar.moveToBlock(editor, block.id);
      editor.view.currentSelectedBlock = block.id;
      editor.view.currentSelectedBlockDOM = blockDom;
      editor.view.currentLine = editor.output.blocks.findIndex(b => b? b.id === block.id : undefined);
    });
    
    const blockContent = document.createElement('div');

    blockContent.classList.add('pulsar-editor-block-content');
    blockContent.appendChild(view);

    blockDom.appendChild(blockContent);
    return blockDom;
  }

  private static shortcuts(editor: EditorInstance, block: EditorBlock, ev: KeyboardEvent) {
    const plugin = editor.plugins.find(p => p? p.name === block.type : undefined);
    const shortcuts = plugin?.shortcuts;

    if(!shortcuts) return;

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
        shortcuts[keys]?.(editor, block);
      }

      if(keyMap.length === 2 && editor.view.keysPressed![keyMap[0]] && editor.view.keysPressed![keyMap[1]]) {
        shortcuts[keys]?.(editor, block);
      }
    });
  }
}