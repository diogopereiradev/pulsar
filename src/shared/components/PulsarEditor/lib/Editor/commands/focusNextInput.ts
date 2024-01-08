import { EditorInstance } from '../../../@types/Editor';
import { BlockToolbar } from '../../BlockToolbar';
import { getBlockFromChild } from '../../utils/getBlockFromChild';

export function focusNextInput(editor: EditorInstance) {
  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.pulsar-editor-writable-area'));
  
  if(typeof editor.view.currentSelectedInputPos !== 'undefined') {
    const nextInputPos = editor.view.currentSelectedInputPos + 1;
    const nextInput = inputs[nextInputPos];

    if(nextInput) {
      nextInput.focus();
      
      const sel = window.getSelection();
      const range = document.createRange();

      range.setStart(nextInput.childNodes[0], 0);
      range.collapse();

      sel?.removeAllRanges();
      sel?.addRange(range);

      editor.view.currentSelectedInputPos = nextInputPos;

      const block = getBlockFromChild(nextInput);

      if(!block) return;

      BlockToolbar.moveToBlock(editor, block.dataset.blockId || '');
      editor.view.currentSelectedBlock = block.dataset.blockId || undefined;
      editor.view.currentSelectedBlockDOM = block;
      editor.view.currentLine = editor.output.blocks.findIndex(b => b.id === block.dataset.blockId);
    }
  }
}