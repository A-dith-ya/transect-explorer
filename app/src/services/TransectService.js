import axios from "axios";
import { toast } from 'react-toastify';
const baseURL = "http://localhost:8080/transects";
axios.defaults.withCredentials = true;

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
    navigate("/group");
  } catch (error) {
    console.log(error);
    toast.error("Error deleting transect: " + error.message);
  }
};
export {
  getTransectID,
  deleteTransect,
};


