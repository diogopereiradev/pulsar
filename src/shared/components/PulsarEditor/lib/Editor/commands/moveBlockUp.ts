import { EditorBlock } from '../../../@types/Block';
import { EditorInstance } from '../../../@types/Editor';
import { BlockToolbar } from '../../BlockToolbar';
import { arraySwap } from '../../utils/arraySwap';

export function moveBlockUp(editor: EditorInstance, blockid: string) {
  const currentBlockDom = document.querySelector(`[data-block-id="${blockid}"]`);

  if(!currentBlockDom) return;

  const previousBlockDom = currentBlockDom.previousElementSibling;

  if(!previousBlockDom) return;
  
  const currentBlockLine = Array.from(editor.dom.blocksContainer!.childNodes).findIndex(n => n === currentBlockDom);
  const previousBlockLine = Array.from(editor.dom.blocksContainer!.childNodes).findIndex(n => n === previousBlockDom);

  const newBlocksArr = arraySwap(editor.output.blocks, currentBlockLine, previousBlockLine) as EditorBlock[];

  editor.dom.blocksContainer?.insertBefore(currentBlockDom, previousBlockDom);

  BlockToolbar.moveToBlock(editor, blockid);
  editor.output.blocks = newBlocksArr;
  editor.view.currentLine = previousBlockLine;

  const previousBlockWritableArea = currentBlockDom.querySelector<HTMLDivElement>('.pulsar-editor-writable-area');
  previousBlockWritableArea?.focus();
}