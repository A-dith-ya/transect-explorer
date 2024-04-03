import { openDB } from "idb";

const getIndexedDatabase = async () => {
  // Create a new IndexedDB database
  return openDB("transectExplorerDatabase", 1, {
    upgrade(db) {
      db.createObjectStore("users", { keyPath: "id", autoIncrement: true });
      db.createObjectStore("groups", { keyPath: "id", autoIncrement: true });
      const transectStore = db.createObjectStore("transects", {
        keyPath: "id",
        autoIncrement: true,
      });
      transectStore.createIndex("userCreatorId", "userCreatorId", {
        unique: false,
      });
    },
  });
};

export default getIndexedDatabase;
