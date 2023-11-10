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