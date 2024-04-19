import axios from "axios";
import { toast } from "react-toastify";
import {
  createUserTransect,
  getAllUserTransects,
  getTransect,
  updateUserTransect,
  deleteUserTransect,
  storeUserTransects,
  getCreatedTransects,
  getUpdatedTransects,
  getDeletedTransects,
} from "./TransectIndexedDBService";

const baseURL = "https://transect-explorer.onrender.com/transects";
axios.defaults.withCredentials = true;

const createTransect = async (formData, navigate) => {
  try {
    const transectData = {
      groupId: formData.group,
      userCreatorId: formData.creatorId,
      transectName: formData.transectName,
      description: formData.observation || null,
      location: formData.region,
      coordinate: formData.coordinates,
      userCreatorName: formData.creatorName,
    };

    if (navigator.onLine) {
      await axios.post(baseURL, transectData);
    } else {
      await createUserTransect(transectData);
    }

    toast.success(transectData.transectName + " Created!");
    navigate("/region"); // FUTUREWORK navigate to the transect list page
  } catch (error) {
    console.log(error);
    toast.error("Error creating transect: " + error.message);
  }
};

const updateTransect = async (formData, id, navigate) => {
  try {
    const transectData = {
      id: id,
      groupId: formData.group,
      transectName: formData.transectName,
      description: formData.observation || null,
      location: formData.region,
      coordinate: formData.coordinates,
    };

    if (navigator.onLine) {
      await axios.put(`${baseURL}/${id}`, transectData);
    } else {
      await updateUserTransect(transectData, id);
    }

    toast.success(transectData.transectName + " Updated!");
    navigate(`/region/transect/${id}`);
  } catch (error) {
    console.log(error);
    toast.error("Error updating transect: " + error.message);
  }
};

async function getTransects(uri_endpoint) {
  try {
    const result = await axios.get(`${baseURL}/${uri_endpoint}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

const getTransectID = async (id) => {
  try {
    if (navigator.onLine) {
      const result = await axios.get(`${baseURL}/${id}`);
      return result.data;
    } else {
      return await getTransect(id);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error getting transectID: " + error.message);
  }
};

const deleteTransect = async (id) => {
  try {
    if (navigator.onLine) {
      await axios.delete(`${baseURL}/${id}`);
      await deleteUserTransect(id);
    } else {
      await deleteUserTransect(id);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error deleting transect: " + error.message);
  }
};

const getTransectsByCreatorId = async () => {
  try {
    const userCreatorId = sessionStorage.getItem("id");
    if (navigator.onLine) {
      const result = await axios.get(`${baseURL}/users/${userCreatorId}`);
      storeUserTransects(result.data);
      return result.data;
    } else {
      return await getAllUserTransects(userCreatorId);
    }
  } catch (error) {
    console.log(error);
    toast.error("Error getting transects by creator ID: " + error.message);
  }
};

const getTransectsByGroupId = async (groupId) => {
  try {
    const result = await axios.get(`${baseURL}/groups/${groupId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error("Error getting transects by group ID: " + error.message);
  }
};

const createMultipleTransects = async () => {
  try {
    const userCreatorId = sessionStorage.getItem("id");
    const transects = await getCreatedTransects(userCreatorId);
    if (transects.length === 0) return;
    await axios.post(`${baseURL}/sync`, transects);
    toast.success("Multiple transects synced!");
  } catch (error) {
    console.log(error);
    toast.error("Error creating multiple transects: " + error.message);
  }
};

const updateMultipleTransects = async () => {
  try {
    const userCreatorId = sessionStorage.getItem("id");
    const transects = await getUpdatedTransects(userCreatorId);
    if (transects.length === 0) return;
    await axios.put(`${baseURL}/sync`, transects);
    toast.success("Multiple transects synced!");
  } catch (error) {
    console.log(error);
    toast.error("Error updating multiple transects: " + error.message);
  }
};

const deleteMultipleTransects = async () => {
  try {
    const transects = await getDeletedTransects();
    const transectIds = transects.map((transect) => transect.id).join(",");
    await axios.delete(`${baseURL}/sync?transectIds=${transectIds}`);
    toast.success("Multiple transects synced!");
  } catch (error) {
    console.log(error);
    toast.error("Error deleting multiple transects: " + error.message);
  }
};

export {
  createTransect,
  getTransects,
  getTransectID,
  deleteTransect,
  getTransectsByCreatorId,
  updateTransect,
  getTransectsByGroupId,
  createMultipleTransects,
  updateMultipleTransects,
  deleteMultipleTransects,
};
