import { ref } from 'vue';
import { EditorInstance } from '../../../../@types/Editor';
import { createVNode, render } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { PluginInstance, PluginMenuAction } from '../../../../@types/Plugin';
import { EditorBlock } from '../../../../@types/Block';
import { defaultActions } from './defaultActions';
import { Block } from '../../../Block';

type State = {
  editor: EditorInstance | undefined,
  isOpen: boolean,
  currentPlugin?: PluginInstance,
  currentBlock?: EditorBlock,
  search: string
};

export class ActionsMenu {
  private _state = ref<State>({
    editor: undefined,
    isOpen: false,
    currentPlugin: undefined,
    currentBlock: undefined,
    search: ''
  });

  create(editor: EditorInstance) {
    // @ts-expect-error
    this._state.value.editor = editor;

    const menu = document.createElement('div');
    const itemsContainer = document.createElement('div');
    const searchbar = this.searchBar(editor);

    menu.classList.add('pe--tb--actionsmenu');
    menu.appendChild(searchbar);
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

      const dfltActions = defaultActions(editor).map(action => this.menuItem(editor, action, this._state.value.currentBlock!));
      const actions = plugin?.menuActions?.map(action => this.menuItem(editor, action, block)).concat(dfltActions);

      actions && (itemsContainer.innerHTML = '');
      actions && itemsContainer.append(...actions);
      this._state.value.currentPlugin = plugin;
      this._state.value.currentBlock = block;
    });

    watch(() => this._state.value.search, (search) => {
      const dfltActions = defaultActions(editor).map(action => this.menuItem(editor, action, this._state.value.currentBlock!));
      const actions = this._state.value.currentPlugin?.menuActions?.map(action => {
        return this.menuItem(editor, action, this._state.value.currentBlock!);
      }).concat(dfltActions);

      if(!actions) return;

      if(search === '') {
        itemsContainer.innerHTML = '';
        itemsContainer.append(...actions);
      } else {
        const filteredActions = actions.filter(action => {
          const name = action.querySelector('.pe--tb--actionsmenu--item--text')?.textContent?.toLowerCase() || '';
          if(name.match(search.toLowerCase())) return action;
        });
        itemsContainer.innerHTML = '';
        itemsContainer.append(...filteredActions);
      }

      if(itemsContainer.childNodes.length === 0) {
        itemsContainer.innerHTML = '';
        itemsContainer.append(this.notFoundMessage(editor));
      }
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
    nextTick(() => {
      this._state.value.isOpen = true;
      Block.select(this._state.value.editor!, this._state.value.currentBlock?.id || '');
    }).then(() => {
      const input = document.querySelector<HTMLInputElement>('.pe--tb--actionsmenu--search--input');
      if(!input) return;
      input.focus();
    });
  }

  close() {
    this._state.value.isOpen = false;
  }

  toggle() {
    nextTick(() => {
      this._state.value.isOpen = !this._state.value.isOpen;
      Block.select(this._state.value.editor!, this._state.value.currentBlock?.id || '');
    }).then(() => {
      const input = document.querySelector<HTMLInputElement>('.pe--tb--actionsmenu--search--input');
      if(!input) return;
      input.focus();
    });
  }

  isOpen() {
    return this._state.value.isOpen;
  }

  private searchBar(editor: EditorInstance): HTMLElement {
    const container = document.createElement('div');
    const input = document.createElement('input');
    const icon = document.createElement('div');
    const iconNode = createVNode(h(FontAwesomeIcon, { icon: 'fa-solid fa-magnifying-glass' }));
    
    container.classList.add('pe--tb--actionsmenu--search');

    render(iconNode, icon);
    icon.classList.add('pe--tb--actionsmenu--search--icon');
    
    input.classList.add('pe--tb--actionsmenu--search--input');
    input.setAttribute('placeholder', editor.messages.searchbar_actionsmenu_placeholder);
    input.oninput = (ev) => {
      const val = (ev.target as HTMLInputElement).value;
      this._state.value.search = val;
    }

    container.appendChild(icon);
    container.appendChild(input);

    return container;
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

  private isMenu(el: HTMLElement | undefined): boolean {
    if(!el) return false;
    if(el.classList.contains('pe--tb--actionsmenu--item')) return true;
    
    if(el.classList.contains('pe--tb--actionsmenu')) {
      return true;
    } else {
      const block = this.isMenu(el.parentElement!);
      return block? true : false;
    }
  }

  private notFoundMessage(editor: EditorInstance) {
    const container = document.createElement('div');
    const text = document.createElement('p');

    text.classList.add('pe--tb--actionsmenu-notfound-message')
    text.textContent = editor.messages.notfound;

    container.classList.add('pe--tb--actionsmenu--notfound--container');
    container.appendChild(text);

    return container;
  }
}