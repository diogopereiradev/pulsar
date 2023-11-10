import { IOldDocumentation } from "../@types/OldDocumentation";
import { Status } from "~/@types/status";
import { dbConnect } from "..";

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

  static async clear(): Promise<Status> {
    return this.withStore('readwrite', (store) => {
      store.clear();
    });
  }

  static async getAll(): Promise<IOldDocumentation[] | undefined> {
    return new Promise((resolve, reject) => {
      this.withStore('readonly', store => {
        const request = store.getAll();

        request.onerror = (ev) => {
          reject(undefined);
        }

        request.onsuccess = (ev) => {
          const result: IOldDocumentation[] = request.result;
          resolve(result);
        } 
      });
    });
  }
}