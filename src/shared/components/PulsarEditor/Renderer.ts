import { EditorBlock } from './@types/Block';
import { EditorInstance } from './@types/Editor';

export class Renderer {
  static create(editor: EditorInstance) {
    watch(() => editor.output, out => {
      this.garbageCollector(editor);

      out.blocks.forEach(block => {
        this.render(editor, block);
      });
    });
  }

  private static render(editor: EditorInstance, block: EditorBlock) {
    
  }

  private static garbageCollector(editor: EditorInstance) {
    const DOMBlocks = document.querySelectorAll('.pulsar-editor-block');
    const blocks = editor.output.blocks;
    
    DOMBlocks.forEach(domblock => {
      const blockid = (domblock as HTMLElement).dataset.blockId;

      if(!blockid) return;

      const block = blocks.find(b => b.id === blockid);

      if(block && block.editorData.isDeleted) {
        domblock.remove();
      }
    });
  }
}