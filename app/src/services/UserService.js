import axios from "axios";

const baseURL = "http://localhost:8080/users/";

const registerUser = async (formData) => {
  await toast
    .promise(
      axios.post(`${baseURL}auth/register`, formData).then((response) => {
        window.location.href = "/login";
      }),
      {
        loading: "Processing...",
        success: "Register successful",
        error: "Register failed",
      }
    )
    .catch((error) => {
      console.log(error);
      alert("Register failed");
    });
};

const loginUser = async (formData) => {
  await axios
    .post(`${baseURL}auth/login`, formData)
    .then((response) => {
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("userEmail", response.data.userEmail);
      sessionStorage.setItem("username", response.data.username);
      window.location.href = "/";
    })
    .catch((error) => {
      console.log(error);
      alert("Login failed");
    });
};

export { registerUser, loginUser };
