import { EditorInstance } from '../../@types/Editor';
import { createVNode, render } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BlocksMenu } from './menus/BlocksMenu';
import { ActionsMenu } from './menus/ActionsMenu';

export class BlockToolbar {
  static create(editor: EditorInstance): HTMLElement {
    const toolbar = document.createElement('div');
    const buttonsContainer = document.createElement('div');
    const createBlocksButton = this.createBlocksButton(editor);
    const blockOptionsButton = this.blockOptionsButton(editor);

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

  private static createBlocksButton(editor: EditorInstance) {
    const container = document.createElement('div');
    const button = document.createElement('button');
    const node = createVNode(h(FontAwesomeIcon, { icon: 'fa-solid fa-plus' }));

    const blocksMenu = new BlocksMenu();
    const blocksMenuNode = blocksMenu.create(editor);

    render(node, button);
    button.classList.add('pulsar-editor-toolbar-createblocks-button');
    button.onclick = () => {
      blocksMenu.toggle();
    };

    container.appendChild(button);
    container.appendChild(blocksMenuNode);

    return container;
  }

  private static blockOptionsButton(editor: EditorInstance) {
    const container = document.createElement('div');
    const button = document.createElement('button');
    const node = createVNode(h('div', [
      Array.from({ length: 2 }).map(() => h(FontAwesomeIcon, { icon: 'fa-solid fa-ellipsis-vertical' }))
    ]));

    const actionsMenu = new ActionsMenu();
    const actionsMenuNode = actionsMenu.create(editor);

    render(node, button);
    button.classList.add('pulsar-editor-toolbar-blockoptions-button');
    button.onclick = () => {
      actionsMenu.toggle();
    }

    container.appendChild(button);
    container.appendChild(actionsMenuNode);

    return container;
  }
}