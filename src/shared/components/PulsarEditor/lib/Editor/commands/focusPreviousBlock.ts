import { EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function focusPreviousBlock(editor: EditorInstance) {
  const currentBlockId = editor.toolbar.currentBlock;
  const currentBlock = editor.output.blocks.find(b => b? b.id === currentBlockId : undefined);

  if(!currentBlock) return;
  
  const currentBlockDom = document.querySelector<HTMLElement>(`[data-block-id="${currentBlock.id}"]`);

  if(!currentBlockDom) return; 

  const previousBlockDom = currentBlockDom.previousElementSibling as HTMLDivElement;
  const previousBlockId = previousBlockDom.dataset.blockId;
  const writableArea = previousBlockDom.querySelector<HTMLElement>('.pulsar-editor-writable-area');

  if(writableArea && previousBlockId) {
    Block.focus(editor, previousBlockId);
  }
}