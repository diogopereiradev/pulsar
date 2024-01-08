import { EditorBlock } from "./Block"
import { EditorCleanOutput, EditorOutput } from "./Output"
import { PluginInstance } from "./Plugin"

export interface EditorOptions {
  holder: string,
  theme: EditorThemeColors,
  editable?: boolean,
  messages: {
    [key: string]: string
  },
  plugins: PluginInstance[]
}

export interface EditorInstance {
  output: EditorOutput,
  getOutput(): EditorCleanOutput,
  theme: EditorThemeColors,
  editable: boolean,
  messages: {
    [key: string]: string
  },
  selection: {
    offset: number,
    node?: HTMLElement,
    text?: string,
    selectedBlocks?: string[],
    selectionBox: {
      isDragging: boolean,
      isMoving: boolean,
      range: {
        start: { x: number, y: number },
        end: { x: number, y: number }
      }
    }
  },
  toolbar: {
    currentBlock: string
  }
  dom: {
    editorStyles: HTMLStyleElement | undefined,
    blocksContainer: HTMLElement | undefined
  },
  view: {
    styles: {
      time: number,
      chunks: EditorStyles[]
    },
    currentSelectedBlock?: string,
    currentSelectedBlockDOM?: HTMLElement,
    currentLine?: number,
    currentSelectedInputPos?: number,
    keysPressed?: { [key: string]: boolean }
  },
  plugins: PluginInstance[],
  commands: {
    addBlockAt(blockname: string, options: Partial<EditorCommandBlockOptions> & { line: number }): void,
    setBlock(blockname: string, options?: EditorCommandBlockOptions): void,
    moveBlockUp(blockid: string): void,
    moveBlockDown(blockid: string): void,
    focusBlock(blockid: string): void,
    focusNextBlock(): void,
    focusPreviousBlock(): void,
    focusInput(inputid: string): void,
    focusNextInput(): void,
    focusPreviousInput(): void
  }
}

export type EditorThemeColors = {
  text: string | Ref<string>,
  primary: string | Ref<string>,
  secondary: string | Ref<string>
}

export type EditorStyles = {
  id: string,
  css(editor: EditorInstance): string
};

export type EditorCommandBlockOptions = {
  value?: string | string[],
  data?: {
    [key: string]: unknown
  }
};