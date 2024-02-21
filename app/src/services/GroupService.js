import axios from "axios";
const baseURL = "http://localhost:8080/groups";
axios.defaults.withCredentials = true;

const createGroup = async (formData) => {
  try {
    await axios.post(baseURL, {
      groupLeaderId: Number(sessionStorage.getItem("id")),
      groupName: formData.groupName,
      groupUserEmails: formData.groupUserEmails,
    });

    window.location.href = "/group";
  } catch (error) {
    console.log(error);
  }
};

const getGroupUser = async (userId) => {
  try {
    const result = await axios.get(`${baseURL}/groupUser/${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getGroupLeader = async (userId) => {
  try {
    const result = await axios.get(`${baseURL}/groupLeader/${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

const getGroupId = async (id) => {
  try {
    const result = await axios.get(`${baseURL}/${id}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { createGroup, getGroupUser, getGroupId, getGroupLeader };
