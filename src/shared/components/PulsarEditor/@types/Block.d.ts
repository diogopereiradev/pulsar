export interface EditorBlock {
  id: string,
  type: string,
  data?: {
    [key: string]: unknown
  },
  value?: string | string[],
  editorData: {
    isDeleted: boolean
  }
}