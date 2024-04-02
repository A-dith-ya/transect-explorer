import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080/users/";

const registerUser = async (formData, navigate) => {
// Username validation
// Username validation
if (formData.username.trim().length < 6) {
  return toast.error("Username must be at least 6 characters long.");
}

// Email validation
if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.userEmail)) {
  return toast.error("Invalid Email Address.");
}

// Password length validation
if (formData.password.trim().length < 6) {
  return toast.error("Password must be at least 6 characters long.");
}

// Password disallowed characters validation: no spaces, periods, or underscores
if (/[\s._]/.test(formData.password)) {
  return toast.error("Password cannot contain spaces, periods, or underscores.");
}
  await axios
    .post(`${baseURL}auth/register`, formData)
    .then((response) => {
      navigate("/login");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Register failed: " + error.message);
    });
};

const loginUser = async (formData, navigate, login) => {
  await axios
    .post(`${baseURL}auth/login`, formData)
    .then((response) => {
      sessionStorage.setItem("id", response.data.id);
      sessionStorage.setItem("userEmail", response.data.userEmail);
      sessionStorage.setItem("username", response.data.username);
      toast.success("Welcome back " + response.data.username + "!");
      login();
      navigate("/");
    })
    .catch((error) => {
      console.log(error);
      toast.error("Login failed: " + error.message);
    });
};

const logoutUser = async (logout, navigate) => {
  try {
    await axios.post(`${baseURL}auth/logout`);
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("userEmail");
    sessionStorage.removeItem("username");
    toast.success("Logged out successfully");
    logout();
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error("Logout failed: " + error.message);
  }
};

const getUser = async (userId) => {
  try {
    const result = await axios.get(`${baseURL}${userId}`);
    return result.data;
  } catch (error) {
    console.log(error);
    toast.error("Error getting user: " + error.message);
  }
};

export { registerUser, loginUser, getUser, logoutUser };
