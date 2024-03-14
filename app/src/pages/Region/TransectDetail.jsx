import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";

const TransectDetail = () => {
  const navigate = useNavigate();
  return (
    <div style={{
    display: "flex",
    flexFlow: "column wrap",
    }}>
      <button onClick={() => navigate("/region")}>
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <h1>Transect Name</h1>
      <div style={{
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "flex-start",
        alignContent: "flex-start",
        padding: "1rem"
      }}>
        <h3>Region</h3>
        <h5>Description</h5>
        {/* <ul>
          {transects.map((transect) => (
            <li key={transect.id}>{transect.name}</li>
          ))}
        </ul> */}

        {/*<div>
          <MapContainer
            id='map'
            center={[55, -122]}
            style={{height: 500, width: "80%"}}
            zoom={5}
            scrollWheelZoom={true}
            zoomControl={false}>

            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

          </MapContainer>
          </div>*/}
      </div>

    </div>
  );
};

export default TransectDetail;
