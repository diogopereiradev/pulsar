import { EditorInstance } from '../../../@types/Editor';
import { Selection } from '../../../listeners/Selection';
import { Block } from '../../Block';
import { getBlockFromChild } from '../../utils/getBlockFromChild';

export function focusPreviousInput(editor: EditorInstance) {
  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.pulsar-editor-writable-area'));
  
  if(typeof editor.view.currentSelectedInputPos !== 'undefined') {
    const previousInputPos = editor.view.currentSelectedInputPos - 1;
    const previousInput = inputs[previousInputPos];

    if(previousInput) {
      const block = getBlockFromChild(previousInput);
      Block.focus(editor, block?.dataset.blockId);

      const sel = window.getSelection();
      const range = document.createRange();

      range.setStart(previousInput, previousInput.childNodes.length);
      range.collapse(true);

      sel?.removeAllRanges();
      sel?.addRange(range);

      editor.view.currentSelectedInputPos = previousInputPos;
      editor.selection.offset = Selection.getRealCaretPos();
    }
  }
}