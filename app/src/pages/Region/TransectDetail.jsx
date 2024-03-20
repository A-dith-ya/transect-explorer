import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { calculateCenter } from "../../components/map/helpers/Calculate";
import "./index.css";

const testGeo = {
  "type": "Feature",
  "properties": {},
  "geometry": {
    "coordinates": [
      [
        [
          -120.37587910166974,
          50.67866461714672
        ],
        [
          -120.36082002098189,
          50.675189966985414
        ],
        [
          -120.36656837136101,
          50.68346898565048
        ],
        [
          -120.37587910166974,
          50.67866461714672
        ]
      ]
    ],
    "type": "Polygon"
  }
}

const TransectDetail = () => {
  const navigate = useNavigate();
  const geoCenter = calculateCenter(testGeo.geometry.coordinates[0]);

  return (
    <div className="edit">
      <div className="edit-title">
        <button className="icon-btn" onClick={() => navigate("/region")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2>Transect Name</h2>
      </div>

      <h3>Region</h3>
      <p>Interior</p>

      <h3>Description</h3>
      <p>Lorem ipsum" is a placeholder text commonly used in the design and publishing industries to demonstrate the visual form of a document or a typeface without relying on meaningful content. It allows designers to focus on the layout and design aspects without being distracted by the actual content.</p>

      <div style={{ width: '90vw', height: '350px', paddingBottom: '5rem' }}>
        <MapContainer
          id="cool-map"
          center={geoCenter}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}>

          <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />

          <GeoJSON key={Math.random()} data={testGeo} />

        </MapContainer>
      </div>

    </div>
  );
};

export default TransectDetail;
