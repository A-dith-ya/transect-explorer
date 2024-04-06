import getIndexedDatabase from "./IndexedDatabase";

let currentId = Number.MAX_SAFE_INTEGER;

/**
 * Creates a new user transect
 * @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]} data
 */
const createUserTransect = async (transect) => {
  try {
    const db = await getIndexedDatabase();
    transect.isCreated = true;
    transect.id = currentId--;
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
    const transects = await db.get("transects", +transectId);
    return transects;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves all user transects
 * @param {number} userId
 * @returns @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]}
 */
const getAllUserTransects = async (userId) => {
  try {
    const db = await getIndexedDatabase();
    const transects = await db.getAll("transects");
    return transects.filter((transect) => transect.userCreatorId === +userId);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves all created user transects
 * @param {number} userId
 * @returns @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]}
 * */
const getCreatedTransects = async (userId) => {
  try {
    const db = await getIndexedDatabase();
    const transects = await db.getAll("transects");
    const filteredTransects = transects.filter(
      (transect) => transect.userCreatorId === +userId && transect.isCreated
    );

    // Delete all transects after filtering
    for (let transect of transects) {
      await db.delete("transects", transect.id);
    }

    return filteredTransects;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves all created user transects
 *  @param {number} userId
 * @returns @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}[]}
 * */
const getUpdatedTransects = async (userId) => {
  try {
    const db = await getIndexedDatabase();
    const transects = await db.getAll("transects");
    const filteredTransects = transects.filter(
      (transect) => transect.userCreatorId === +userId && !transect.isCreated
    );

    for (let transect of transects) {
      await db.delete("transects", transect.id);
    }

    return filteredTransects;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Retrieves all deleted transect ids
 * @returns @param {{id: number}[]}
 */
const getDeletedTransects = async () => {
  try {
    const db = await getIndexedDatabase();
    const deleteTransectIds = await db.getAll("deletedTransects");
    await db.clear("deletedTransects");
    return deleteTransectIds;
  } catch (error) {
    console.log(error);
  }
};

/**
 * Updates user transects
 * @param {{id: number, groupId: number, userCreatorId: number, transectName: string, description: string, location: string, coordinate: string, userCreatorName: string}} formData
 * @param {number} transectId
 */
const updateUserTransect = async (formData, transectId) => {
  try {
    const db = await getIndexedDatabase();
    const transect = await db.get("transects", +transectId);
    const updatedTransect = { ...transect, ...formData };
    updatedTransect.id = +transectId;
    await db.put("transects", updatedTransect);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Deletes user transect
 * @param {number} transectId
 */
const deleteUserTransect = async (transectId) => {
  try {
    const db = await getIndexedDatabase();
    await db.delete("transects", +transectId);
    await db.add("deletedTransects", { id: +transectId });
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
    for (const transect of transects) {
      transect.isCreated = false;
      await db.put("transects", transect);
    }
  } catch (error) {
    console.log(error);
  }
};

export {
  createUserTransect,
  getTransect,
  getAllUserTransects,
  getCreatedTransects,
  getDeletedTransects,
  getUpdatedTransects,
  updateUserTransect,
  deleteUserTransect,
  storeUserTransects,
};
