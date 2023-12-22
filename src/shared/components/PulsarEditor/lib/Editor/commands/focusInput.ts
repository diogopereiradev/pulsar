import { EditorInstance } from '../../../@types/Editor';

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

    if(pos) {
      input.focus();
      editor.view.currentSelectedInputPos = pos;
    }
  }
}