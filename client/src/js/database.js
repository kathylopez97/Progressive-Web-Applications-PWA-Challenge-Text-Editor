import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// method to accepts and saved to the database

export const putDb = async (content) => {
  console.log('PUT to the database');
  const jatetextDb = await openDB('jate', 1);
  const tx = jatetextDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id : 1 ,value: content });

  const result = await request;
  console.log('Data saved to the database', result);
}

// method to  gets all content to the database
export const getDb = async () => {
  console.log(' Get all Database');
  const jatetextDb = await openDB('jate', 1);
  const tx = jatetextDb.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll(1);


  const result = await request;
  console.log('result.value', result);
  return result.value;
}


initdb();
