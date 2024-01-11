import { EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function deleteBlock(editor: EditorInstance, blockid: string) {
  if(editor.output.blocks.length === 1) return;
  Block.destroy(editor, blockid);
}