export type IOldDocumentation = {
  id: number,
  title: string,
  navigationTitle: string,
  navigationSubTitle: string,
  indexesTableTitle: string,
  description: string,
  categories: IDocumentationCategory[],
  pages: IDocumentationPage[],
  colors: IDocumentationColorPalette,
  customizations: IDocumentationCustomization[],
  features: {
    autoSave: boolean,
    indexesTable: boolean
  },
  createdAt: number
};

export type IOldDocumentationCategory = {
  id: number,
  label: string
};

export type IOldDocumentationPage = {
  id: number,
  categoryId: number,
  title: string,
  content: string,
  createdAt: number
};

export type IOldDocumentationColorPalette = {
  background: string,
  primary: string,
  secondary: string,
  text: string,
  divider: string,
  codeBlockText: string,
  codeBlockVariable: string,
  codeBlockLiteral: string,
  codeBlockKeyword: string,
  codeBlockString: string,
  codeBlockSection: string,
  codeBlockComments: string
};

export type IOldDocumentationCustomization = {
  id: number,
  title: string,
  region: 'top' | 'bottom',
  content: {
    html: string,
    css: string,
    javascript: string
  }
};