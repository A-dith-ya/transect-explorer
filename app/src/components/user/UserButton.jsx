import React from "react";
import { useNavigate } from "react-router-dom";

const UserButton = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");

  if (user) {
    return (
      <button
        style={{
          margin: "0 10px",
          fontWeight: "600",
          padding: "10px",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#",
        }}
        onClick={() => {
          navigate(`/user/${user}`);
        }}
      >
        {user}
      </button>
    );
  }

  return (
    <button
      style={{
        float: "right",
        margin: "10px",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#555",
      }}
      onClick={() => navigate("/login")}
    >
      Login
    </button>
  );
};

export default UserButton;
