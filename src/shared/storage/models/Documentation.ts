import { Status } from "~/@types/status";
import { dbConnect } from "..";

export type IDocumentation = {
  id: number,
  title: string,
  navigationTitle: string,
  navigationSubTitle: string,
  indexesTableTitle: string,
  description: string,
  categories: IDocumentationCategory[],
  pages: IDocumentationPage[],
  colors: IDocumentationColorPalette,
  features: {
    autoSave: boolean,
    indexesTable: boolean
  },
  createdAt: number
};

export type IDocumentationCategory = {
  id: number,
  label: string
};

export type IDocumentationPage = {
  id: number,
  categoryId: number,
  title: string,
  content: string,
  children: Omit<IDocumentationPage, 'children'>[],
  lastUpdateAt: number,
  createdAt: number
};

export type IDocumentationColorPalette = {
  background: string,
  primary: string,
  secondary: string,
  navbarTitle: string,
  text: string,
  divider: string,
  codeBlockText: string,
  codeBlockVariable: string,
  codeBlockLiteral: string,
  codeBlockKeyword: string,
  codeBlockString: string,
  codeBlockSection: string,
  codeBlockComments: string
}

export const documentationDataEmptyObj: IDocumentation = {
  id: 0,
  title: '',
  navigationTitle: '',
  navigationSubTitle: '',
  indexesTableTitle: '',
  description: '',
  categories: [],
  pages: [],
  colors: {
    background: '#151829',
    primary: '#7665d7',
    secondary: '#1a1d2e',
    text: '#d3d3d3',
    navbarTitle: '#d3d3d3',
    divider: '#2b304a',
    codeBlockText: '#d3d3d3',
    codeBlockVariable: '#F98181',
    codeBlockLiteral: '#9a66dd',
    codeBlockKeyword: '#896db6',
    codeBlockString: '#B9F18D',
    codeBlockSection: '#86d667',
    codeBlockComments: '#616161'
  },
  features: {
    autoSave: true,
    indexesTable: true
  },
  createdAt: 0
};

export class Documentation {
  static TABLE_NAME: string = 'documentations';

  private static async withStore(mode: IDBTransactionMode, callback: (store: IDBObjectStore) => void): Promise<Status> {
    return new Promise((resolve, reject) => {
      dbConnect((db) => {
        const transaction = db.transaction([this.TABLE_NAME], mode);
        const store = transaction.objectStore(this.TABLE_NAME);
        callback(store);

        transaction.oncomplete = () => resolve(Status.OK);
        transaction.onerror = () => reject(Status.ERROR);
      });
    });
  }

  static async create(payload: IDocumentation): Promise<Status> {
    return this.withStore('readwrite', (store) => {
      store.add(payload);
    });
  }

  static async edit(id: number, payload: Partial<IDocumentation>): Promise<Status> {
    const oldDoc = await this.get(id);

    if (!oldDoc) {
      return Status.ERROR;
    }

    return this.withStore('readwrite', (store) => {
      store.put({
        ...oldDoc,
        ...payload,
      });
    });
  }

  static async delete(id: number): Promise<Status> {
    return this.withStore('readwrite', (store) => {
      store.delete(id);
    });
  }

  static async get(id: number): Promise<IDocumentation | undefined> {
    return new Promise((resolve, reject) => {
      this.withStore('readonly', (store) => {
        const request = store.get(id);

        request.onsuccess = (ev) => {
          const result: IDocumentation = request.result;
          resolve(result);
        };
        request.onerror = (ev) => {
          reject(undefined);
        };
      });
    });
  }

  static async getAll(): Promise<IDocumentation[] | undefined> {
    return new Promise((resolve, reject) => {
      this.withStore('readonly', store => {
        const request = store.getAll();

        request.onerror = (ev) => {
          reject(undefined);
        }

        request.onsuccess = (ev) => {
          const result: IDocumentation[] = request.result;
          resolve(result);
        } 
      });
    });
  }
}