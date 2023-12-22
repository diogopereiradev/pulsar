import { EditorInstance } from '../../../@types/Editor';

export function focusPreviousInput(editor: EditorInstance) {
  const inputs = Array.from(document.querySelectorAll<HTMLElement>('.pulsar-editor-writable-area'));
  
  if(typeof editor.view.currentSelectedInputPos !== 'undefined') {
    const previousInputPos = editor.view.currentSelectedInputPos - 1;
    const previousInput = inputs[previousInputPos];

    if(previousInput) {
      previousInput.focus();
      editor.view.currentSelectedInputPos = previousInputPos;
    }
  }
}