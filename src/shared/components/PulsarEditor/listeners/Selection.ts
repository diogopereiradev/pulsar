import { EditorInstance } from '../@types/Editor';
import { Block } from '../lib/Block';

export class Selection {
  static create(editor: EditorInstance) {
    watch(() => editor.selection.selectedBlocks, selectedblocks => {
      const DOMBlocks = document.querySelectorAll<HTMLElement>('.pulsar-editor-block');
      
      Array.from(DOMBlocks).forEach(DOMBlock => {
        const blockid = DOMBlock.dataset.blockId;
        if(!blockid) return;

        if(selectedblocks?.find(bid => bid === blockid)) {
          Block.select(editor, blockid);
        } else {
          Block.unselect(editor, blockid);
        }
      });
    }, { deep: true });

    document.addEventListener('selectionchange', () => {
      const sel = window.getSelection();

      if(sel && sel.anchorNode?.parentElement?.className.match('pulsar-editor-')) {
        editor.selection.offset = this.getRealCaretPos();
        editor.selection.node = sel.anchorNode as HTMLElement;
        editor.selection.text = sel.toString();
      }
    });
  }

  private static getRealCaretPos(): number | undefined {
    const sel = window.getSelection();

    if(!sel || !sel.anchorNode) return undefined;

    const textNodes = Array.from(sel.anchorNode.parentElement!.childNodes.values());
    const currentTextNode = sel.anchorNode;
    const currentTextNodeIndex = textNodes.findIndex(node => node === currentTextNode);

    if(currentTextNodeIndex === -1) return undefined;

    let caretPos = 0;
    const nodesBeforeCurrent = textNodes.filter((n, i) => i < currentTextNodeIndex && n);
    
    nodesBeforeCurrent.forEach(n => {
      caretPos += n.textContent?.length || 0;
    });
    caretPos += sel.anchorOffset;

    return caretPos;
  }
}