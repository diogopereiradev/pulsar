import { EditorBlock } from './Block';
import { EditorCommandBlockOptions, EditorInstance, EditorStyles } from './Editor';

export interface PluginOptions {
  name: string,
  type: 'block' | 'text',
  addView(editor: EditorInstance, options: EditorCommandBlockOptions): PluginView,
  addOnCopy?(editor: EditorInstance, block: EditorBlock): string,
  addStyles?(editor: EditorInstance, block: EditorBlock): EditorStyles,
  addStorage?(): PluginStorage,
  addShortcuts?(): PluginShortcut,
  addOnSelected?(editor: EditorInstance, block: EditorBlock): void,
  addOnUnselected?(editor: EditorInstance, block: EditorBlock): void,
  addOnRender?(editor: EditorInstance, block: EditorBlock): void
}

export interface PluginInstance {
  name: string,
  menuName: string,
  menuIcon: string,
  menuActions?: PluginMenuAction[],
  type: 'block' | 'text',
  storage?: PluginStorage,
  view: {
    schema: (editor: EditorInstance, options: EditorCommandBlockOptions) => PluginView,
    node: (editor: EditorInstance, options: EditorCommandBlockOptions) => HTMLElement
  },
  shortcuts?: PluginShortcut,
  styles?(editor: EditorInstance, block: EditorBlock): EditorStyles,
  onCopy?(editor: EditorInstance, block: EditorBlock): string,
  onSelected?(editor: EditorInstance, block: EditorBlock): void,
  onUnselected?(editor: EditorInstance, block: EditorBlock): void,
  onRender?(editor: EditorInstance, block: EditorBlock): void
}

export type PluginView = {
  tag: PluginHTMLTags,
  attributes?: {
    key: string,
    value: string
  }[],
  childs: string | PluginView | PluginView[] | HTMLElement
};

export type PluginStorage = {
  [key: string]: unknown
};

export type PluginShortcut = { 
  [key: string]: (editor: EditorInstance, block: EditorBlock) => void
};

export type PluginConfig = {
  menuName: string,
  menuIcon: string,
  menuActions: PluginMenuAction[],
  storage?: PluginStorage
};

export type PluginMenuAction = {
  name: string,
  icon: string,
  run(editor: EditorInstance, block: EditorBlock): void
};

export type PluginHTMLTags = 
  'p' | 
  'span' |
  'div' | 
  'a' | 
  'button' | 
  'ul' | 
  'ol' | 
  'li' | 
  'pre' | 
  'code' | 
  'h1' | 
  'h2' | 
  'h3' | 
  'h4' | 
  'h5' | 
  'h6' | 
  'video' | 
  'img' | 
  'header' | 
  'nav' | 
  'section' | 
  'article' | 
  'input' | 
  'footer' | 
  'blockquote' | 
  'br' | 
  'b' | 
  'strong' | 
  'style' | 
  'hr' | 
  'cite' | 
  'em' | 
  'i' | 
  'table' | 
  'tbody' | 
  'td' | 
  'textarea' | 
  'tfoot' | 
  'th' | 
  'thead' | 
  'tr' |
  string;