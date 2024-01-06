import { EditorInstance } from '../../@types/Editor';
import { Block } from '../Block';

export class EditorShortcuts {
  static create(editor: EditorInstance) {
    window.addEventListener('keyup', (ev) => {
      if(ev.key === 'Delete' || ev.key === 'Backspace') {
        editor.selection.selectedBlocks?.forEach(blockId => {
          Block.destroy(editor, blockId);
        });
      }

      if(ev.key === 'Escape') {
        editor.selection.selectedBlocks?.forEach(block => {
          Block.unselect(editor, block);
        });
      }
    });
  }
}