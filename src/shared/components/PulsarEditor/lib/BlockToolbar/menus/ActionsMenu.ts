import { EditorInstance } from '../../../@types/Editor';
import { createVNode, render } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { PluginMenuAction } from '../../../@types/Plugin';
import { EditorBlock } from '../../../@types/Block';

type State = {
  isOpen: boolean
};

export class ActionsMenu {
  private _state = ref<State>({
    isOpen: false
  });

  create(editor: EditorInstance) {
    const menu = document.createElement('div');
    const itemsContainer = document.createElement('div');

    menu.classList.add('pe--tb--actionsmenu');
    menu.appendChild(itemsContainer);

    window.addEventListener('click', (ev) => {
      const target = (ev.target) as HTMLElement;
      const isMenu = this.isMenu(target);

      if(!menu.classList.contains('pe--tb--actionsmenu--opening') && this._state.value.isOpen && !isMenu) {
        this._state.value.isOpen = false;
      }
    });

    watch(() => editor.toolbar.currentBlock, blockId => {
      const block = editor.output.blocks.find(b => b.id === blockId);
      const plugin = editor.plugins.find(p => p.name === block?.type);

      if(!block || !plugin) return;

      if(!editor.toolbar.currentBlock) {
        console.error('[PulsarEditor][ActionsMenu] Invalid toolbar selected block');
        return;
      }

      const items = plugin?.menuActions?.map(action => this.menuItem(editor, action, block));

      items && (itemsContainer.innerHTML = '');
      items && itemsContainer.append(...items);
    });

    watch(() => this._state.value.isOpen, (isOpen) => {
      if(isOpen) {
        menu.classList.add('pe--tb--actionsmenu--opening');
        menu.classList.add('pe--tb--actionsmenu--open');

        setTimeout(() => {
          menu.classList.remove('pe--tb--actionsmenu--opening');
        }, 100);
      } else {
        menu.classList.remove('pe--tb--actionsmenu--open');
      }
    });

    return menu;
  }

  open() {
    this._state.value.isOpen = true;
  }

  close() {
    this._state.value.isOpen = false;
  }

  toggle() {
    this._state.value.isOpen = !this._state.value.isOpen;
  }

  private menuItem(editor: EditorInstance, action: PluginMenuAction, block: EditorBlock): HTMLButtonElement {
    const item = document.createElement('button');
    const text = document.createElement('span');
    const icon = document.createElement('div');
    const iconNode = createVNode(h(FontAwesomeIcon, { icon: action.icon }));

    item.classList.add('pe--tb--actionsmenu--item');
    item.onclick = () => {
      action.run(editor, block);
    }

    icon.classList.add('pe--tb--actionsmenu--item--icon');
    render(iconNode, icon);
    
    text.classList.add('pe--tb--actionsmenu--item--text');
    text.textContent = action.name;

    item.appendChild(icon);
    item.appendChild(text);

    return item;
  }

  isMenu(el: HTMLElement | undefined): boolean {
    if(!el) return false;
    if(el.classList.contains('pe--tb--actionsmenu--item')) return true;
    
    if(el.classList.contains('pe--tb--actionsmenu')) {
      return true;
    } else {
      const block = this.isMenu(el.parentElement!);
      return block? true : false;
    }
  }
}