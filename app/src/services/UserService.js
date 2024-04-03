import axios from "axios";
import { toast } from "react-toastify";

const baseURL = "http://localhost:8080/users/";

const registerUser = async (formData, navigate) => {
  // Username validation
  // Username validation

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
      console.log(response);
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

const updateUser = async (formData, id, navigate) => {
  const authorizeRequestData = {
    username: formData.username,
    password: formData.password,
  };

  const updateData = {
    username: formData.usernameNew,
    password: null,
    userEmail: null,
  };
  await axios
    .post(`${baseURL}auth/login`, authorizeRequestData)
    .then((response) => {
      if (response.status === 200) {
        axios.put(`${baseURL}${id}`, updateData).then((response) => {
          console.log(response);
          sessionStorage.setItem("username", response.data.username);
          toast.success("Username Updated!");
          navigate(`/settings`);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Unable to update username: " + error.message);
    });
};

const updateEmail = async (formData, id, navigate) => {
  const authorizeRequestData = {
    username: formData.username,
    password: formData.password,
  };

  const updateData = {
    username: null,
    password: null,
    userEmail: formData.emailNew,
  };
  await axios
    .post(`${baseURL}auth/login`, authorizeRequestData)
    .then((response) => {
      if (response.status === 200) {
        axios.put(`${baseURL}${id}`, updateData).then((response) => {
          console.log(response);
          sessionStorage.setItem("userEmail", response.data.email);
          toast.success("Email Updated!");
          navigate(`/settings`);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Unable to update email: " + error.message);
    });
};

const updatePassword = async (formData, id, navigate) => {
  const authorizeRequestData = {
    username: formData.username,
    password: formData.password,
  };

  const updateData = {
    username: null,
    password: formData.passwordNew,
    userEmail: null,
  };
  await axios
    .post(`${baseURL}auth/login`, authorizeRequestData)
    .then((response) => {
      if (response.status === 200) {
        axios.put(`${baseURL}${id}`, updateData).then((response) => {
          console.log(response);
          toast.success("Password Updated!");
          navigate(`/settings`);
        });
      }
    })
    .catch((error) => {
      console.log(error);
      toast.error("Unable to update password: " + error.message);
    });
};

export {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  updateEmail,
  updatePassword,
  logoutUser,
};
