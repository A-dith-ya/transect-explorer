import { openDB } from "idb";

const getIndexedDatabase = async () => {
  // Create a new IndexedDB database
  return openDB("transectExplorerDatabase", 1, {
    upgrade(db) {
      db.createObjectStore("users");
      db.createObjectStore("groups");
      db.createObjectStore("transects");
    },
  });
};

export default getIndexedDatabase;
