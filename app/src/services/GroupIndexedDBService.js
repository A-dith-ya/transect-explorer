import getIndexedDatabase from "./IndexedDatabase";

/**
 * Stores group details
 * @param {string} groupId
 * @param {{id: number, groupName: string, groupLeaderId: number, groupUserEmails: string[], groupUserNames: string[]}} data
 */
const storeGroup = async (groupId, group) => {
  try {
    const db = await getIndexedDatabase();
    await db.put("groups", group, groupId);
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
    const group = await db.get("groups", groupId);
    return group;
  } catch (error) {
    console.log(error);
  }
};

export { storeGroup, getGroup };
