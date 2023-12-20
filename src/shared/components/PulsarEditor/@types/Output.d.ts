import { EditorBlock } from "./Block";

export interface EditorOutput {
  time: number,
  blocks: EditorBlock[]
}

export interface EditorCleanOutput {
  time: number,
  blocks: Omit<EditorBlock, 'id', 'editorData'>[]
}