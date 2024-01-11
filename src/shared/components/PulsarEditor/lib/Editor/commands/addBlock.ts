import { EditorBlock } from '../../../@types/Block';
import { EditorCommandBlockOptions, EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function addBlock(editor: EditorInstance, blockname: string, options: EditorCommandBlockOptions) {
  const plugin = editor.plugins.find(p => p.name === blockname);

  if(!plugin ) return;
  
  const block = Block.create(blockname, options);
  const blocks: EditorBlock[] = JSON.parse(JSON.stringify(editor.output.blocks));
  
  editor.output.blocks = blocks.concat(block);
  editor.output.time = Date.now();
}