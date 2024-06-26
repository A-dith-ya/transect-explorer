import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080/groups";
axios.defaults.withCredentials = true;

const createGroup = async (formData, navigate) => {
  try {
    const response = await axios.post(baseURL, {
      groupLeaderId: Number(sessionStorage.getItem("id")),
      groupName: formData.groupName,
      groupUserEmails: formData.groupUserEmails,
    });
    const createdGroup = await getGroupId(response.data.id);

    formData.groupUserEmails.forEach((email) => {
      if (!createdGroup.groupUserEmails.includes(email)) {
        toast.error(email + " does not exist!");
      }
    });

    navigate("/group");
  } catch (error) {
    console.log(error);
    toast.error("Error creating group: " + error.message);
  }
};

const getUserGroup = async (userId) => {
  try {
    const result = await axios.get(`${baseURL}/userGroups/${userId}`);
    return result.data;
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
    toast.error("Error getting group user: " + error.message);
  }
};

const getGroupLeader = async (userId) => {
  try {
    const result = await axios.get(`${baseURL}/groupLeader/${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error("Error getting group leader: " + error.message);
  }
};

const getGroupId = async (groupId) => {
  try {
    const result = await axios.get(`${baseURL}/${groupId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error("Error getting group ID: " + error.message);
  }
};

const updateGroup = async (formData) => {
  try {
    const response = await axios.put(`${baseURL}/${formData.id}`, formData);
    toast.success("Successfully updated!");
    const createdGroup = await getGroupId(response.data.id);
    // window.location.reload();
    formData.groupUserEmails.forEach((email) => {
      if (!createdGroup.groupUserEmails.includes(email)) {
        toast.error(email + " does not exist!");
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    toast.error("Error updating group: " + error.message);
  }
};

const deleteGroup = async (id, navigate) => {
  try {
    await axios.delete(`${baseURL}/${id}`);
    navigate("/group");
  } catch (error) {
    console.log(error);
    toast.error("Error deleting group: " + error.message);
  }
};

export {
  createGroup,
  getGroupUser,
  getGroupId,
  getGroupLeader,
  updateGroup,
  deleteGroup,
  getUserGroup,
};
