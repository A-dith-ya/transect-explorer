import axios from "axios";

const baseURL = "http://localhost:8080/users/";

const registerUser = async (formData) => {
  await axios
    .post(`${baseURL}auth/register`, formData)
    .then((response) => {
      navigate("/login");
    })
    .catch((error) => {
      console.log(error);
      alert("Register failed");
    });
};

const loginUser = async (formData, navigate) => {
  await axios
    .post(`${baseURL}auth/login`, formData)
    .then((response) => {
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("userEmail", response.data.userEmail);
      sessionStorage.setItem("username", response.data.username);
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      alert("Login failed");
    });
};

const getUser = async (userId) => {
  try {
    const result = await axios.get(`${baseURL}${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export { registerUser, loginUser, getUser };
