import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer } from "react-leaflet";
import "./style.css";

const TransectDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="edit">
      <div className="title">
        <button onClick={() => navigate("/region")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2>Transect Name</h2>
      </div>


      <h3>Region</h3>
      <p>Cool Region</p>

      <h5>Description</h5>
      <p>Lorem ipsum" is a placeholder text commonly used in the design and publishing industries to demonstrate the visual form of a document or a typeface without relying on meaningful content. It allows designers to focus on the layout and design aspects without being distracted by the actual content.</p>

      <div style={{ width: '90vw', height: '350px', paddingBottom: '5rem' }}>
        <MapContainer
          id="cool-map"
          center={[55, -122]}
          zoom={5}
          scrollWheelZoom={true}
          zoomControl={false}>

          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

        </MapContainer>
      </div>

    </div>
  );
};

export default TransectDetail;
