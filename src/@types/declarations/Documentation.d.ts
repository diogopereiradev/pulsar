export type IDocumentation = {
  id: string,
  title: string,
  description: string,
  messages: {
    navigationTitle: string,
    navigationSubTitle: string,
    indexesTableTitle: string
  },
  colors: IDocumentationColorPalette,
  categories: IDocumentationCategory[],
  pages: IDocumentationPage[],
  customizations: IDocumentationCustomization[],
  features: {
    autoSave: boolean,
    indexesTable: boolean
  },
  isPublic: boolean,
  updatedAt: string,
  createdAt: string,
  authorIdentifier: string
};

export type IDocumentationCategory = {
  id: number,
  label: string
};

export type IDocumentationPage = {
  id: string,
  categoryId: number,
  title: string
};

export type IDocumentationColorPalette = {
  background: string,
  primary: string,
  secondary: string,
  text: string,
  divider: string,
  scrollbar: string,
  codeBlockText: string,
  codeBlockVariable: string,
  codeBlockLiteral: string,
  codeBlockKeyword: string,
  codeBlockString: string,
  codeBlockSection: string,
  codeBlockComments: string
};

export type IDocumentationCustomization = {
  id: number,
  title: string,
  region: 'top' | 'bottom'
};