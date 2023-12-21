import { PluginInstance, PluginOptions } from '../@types/Plugin';
import { NodeView } from './NodeView';

export class Plugin {
  static create(options: PluginOptions): PluginInstance {
    return {
      name: options.name,
      view: {
        schema: options.addView(),
        node: NodeView(options.addView())
      },
      shortcuts: options.addShortcuts(),
      onRender: options.addOnRender,
      onSelected: options.addOnSelected,
      onUnselected: options.addOnUnselected
    }
  }
}