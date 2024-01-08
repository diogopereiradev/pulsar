import { EditorBlock } from '../../../@types/Block';
import { EditorCommandBlockOptions, EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function addBlockAt(editor: EditorInstance, blockname: string, options: Partial<EditorCommandBlockOptions> & { line: number }) {
  const plugin = editor.plugins.find(p => p.name === blockname);

  if(!plugin) return;
  
  const block = Block.create(blockname, options);
  const blocks: EditorBlock[] = JSON.parse(JSON.stringify(editor.output.blocks));

  blocks.splice(options.line, 0, block);
  
  editor.output.blocks = blocks;
  editor.output.time = Date.now();
}