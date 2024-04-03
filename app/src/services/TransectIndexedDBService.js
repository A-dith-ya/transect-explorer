import getIndexedDatabase from "./IndexedDatabase";

/**
 * Stores user transects
 * @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]} data
 */
const storeUserTransects = async (transects) => {
  try {
    const db = await getIndexedDatabase();
    transects.forEach(async (transect) => {
      await db.put("transects", transect, transect.id);
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves transect details
 * @param {string} transectId
 * @returns @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}}
 */
const getTransect = async (transectId) => {
  try {
    const db = await getIndexedDatabase();
    const transects = await db.get("transects", transectId);
    return transects;
  } catch (error) {
    console.log(error);
  }
};

export { storeUserTransects, getTransect };
