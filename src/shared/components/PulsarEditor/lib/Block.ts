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

  static select(editor: EditorInstance, blockid: string) {
    const block = editor.output.blocks.find(b => b.id === blockid);
    
    if(block) {
      const blockDom = document.querySelector(`[data-block-id="${blockid}"]`);
      
      if(blockDom?.classList.contains('pulsar-editor-selected')) return;
      blockDom?.classList.add('pulsar-editor-selected');
      editor.selection.selectedBlocks = editor.selection.selectedBlocks?.concat(block.id);
    }
  }

  static unselect(editor: EditorInstance, blockid: string) {
    const block = editor.output.blocks.find(b => b.id === blockid);
    
    if(block) {
      const blockDom = document.querySelector(`[data-block-id="${blockid}"]`);

      if(!blockDom?.classList.contains('pulsar-editor-selected')) return;
      blockDom?.classList.remove('pulsar-editor-selected');
      editor.selection.selectedBlocks = editor.selection.selectedBlocks?.filter(bid => bid !== blockid);
    }
  }

  static node(editor: EditorInstance, block: EditorBlock, view: HTMLElement) {
    const blockDom = document.createElement('div');

    blockDom.classList.add('pulsar-editor-block');
    blockDom.setAttribute('data-block-id', block.id);
    blockDom.addEventListener('mouseenter', (ev) => {
      BlockToolbar.moveToBlock(editor, block.id);
    });
    
    const blockContent = document.createElement('div');

    blockContent.classList.add('pulsar-editor-block-content');
    blockContent.appendChild(view);

    blockDom.appendChild(blockContent);
    return blockDom;
  }
}