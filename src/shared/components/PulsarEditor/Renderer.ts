import { watch } from 'vue';
import { EditorBlock } from './@types/Block';
import { EditorInstance } from './@types/Editor';

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

    const blockContainer = document.createElement('div');
    const blockContentContainer = document.createElement('div');

    blockContainer.classList.add('pulsar-editor-block');
    blockContentContainer.classList.add('pulsar-editor-block-content')
    blockContentContainer.appendChild(plugin.view.node(editor));
    
    blockContainer.appendChild(blockContentContainer);

    const line = editor.output.blocks.findIndex(b => b.id === block.id);

    if(line > 0) {
      editor.dom.blocksContainer?.children[line].insertAdjacentElement('afterend', plugin.view.node(editor));
    } else {
      editor.dom.blocksContainer?.appendChild(plugin.view.node(editor));
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