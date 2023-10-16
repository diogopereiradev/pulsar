import { Status } from "~/@types/status";

const DATABASE_NAME = 'pulsar';
const DATABASE_VERSION = 4;

export async function dbConnect(callback: (db: IDBDatabase) => void): Promise<Status> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

    request.onsuccess = (ev: Event) => {
      const db = (ev as unknown as { target: { result: IDBDatabase } }).target.result;
      callback(db);
      resolve(Status.OK);
    };

    request.onerror = (ev: Event) => {
      console.error('Unable to access IndexedDB API');
      reject(Status.ERROR);
    };
  });
}

export function dbUpgradeNeeded() {
  const request = window.indexedDB.open(DATABASE_NAME, DATABASE_VERSION);

  request.onupgradeneeded = (ev) => {
    const db = (ev as unknown as { target: { result: IDBDatabase } }).target.result;
    const documentationsStore = db.createObjectStore('documentations', { keyPath: 'id', autoIncrement: true });

    documentationsStore.createIndex('id', 'id', { unique: true });
    documentationsStore.createIndex('title', 'title', { unique: false });
    documentationsStore.createIndex('navigationTitle', 'navigationTitle', { unique: false });
    documentationsStore.createIndex('navigationSubTitle', 'navigationSubTitle', { unique: false });
    documentationsStore.createIndex('indexesTableTitle', 'indexesTableTitle', { unique: false });
    documentationsStore.createIndex('description', 'description', { unique: false });
    documentationsStore.createIndex('categories', 'categories', { unique: false });
    documentationsStore.createIndex('pages', 'pages', { unique: false });
    documentationsStore.createIndex('colors', 'colors', { unique: false });
    documentationsStore.createIndex('customizations', 'customizations', { unique: false });
    documentationsStore.createIndex('features', 'features', { unique: false });
    documentationsStore.createIndex('createdAt', 'createdAt', { unique: false });
  };
}