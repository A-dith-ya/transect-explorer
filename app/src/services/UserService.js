import axios from "axios";

const baseURL = "http://localhost:8080/users/";

const registerUser = async (formData) => {
  const response = await axios
    .post(`${baseURL}auth/register`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const loginUser = async (formData) => {
  const response = await axios
    .post(`${baseURL}auth/login`, formData)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { registerUser, loginUser };
