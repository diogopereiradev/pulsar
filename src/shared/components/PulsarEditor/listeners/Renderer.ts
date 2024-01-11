import { watch } from 'vue';
import { EditorBlock } from '../@types/Block';
import { EditorInstance } from '../@types/Editor';
import { Block } from '../lib/Block';
import { StyleManager } from './StyleManager';

export class Renderer {
  static create(editor: EditorInstance) {
    watch(() => editor.output, out => {
      this.garbageCollector(out.blocks);

      if(out.blocks.length === 0) {
        editor.commands.addBlock('paragraph', { value: '' });
      }

      out.blocks.forEach(block => {
        this.render(editor, block);
      });
    }, { deep: true });
  }

  private static render(editor: EditorInstance, block?: EditorBlock) {
    if(!block) return;
    const plugin = editor.plugins.find(p => p.name === block.type);
    const blockDOM = document.querySelector(`[data-block-id="${block.id}"]`);
    
    if(!plugin || blockDOM) return;
    
    if(block.editorData.isDeleted) {
      editor.output.blocks = editor.output.blocks.filter(b => b.id !== block.id);
      editor.output.time = Date.now();
      return;
    }

    const node = Block.node(editor, block, plugin.view.node(editor, { 
      data: block.data, 
      value: block.value 
    }));

    const line = editor.output.blocks.findIndex(b => b? b.id === block.id : undefined);

    if(typeof line !== 'undefined') {
      editor.dom.blocksContainer?.insertBefore(node, editor.dom.blocksContainer.childNodes[line]);
    } else {
      editor.dom.blocksContainer?.appendChild(node);
    }

    StyleManager.append(editor, plugin.styles?.(editor, block));
    Block.focus(editor, block.id);
    plugin.onRender?.(editor, block);
  }

  private static garbageCollector(blocks: EditorBlock[]) {
    const DOMBlocks = document.querySelectorAll('.pulsar-editor-block');
    
    DOMBlocks.forEach(domblock => {
      const blockid = (domblock as HTMLElement).dataset.blockId;
      
      if(!blockid) return;
      
      const block = blocks.find(b => b? b.id === blockid : undefined);
      if(!block || block.editorData.isDeleted) {
        domblock.remove();
      }
    });
  }
}