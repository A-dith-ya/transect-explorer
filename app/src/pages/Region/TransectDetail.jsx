import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TransectDetail = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="group__Detail__button--back"
        onClick={() => navigate("/region")}
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h1>Transect Name</h1>
      <h3>Region</h3>
      <div>
        <p>Description</p>
      </div>
      {/* <ul>
        {transects.map((transect) => (
          <li key={transect.id}>{transect.name}</li>
        ))}
      </ul> */}
    </div>
  );
};

export default TransectDetail;
