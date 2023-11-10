import { IDocumentation } from '~/@types/declarations/Documentation';

const defaultColors = {
  background: '#0a0a14',
  primary: '#7665d7',
  secondary: '#18182e',
  text: '#d3d3d3',
  divider: '#2b304a',
  codeBlockText: '#d3d3d3',
  codeBlockVariable: '#F98181',
  codeBlockLiteral: '#db6f3d',
  codeBlockKeyword: '#9e5fd9',
  codeBlockString: '#B9F18D',
  codeBlockSection: '#70c25b',
  codeBlockComments: '#616161'
};

export const documentationDataEmptyObj: IDocumentation = {
  id: '',
  title: '',
  description: '',
  messages: {
    navigationTitle: '',
    navigationSubTitle: '',
    indexesTableTitle: ''
  },
  colors: defaultColors,
  categories: [],
  pages: [],
  customizations: [],
  features: {
    autoSave: true,
    indexesTable: true
  },
  isPublic: false,
  createdAt: '',
  updatedAt: '',
  authorIdentifier: ''
};