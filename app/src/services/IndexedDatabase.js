import { openDB } from "idb";

const getIndexedDatabase = async () => {
  // Create a new IndexedDB database
  return openDB("transectExplorerDatabase", 2, {
    upgrade(db) {
      db.createObjectStore("users");
      db.createObjectStore("groups");
    },
  });
};

export default getIndexedDatabase;
