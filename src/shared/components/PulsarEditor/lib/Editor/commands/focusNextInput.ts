import { EditorInstance } from '../../../@types/Editor';

export function focusNextInput(editor: EditorInstance) {
  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.pulsar-editor-writable-area'));
  
  if(typeof editor.view.currentSelectedInputPos !== 'undefined') {
    const nextInputPos = editor.view.currentSelectedInputPos + 1;
    const nextInput = inputs[nextInputPos];

    if(nextInput) {
      nextInput.focus();
      editor.view.currentSelectedInputPos = nextInputPos;
    }
  }
}