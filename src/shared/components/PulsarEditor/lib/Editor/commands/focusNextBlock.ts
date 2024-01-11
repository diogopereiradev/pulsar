import { EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function focusNextBlock(editor: EditorInstance) {
  const currentBlockId = editor.toolbar.currentBlock;
  const currentBlock = editor.output.blocks.find(b => b? b.id === currentBlockId : undefined);

  if(!currentBlock) return;
  
  const currentBlockDom = document.querySelector<HTMLElement>(`[data-block-id="${currentBlock.id}"]`);

  if(!currentBlockDom) return; 

  const nextBlockDom = currentBlockDom!.nextElementSibling as HTMLDivElement;
  const nextBlockId = nextBlockDom.dataset.blockId;
  const writableArea = nextBlockDom.querySelector<HTMLElement>('.pulsar-editor-writable-area');

  if(writableArea && nextBlockId) {
    Block.focus(editor, nextBlockId);
  }
}