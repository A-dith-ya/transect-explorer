import React from "react";
import "./UserStyle.css";

const User = () => {
  const username = sessionStorage.getItem("username");
  const userEmail = sessionStorage.getItem("userEmail");

  return (
    <div className="user-container">
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "25px",
          textAlign: "center",
        }}
      >
        My Profile
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "300px",
          gap: "10px",
        }}
      >
        <input
          disabled
          name="username"
          label="Username"
          defaultValue={username}
          style={{
            padding: "10px",
            width: "100%",
          }}
        />
        <input
          name="userEmail"
          label="UserEmail"
          defaultValue={userEmail}
          type="email"
          disabled
          style={{
            padding: "10px",
            width: "100%",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "transparent",
            border: "1px solid #333",
            color: "#333",
            fontSize: "15px",
            fontWeight: "bold",
            borderRadius: "5px",
          }}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default User;
