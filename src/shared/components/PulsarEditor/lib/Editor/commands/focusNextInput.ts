import { EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';
import { getBlockFromChild } from '../../utils/getBlockFromChild';

export function focusNextInput(editor: EditorInstance) {
  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.pulsar-editor-writable-area'));
  
  if(typeof editor.view.currentSelectedInputPos !== 'undefined') {
    const nextInputPos = editor.view.currentSelectedInputPos + 1;
    const nextInput = inputs[nextInputPos];

    if(nextInput) {
      const block = getBlockFromChild(nextInput);
      Block.focus(editor, block?.dataset.blockId);
      
      const sel = window.getSelection();
      const range = document.createRange();

      range.setStart(nextInput.childNodes[0], 0);
      range.collapse();

      sel?.removeAllRanges();
      sel?.addRange(range);

      editor.view.currentSelectedInputPos = nextInputPos;
    }
  }
}