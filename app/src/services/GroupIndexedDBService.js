import getIndexedDatabase from "./IndexedDatabase";

/**
 * Stores all groups
 * @param {string} userId
 * @param {{userGroups: {id: number, groupName: string, createdAt: string}[], leaderGroups: {id: number, groupName: string, createdAt: string}[]}} data
 */
const storeGroups = async (userId, data) => {
  try {
    const db = await getIndexedDatabase();
    await db.put("groups", data, userId);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves all groups
 * @param {string} userId
 * @returns {{userGroups: {id: number, groupName: string, createdAt: string}[], leaderGroups: {id: number, groupName: string, createdAt: string}[]}}
 */
const getGroups = async (userId) => {
  try {
    const db = await getIndexedDatabase();
    const data = await db.get("groups", userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { storeGroups, getGroups };
