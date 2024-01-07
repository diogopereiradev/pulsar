import { EditorInstance } from '../@types/Editor';
import { Block } from '../lib/Block';

export class Selection {
  private static selectionBoxIsMovingTimer: NodeJS.Timeout;

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

  static createSelectionBox(editor: EditorInstance) {
    const box = document.createElement('div');

    box.classList.add('pulsar-editor-selection-box');

    editor.dom.blocksContainer?.addEventListener('mousedown', (ev) => {
      editor.selection.selectionBox.range.start = {
        x: ev.pageX,
        y: ev.pageY
      };
      editor.selection.selectionBox.isDragging = true;
      box.style.opacity = '1';
    });

    window?.addEventListener('mouseup', (ev) => {
      editor.selection.selectionBox.range.start = { x: 0, y: 0 };
      editor.selection.selectionBox.range.end = { x: 0, y: 0 };
      editor.selection.selectionBox.isDragging = false;
      box.style.opacity = '0';
    });

    window?.addEventListener('mousemove', (ev) => {
      if(!editor.selection.selectionBox.isDragging) return;
      editor.selection.selectionBox.range.end = {
        x: ev.pageX,
        y: ev.pageY
      };

      if(this.selectionBoxIsMovingTimer) clearTimeout(this.selectionBoxIsMovingTimer);
      this.selectionBoxIsMovingTimer = setTimeout(() => {
        editor.selection.selectionBox.isMoving = false;
      }, 100);
      window.getSelection()?.removeAllRanges();

      const blocks = document.querySelectorAll('.pulsar-editor-block');
      
      blocks.forEach(block => {
        const rectBlock = block.getBoundingClientRect();
        const rectSelection = box.getBoundingClientRect();
        const blockId = (block as HTMLDivElement).dataset.blockId;

        if (
          rectBlock.left < rectSelection.right &&
          rectBlock.right > rectSelection.left &&
          rectBlock.top < rectSelection.bottom &&
          rectBlock.bottom > rectSelection.top
        ) {
          Block.select(editor, blockId!);
        } else {
          Block.unselect(editor, blockId!);
        }
      });
    });

    watch(() => editor.selection.selectionBox.range, range => {
      const width = range.end.x === 0? 0 : range.start.x - range.end.x;
      const height = range.end.y === 0? 0 : range.start.y - range.end.y;

      // Bottom-Right
      if(width < 0 && height < 0) {
        box.style.transform = 'rotate(0deg)';
      // Top-Left
      } else if(width > 0 && height > 0) {
        box.style.transform = 'rotateX(180deg) rotateY(180deg)';
      // Top-Right
      } else if(width < 0 && height > 0) {
        box.style.transform = 'rotateX(180deg) rotateY(0deg)';
      // Bottom-Left
      } else if(width > 0 && height < 0) {
        box.style.transform = 'rotateX(0deg) rotateY(180deg)';
      }

      box.style.left = `${range.start.x}px`;
      box.style.top = `${range.start.y}px`;
      box.style.width = `${Math.abs(width)}px`;
      box.style.height = `${Math.abs(height)}px`;
    }, { deep: true });

    editor.dom.blocksContainer?.appendChild(box);
  }

  static getRealCaretPos(): number {
    const sel = window.getSelection();

    if(!sel || !sel.anchorNode) return 0;

    const textNodes = Array.from(sel.anchorNode.parentElement!.childNodes.values());
    const currentTextNode = sel.anchorNode;
    const currentTextNodeIndex = textNodes.findIndex(node => node === currentTextNode);

    if(currentTextNodeIndex === -1) return 0;

    let caretPos = 0;
    const nodesBeforeCurrent = textNodes.filter((n, i) => i < currentTextNodeIndex && n);
    
    nodesBeforeCurrent.forEach(n => {
      caretPos += n.textContent?.length || 0;
    });
    caretPos += sel.anchorOffset;

    return caretPos;
  }
}