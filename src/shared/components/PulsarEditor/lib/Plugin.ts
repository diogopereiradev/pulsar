import { PluginConfig, PluginInstance, PluginOptions } from '../@types/Plugin';
import { NodeView } from './NodeView';

export class Plugin {
  private static configure(options: PluginConfig, pluginOptions: PluginOptions): PluginInstance {
    return {
      name: pluginOptions.name,
      menuName: options.menuName,
      menuIcon: options.menuIcon,
      menuActions: options.menuActions,
      type: pluginOptions.type,
      view: {
        schema: (editor, op) => pluginOptions.addView(editor, op),
        node: (editor, op) => NodeView(pluginOptions.addView(editor, op))
      },
      shortcuts: pluginOptions.addShortcuts?.(),
      storage: options.storage || pluginOptions.addStorage?.(),
      styles: pluginOptions.addStyles,
      onCopy: pluginOptions.addOnCopy,
      onRender: pluginOptions.addOnRender,
      onSelected: pluginOptions.addOnSelected,
      onUnselected: pluginOptions.addOnUnselected
    }
  }

  static create(options: PluginOptions): { configure: (options: PluginConfig) => PluginInstance } {
    return {
      configure: (config: PluginConfig) => this.configure(config, options)
    }
  }
}