import { EditorBlock } from './Block';
import { EditorInstance } from './Editor';

export interface PluginOptions {
  name: string,
  addView(editor: EditorInstance): PluginView,
  addStorage?(): PluginStorage,
  addShortcuts?(): PluginShortcut,
  addOnSelected?(editor: EditorInstance, block: EditorBlock): void,
  addOnUnselected?(editor: EditorInstance, block: EditorBlock): void,
  addOnRender?(editor: EditorInstance, block: EditorBlock): void
}

export interface PluginInstance {
  name: string,
  view: {
    schema: (editor: EditorInstance) => PluginView,
    node: (editor: EditorInstance) => HTMLElement
  },
  shortcuts?: PluginShortcut,
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
  'tr';