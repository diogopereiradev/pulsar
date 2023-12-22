import { EditorInstance } from '../@types/Editor';
import { PluginInstance, PluginOptions } from '../@types/Plugin';
import { NodeView } from './NodeView';

export class Plugin {
  static create(options: PluginOptions): PluginInstance {
    return {
      name: options.name,
      view: {
        schema: (editor: EditorInstance) => options.addView(editor),
        node: (editor: EditorInstance) => NodeView(options.addView(editor))
      },
      shortcuts: options.addShortcuts?.(),
      onRender: options.addOnRender,
      onSelected: options.addOnSelected,
      onUnselected: options.addOnUnselected
    }
  }
}