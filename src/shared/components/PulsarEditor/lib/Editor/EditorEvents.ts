import { EditorInstance } from '../../@types/Editor';
import { Block } from '../Block';

export class EditorEvents {
  static create(editor: EditorInstance) {
    document.addEventListener('mousedown', (ev) => {
      // Unselect all blocks
      if(editor.selection.selectionBox.isDragging) return;
      const selectedBlocks = editor.selection.selectedBlocks;
      selectedBlocks?.forEach(block => {
        Block.unselect(editor, block);
      });  
    });
  }
}