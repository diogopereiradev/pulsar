import { EditorInstance } from '../../../@types/Editor';
import { createVNode, render } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { PluginInstance } from '../../../@types/Plugin';

type State = {
  isOpen: boolean,
  search: string
};

export class BlocksMenu {
  private _state = ref<State>({
    isOpen: false,
    search: ''
  });

  create(editor: EditorInstance) {
    const menu = document.createElement('div');
    const itemsContainer = document.createElement('div');
    const searchbar = this.searchBar(editor);

    menu.classList.add('pe--tb--blocksmenu');
    menu.appendChild(searchbar);

    itemsContainer.classList.add('pe--tb--blocksmenu--items--container');
    itemsContainer.append(...editor.plugins.map(p => this.menuItem(editor, p)));

    menu.appendChild(itemsContainer);

    watch(() => this._state.value.isOpen, (isOpen) => {
      if(isOpen) {
        menu.classList.add('pe--tb--blocksmenu--opening');
        menu.classList.add('pe--tb--blocksmenu--open');

        setTimeout(() => {
          menu.classList.remove('pe--tb--blocksmenu--opening');
        }, 100);
      } else {
        menu.classList.remove('pe--tb--blocksmenu--open');
      }
    });

    watch(() => this._state.value.search, (search) => {
      if(search === '') {
        itemsContainer.innerHTML = '';
        itemsContainer.append(...editor.plugins.map(p => this.menuItem(editor, p)));
      } else {
        const filteredItems = editor.plugins.map(p => this.menuItem(editor, p)).filter(item => {
          const name = item.querySelector('.pe--tb--blocksmenu--item--text')?.textContent?.toLowerCase() || '';
          if(name.match(search.toLowerCase())) return item;
        });
        itemsContainer.innerHTML = '';
        itemsContainer.append(...filteredItems);
      }

      if(itemsContainer.childNodes.length === 0) {
        itemsContainer.innerHTML = '';
        itemsContainer.append(this.notFoundMessage(editor));
      }
    });

    window.addEventListener('click', (ev) => {
      const target = (ev.target) as HTMLElement;
      const isMenu = this.isMenu(target);

      if(!menu.classList.contains('pe--tb--blocksmenu--opening') && this._state.value.isOpen && !isMenu) {
        this._state.value.isOpen = false;
      }
    });

    return menu;
  }

  open() {
    nextTick(() => {
      this._state.value.isOpen = true;
    }).then(() => {
      const input = document.querySelector<HTMLInputElement>('.pe--tb--blocksmenu--search--input');
      
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
    }).then(() => {
      if(!this._state.value.isOpen) return;
      const input = document.querySelector<HTMLInputElement>('.pe--tb--blocksmenu--search--input');
      
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
    
    container.classList.add('pe--tb--blocksmenu--search');

    render(iconNode, icon);
    icon.classList.add('pe--tb--blocksmenu--search--icon');
    
    input.classList.add('pe--tb--blocksmenu--search--input');
    input.setAttribute('placeholder', editor.messages.searchbar_blocksmenu_placeholder);
    input.oninput = (ev) => {
      const val = (ev.target as HTMLInputElement).value;
      this._state.value.search = val;
    }

    container.appendChild(icon);
    container.appendChild(input);

    return container;
  }

  private menuItem(editor: EditorInstance, plugin: PluginInstance): HTMLButtonElement {
    const item = document.createElement('button');
    const text = document.createElement('span');
    const icon = document.createElement('div');
    const iconNode = createVNode(h(FontAwesomeIcon, { icon: plugin.menuIcon }));

    item.classList.add('pe--tb--blocksmenu--item');
    item.onclick = () => {
      const line = editor.output.blocks.findIndex(b => b.id === editor.toolbar.currentBlock);
      
      if(line !== -1) {
        editor.commands.addBlockAt(plugin.name, { line: line + 1, value: '' });
      }
      this.close();
    };

    icon.classList.add('pe--tb--blocksmenu--item--icon');
    render(iconNode, icon);
    
    text.classList.add('pe--tb--blocksmenu--item--text');
    text.textContent = plugin.menuName;

    item.appendChild(icon);
    item.appendChild(text);

    return item;
  }

  private notFoundMessage(editor: EditorInstance) {
    const container = document.createElement('div');
    const text = document.createElement('p');

    text.classList.add('pe--tb--blocksmenu-notfound-message')
    text.textContent = editor.messages.notfound;

    container.classList.add('pe--tb--blocksmenu--notfound--container');
    container.appendChild(text);

    return container;
  }

  isMenu(el: HTMLElement | undefined): boolean {
    if(!el) return false;
    if(el.classList.contains('pe--tb--blocksmenu--item')) return true;
    
    if(el.classList.contains('pe--tb--blocksmenu')) {
      return true;
    } else {
      const block = this.isMenu(el.parentElement!);
      return block? true : false;
    }
  }
}