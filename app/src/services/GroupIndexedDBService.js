import getIndexedDatabase from "./IndexedDatabase";

/**
 * Stores group details
 * @param {string} groupId
 * @returns {{id: number, groupName: string, groupLeaderId: number, groupUserEmails: string[], groupUserNames: string[]}}
 */
const storeGroup = async (groupId, data) => {
  try {
    const db = await getIndexedDatabase();
    await db.put("groups", data, groupId);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves group details
 * @param {string} groupId
 * @returns {{id: number, groupName: string, groupLeaderId: number, groupUserEmails: string[], groupUserNames: string[]}}
 */
const getGroup = async (groupId) => {
  try {
    const db = await getIndexedDatabase();
    const data = await db.get("groups", groupId);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export { storeGroup, getGroup };
