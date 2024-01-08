import { EditorInstance } from '../../../@types/Editor';
import { Selection } from '../../../listeners/Selection';
import { BlockToolbar } from '../../BlockToolbar';
import { getBlockFromChild } from '../../utils/getBlockFromChild';

export function focusPreviousInput(editor: EditorInstance) {
  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.pulsar-editor-writable-area'));
  
  if(typeof editor.view.currentSelectedInputPos !== 'undefined') {
    const previousInputPos = editor.view.currentSelectedInputPos - 1;
    const previousInput = inputs[previousInputPos];

    if(previousInput) {
      previousInput.focus();

      const sel = window.getSelection();
      const range = document.createRange();

      range.setStart(previousInput, previousInput.childNodes.length);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);

      editor.view.currentSelectedInputPos = previousInputPos;
      editor.selection.offset = Selection.getRealCaretPos();

      const block = getBlockFromChild(previousInput);

      if(!block) return;

      BlockToolbar.moveToBlock(editor, block.dataset.blockId || '');
      editor.view.currentSelectedBlock = block.dataset.blockId || undefined;
      editor.view.currentSelectedBlockDOM = block;
      editor.view.currentLine = editor.output.blocks.findIndex(b => b.id === block.dataset.blockId);
    }
  }
}