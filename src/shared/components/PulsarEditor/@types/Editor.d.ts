import { EditorBlock } from "./Block"
import { EditorCleanOutput, EditorOutput } from "./Output"
import { PluginInstance } from "./Plugin"

export interface EditorOptions {
  /**
   * The id of editor container
  */
  holder: string,
  /**
   * The editor default colors theme
   */
  theme: EditorThemeColors,
  /**
   * default: true
   */
  editable?: boolean,
  plugins: PluginInstance[]
}

export interface EditorInstance {
  output: EditorOutput,
  getOutput(): EditorCleanOutput,
  theme: EditorThemeColors,
  editable: boolean,
  dom: {
    holder: HTMLElement | undefined
  },
  view: {
    currentSelectedBlock?: EditorBlock,
    currentSelectedBlockDOM?: HTMLElement,
    currentLine?: number
  }
  plugins: PluginInstance[],
  commands: {
    addBlockAt(blockname: string, line: number, options?: EditorCommandBlockOptions): void,
    setBlock(blockname: string, options?: EditorCommandBlockOptions): void,
    moveBlockUp(blockid: string): void,
    moveBlockDown(blockid: string): void,
    focusBlock(blockid: string): void,
    focusNextBlock(): void,
    focusPreviousBlock(): void,
    focusNextInputWrappedIn(block: EditorBlock): void,
    focusPreviousInputWrappedIn(block: EditorBlock): void,
    focusNextInput(): void,
    focusPreviousInput(): void
  }
}

export type EditorThemeColors = {
  text: string | Ref<string>,
  primary: string | Ref<string>,
  secondary: string | Ref<string>
}

export type EditorCommandBlockOptions = {
  value?: string | string[],
  data?: {
    [key: string]: unknown
  }
};