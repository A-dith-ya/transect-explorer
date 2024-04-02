import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { calculateCenter } from "../../components/map/helpers/Calculate";
import "./index.css";
import { getTransectID } from "../../services/TransectService";

const testGeo = {
  type: "Feature",
  properties: {},
  geometry: {
    coordinates: [
      [
        [-120.37587910166974, 50.67866461714672],
        [-120.36082002098189, 50.675189966985414],
        [-120.36656837136101, 50.68346898565048],
        [-120.37587910166974, 50.67866461714672],
      ],
    ],
    type: "Polygon",
  },
};

const TransectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [transect, setTransect] = useState(null);

  useEffect(() => {
    const fetchTransect = async () => {
      try {
        const fetchedTransect = await getTransectID(id);
        setTransect(fetchedTransect);
      } catch (error) {
        console.error("Error fetching transect:", error);
      }
    };
    fetchTransect();
  }, [id]);

  const geoCenter = calculateCenter(testGeo.geometry.coordinates[0]);

  return (
    <div className="details-page">
      <div className="details-page-title">
        <button className="icon-btn" onClick={() => navigate("/region")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h2>{transect ? transect.transectName : "Loading ..."}</h2>
      </div>

      <h3>Region</h3>
      <p>{transect ? transect.location : "Loading ..."}</p>

      <h3>Description</h3>
      <p>{transect ? transect.description : "Loading ..."}</p>

      <div style={{ width: "90vw", height: "350px", paddingBottom: "5rem" }}>
        <MapContainer
          id="cool-map"
          center={geoCenter}
          zoom={13}
          scrollWheelZoom={true}
          zoomControl={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <GeoJSON key={Math.random()} data={testGeo} />
        </MapContainer>
      </div>
      <button
        className="text-btn"
        onClick={() => navigate(`/add/${transect.id}`)}
      >
        {"Edit"}
      </button>
    </div>
  );
};

export default TransectDetail;
