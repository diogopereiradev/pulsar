import { EditorBlock } from '../../../@types/Block';
import { EditorCommandBlockOptions, EditorInstance } from '../../../@types/Editor';
import { Block } from '../../Block';

export function setBlock(editor: EditorInstance, blockname: string, options?: EditorCommandBlockOptions) {
  const plugin = editor.plugins.find(p => p.name === blockname);

  if(plugin) {
    const block = Block.create(blockname, options);
    const blocks: EditorBlock[] = JSON.parse(JSON.stringify(editor.output.blocks));

    editor.output.blocks = blocks.map(b => b.id === editor.view.currentSelectedBlock?.id? block : b);
    editor.output.time = Date.now();
  }
}