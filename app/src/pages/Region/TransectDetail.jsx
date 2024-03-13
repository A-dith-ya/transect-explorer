import React, { useState, useEffect } from "react";

const TransectDetail = () => {
  return (
    <div>
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
