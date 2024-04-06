import { openDB } from "idb";

const getIndexedDatabase = async () => {
  // Create a new IndexedDB database
  return openDB("transectExplorerDatabase", 1, {
    upgrade(db) {
      db.createObjectStore("users", { keyPath: "id" });
      db.createObjectStore("groups", { keyPath: "id" });
      const transectStore = db.createObjectStore("transects", {
        keyPath: "id",
        autoIncrement: true,
      });
      transectStore.createIndex("userCreatorId", "userCreatorId", {
        unique: false,
      });
      db.createObjectStore("deletedTransects", { keyPath: "id" });
    },
  });
};

export default getIndexedDatabase;
