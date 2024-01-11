import { EditorBlock } from '../../../@types/Block';
import { EditorInstance } from '../../../@types/Editor';
import { BlockToolbar } from '../../BlockToolbar';
import { arraySwap } from '../../utils/arraySwap';

export function moveBlockDown(editor: EditorInstance, blockid: string) {
  const currentBlockDom = document.querySelector(`[data-block-id="${blockid}"]`);

  if(!currentBlockDom) return;

  const nextBlockDom = currentBlockDom.nextElementSibling;

  if(!nextBlockDom) return;
  
  const currentBlockLine = Array.from(editor.dom.blocksContainer!.childNodes).findIndex(n => n === currentBlockDom);
  const nextBlockLine = Array.from(editor.dom.blocksContainer!.childNodes).findIndex(n => n === nextBlockDom);

  // Duplicando o "from"
  const newBlocksArr = arraySwap(editor.output.blocks, currentBlockLine, nextBlockLine) as EditorBlock[];

  editor.dom.blocksContainer?.insertBefore(currentBlockDom, editor.dom.blocksContainer.childNodes[nextBlockLine + 1]);
  
  BlockToolbar.moveToBlock(editor, blockid);
  editor.output.blocks = newBlocksArr;
  editor.output.time = Date.now();
  editor.view.currentLine = nextBlockLine;
  
  const nextBlockWritableArea = currentBlockDom.querySelector<HTMLDivElement>('.pulsar-editor-writable-area');
  nextBlockWritableArea?.focus();
}