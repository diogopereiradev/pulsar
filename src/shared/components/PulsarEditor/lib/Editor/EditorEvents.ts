import { EditorInstance } from '../../@types/Editor';
import { Block } from '../Block';
import { BlockToolbar } from '../BlockToolbar';

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

    window.addEventListener('resize', () => {
      BlockToolbar.moveToBlock(editor, editor.output.blocks[0].id);
    });
  }
}