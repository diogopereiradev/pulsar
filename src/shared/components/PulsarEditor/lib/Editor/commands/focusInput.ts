import { EditorInstance } from '../../../@types/Editor';
import { BlockToolbar } from '../../BlockToolbar';
import { getBlockFromChild } from '../../utils/getBlockFromChild';

export function focusInput(editor: EditorInstance, inputid: string) {
  const input = document.querySelector<HTMLElement>(`[data-wrte-area-id="${inputid}"]`);
  const inputs = document.querySelectorAll('.pulsar-editor-writable-area');
  
  if(input) {
    let pos: number | undefined = undefined;

    inputs.forEach((inp, i) => {
      if((inp as HTMLElement).dataset.wrteAreaId === inputid) {
        pos = i;
      }
    });

    if(!pos) return;
    
    input.focus();
    editor.view.currentSelectedInputPos = pos;

    const block = getBlockFromChild(input);

    if(!block) return;

    BlockToolbar.moveToBlock(editor, block.dataset.blockId || '');
    editor.view.currentSelectedBlock = block.dataset.blockId || undefined;
    editor.view.currentSelectedBlockDOM = block;
    editor.view.currentLine = editor.output.blocks.findIndex(b => b.id === block.dataset.blockId);
  }
}