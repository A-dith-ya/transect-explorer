import axios from "axios";

const baseURL = "http://localhost:8080/groups";

const createGroup = async (formData) => {
  try {
    const response = await axios.post(baseURL, {
      groupLeaderId: Number(localStorage.getItem("id")),
      groupName: formData.groupName,
      groupUserEmails: formData.groupUserEmails,
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export { createGroup };
