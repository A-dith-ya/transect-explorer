import getIndexedDatabase from "./IndexedDatabase";

/**
 * Creates a new user transect
 * @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]} data
 */
const createUserTransect = async (transect) => {
  try {
    const db = await getIndexedDatabase();
    await db.put("transects", transect);
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

/**
 * Retrieves all user transects
 * @returns @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]}
 */
const getAllUserTransects = async () => {
  try {
    const db = await getIndexedDatabase();
    const transects = await db.getAll("transects");
    const userTransects = transects.filter(
      (transect) =>
        transect.userCreatorId === Number(sessionStorage.getItem("id"))
    );
    return userTransects;
  } catch (error) {
    console.log(error);
  }
};

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

export {
  createUserTransect,
  getTransect,
  getAllUserTransects,
  storeUserTransects,
};
