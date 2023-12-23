import { watch } from 'vue';
import { EditorBlock } from './@types/Block';
import { EditorInstance } from './@types/Editor';
import { Block } from './lib/Block';

export class Renderer {
  static create(editor: EditorInstance) {
    watch(() => editor.output, out => {
      this.garbageCollector(editor);

      out.blocks.forEach(block => {
        this.render(editor, block);
      });
    }, { deep: true });
  }

  private static render(editor: EditorInstance, block: EditorBlock) {
    const plugin = editor.plugins.find(p => p.name === block.type);
    const blockDOM = document.querySelector(`[data-block-id="${block.id}"]`);

    if(!plugin || blockDOM || block.editorData.isDeleted) return;

    const node = Block.node(block, plugin.view.node(editor, { 
      data: block.data, 
      value: block.value 
    }));
    const line = editor.output.blocks.findIndex(b => b.id === block.id);

    if(line && line > 0) {
      editor.dom.blocksContainer?.insertBefore(node, editor.dom.blocksContainer.childNodes[line + 1]);
    } else {
      editor.dom.blocksContainer?.appendChild(node);
    }
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