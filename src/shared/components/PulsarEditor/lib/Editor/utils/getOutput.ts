import { EditorInstance } from '../../../@types/Editor';

export function getOutput(editor: EditorInstance) {
  const parsedBlocks = editor.output.blocks.map(block => ({
    ...block,
    id: undefined,
    editorData: undefined    
  }));
  return {
    time: editor.output.time,
    blocks: parsedBlocks
  }
}