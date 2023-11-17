export type WriteStreamBody = {
  type: 'page' | 'customization',
  docId: string,
  id: string,
  content: string
};