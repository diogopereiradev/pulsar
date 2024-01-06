import { EditorInstance } from '../../@types/Editor';
import { createVNode, render } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export class BlockToolbar {
  static create(editor: EditorInstance): HTMLElement {
    const toolbar = document.createElement('div');
    const buttonsContainer = document.createElement('div');
    const createBlocksButton = this.createBlocksButton();
    const blockOptionsButton = this.blockOptionsButton();

    toolbar.classList.add('pulsar-editor-blocks-toolbar');

    buttonsContainer.classList.add('pulsar-editor-blocks-toolbar-buttons')
    buttonsContainer.appendChild(createBlocksButton);
    buttonsContainer.appendChild(blockOptionsButton);

    toolbar.appendChild(buttonsContainer);

    return toolbar;
  }

  static moveToBlock(editor: EditorInstance, blockid: string) {
    const buttonsContainer = document.querySelector<HTMLDivElement>('.pulsar-editor-blocks-toolbar-buttons');
    const blockDom = editor.dom.blocksContainer?.querySelector(`[data-block-id="${blockid}"]`);
    const blockRect = blockDom?.getBoundingClientRect();
    const buttonsRect = buttonsContainer?.getBoundingClientRect();
    const blockTopPos = blockRect?.top;
    const buttonsTopPos = buttonsRect?.top;

    const posDiff = (blockTopPos as number) - (buttonsTopPos as number);
    const newPos = posDiff + (buttonsTopPos as number);

    buttonsContainer!.style.top = `${newPos}px`;
    editor.toolbar.currentBlock = blockid;
  }

  private static createBlocksButton() {
    const button = document.createElement('button');
    const node = createVNode(h(FontAwesomeIcon, { icon: 'fa-solid fa-plus' }));

    render(node, button);
    button.classList.add('pulsar-editor-toolbar-createblocks-button');
    return button;
  }

  private static blockOptionsButton() {
    const button = document.createElement('button');
    const node = createVNode(h('div', [
      Array.from({ length: 2 }).map(() => h(FontAwesomeIcon, { icon: 'fa-solid fa-ellipsis-vertical' }))
    ]));

    render(node, button);
    button.classList.add('pulsar-editor-toolbar-blockoptions-button');
    return button;
  }
}