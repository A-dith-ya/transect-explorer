import axios from "axios";
import { toast } from 'react-toastify';

const baseURL = "http://localhost:8080/transects";
axios.defaults.withCredentials = true;

export {
  getTransects
}

async function getTransects (uri_endpoint) {
  try {
    const result = await axios.get(`${baseURL}/${uri_endpoint}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
