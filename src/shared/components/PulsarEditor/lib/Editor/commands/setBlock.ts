import { EditorCommandBlockOptions, EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function setBlock(editor: EditorInstance, blockname: string, options?: EditorCommandBlockOptions) {
  const plugin = editor.plugins.find(p => p.name === blockname);

  if(plugin) {
    const block = Block.create(blockname, options);
    editor.output.blocks = editor.output.blocks.concat(block);
    editor.output.time = Date.now();
  }
}