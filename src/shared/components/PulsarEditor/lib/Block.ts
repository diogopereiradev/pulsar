import { EditorBlock } from '../@types/Block';
import { EditorCommandBlockOptions, EditorInstance } from '../@types/Editor';
import { generateId } from './utils/generateId';

export class Block {
  static create(blockname: string, options?: EditorCommandBlockOptions): EditorBlock {
    return {
      id: generateId(),
      type: blockname,
      data: options?.data,
      value: options?.value,
      editorData: {
        isDeleted: false
      }
    };
  }
  
  static destroy(editor: EditorInstance, blockid: string) {
    editor.output.blocks = editor.output.blocks.map(b => {
      if(b.id !== blockid) return b;
      return {
        ...b,
        editorData: {
          ...b.editorData,
          isDeleted: true
        }
      };
    });
    editor.output.time = Date.now();
  }
}