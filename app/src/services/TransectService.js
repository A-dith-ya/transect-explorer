import axios from "axios";
import { toast } from "react-toastify";
const baseURL = "http://localhost:8080/transects";
axios.defaults.withCredentials = true;

const createTransect = async (formData, navigate) => {
  try {
    const transectData = {
      groupId: 1,
      userCreatorId: formData.creatorId,
      transectName: formData.transectName,
      description: formData.observation,
      location: formData.region,
      coordinate: formData.coordinates,
      userCreatorName: formData.creatorName,
    };

    console.log(transectData);

    await axios.post(baseURL, transectData);

    navigate("/"); // FUTUREWORK navigate to the transect list page
  } catch (error) {
    console.log(error);
    toast.error("Error creating group: " + error.message);
  }
};

const getTransectID = async (id) => {
  try {
    const result = await axios.get(`${baseURL}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error("Error getting group ID: " + error.message);
  }
};

export { createTransect, getTransectID };
