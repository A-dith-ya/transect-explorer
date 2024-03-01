import React from "react";
import { useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");

  if (user) {
    return <button>{user}</button>;
  }

  return <button onClick={() => navigate("/login")}>Login</button>;
};

export default UserButton;
