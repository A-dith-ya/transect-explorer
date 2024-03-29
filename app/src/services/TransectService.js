import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080/transects";
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

    console.log(transectData);

    await axios.post(baseURL, transectData).then((response) => {
      console.log(response);
      toast.success(transectData.transectName + " Created!");
      navigate("/region"); // FUTUREWORK navigate to the transect list page
    });
  } catch (error) {
    console.log(error);
    toast.error("Error creating transect: " + error.message);
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
    const result = await axios.get(`${baseURL}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error("Error getting transectID: " + error.message);
  }
};

const deleteTransect = async (id, navigate) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
    navigate("/transect");
  } catch (error) {
    console.log(error);
    toast.error("Error deleting transect: " + error.message);
  }
};

const getTransectsByCreatorId = async () => {
  try {
    const userCreatorId = sessionStorage.getItem("id");
    if (userCreatorId) {
      console.log("Session Storage: " + userCreatorId);
      const result = await axios.get(`${baseURL}/users/${userCreatorId}`);
      return result.data;
    } else {
      throw new Error("No User Id in session storage");
    }
  } catch (error) {
    console.log(error);
    toast.error("Error getting transects by creator ID: " + error.message);
  }
};

export {
  createTransect,
  getTransects,
  getTransectID,
  deleteTransect,
  getTransectsByCreatorId,
};
