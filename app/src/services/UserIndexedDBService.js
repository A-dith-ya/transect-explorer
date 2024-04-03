import getIndexedDatabase from "./IndexedDatabase";

/**
 * Stores all groups
 * @param {string} userId
 * @param {{userGroups: {id: number, groupName: string, createdAt: string}[], leaderGroups: {id: number, groupName: string, createdAt: string}[]}} data
 */
const storeUserGroups = async (userId, data) => {
  try {
    const db = await getIndexedDatabase();
    await db.put("users", data, userId);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves all groups
 * @param {string} userId
 * @returns {{userGroups: {id: number, groupName: string, createdAt: string}[], leaderGroups: {id: number, groupName: string, createdAt: string}[]}}
 */
const getUserGroups = async (userId) => {
  try {
    const db = await getIndexedDatabase();
    const data = await db.get("users", userId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { storeUserGroups, getUserGroups };
