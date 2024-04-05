import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { calculateCenter } from "../../components/map/helpers/Calculate";
import "./index.css";
import { deleteTransect, getTransectID } from "../../services/TransectService";
import { deleteTransectFormSchema } from "../../components/rjsf/schema/DeleteTransectSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import Modal from "../../components/Modal/Modal";
import { MapContext } from "../../contexts/MapContext";
import { EDIT_TRANSECT, DETAILS_PAGE_GEO } from "../../state/actions/index";

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
  const { state, dispatch } = useContext(MapContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [transect, setTransect] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (transect) {
      const geojson = JSON.parse(transect.coordinate);

      dispatch({
        type: DETAILS_PAGE_GEO,
        payload: {
          geojson: geojson
        }
      });
    }
  }, [transect]);

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

  function handleEdit() {
    const geojson = JSON.parse(transect.coordinate);
    const coordinates = geojson.geometry.coordinates[0];

    dispatch({
      type: EDIT_TRANSECT,
      payload: {
        geojson: geojson,
        coordinates: coordinates,
      },
    });

    navigate(`/add/${transect.id}`);
  }

  const handleDeleteTransect = async (data) => {
    if (data.delete.toLowerCase() === "delete transect") {
      console.log(data.delete.toLowerCase());
      try {
        await deleteTransect(transect.id);
        navigate("/region");
      } catch (error) {
        console.error("Error deleting transect:", error);
      }
    }
  };

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

      {!deleteModal && state.geojson && (
        <div style={{ width: "90vw", height: "350px", paddingBottom: "5rem" }}>
          <MapContainer
            id="cool-map"
            center={state.geojson.properties.center}
            zoom={13}
            scrollWheelZoom={true}
            zoomControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {state.geojson && <GeoJSON key={Math.random()} data={state.geojson} />}
          </MapContainer>
        </div>
      )}

      <button className="text-btn" onClick={handleEdit}>
        Edit
      </button>
      <button
        className="text-btn delete-btn"
        onClick={() => setDeleteModal(true)}
      >
        Delete
      </button>
      {deleteModal && (
        <Modal
          modal={deleteModal}
          setModal={setDeleteModal}
          formSchema={deleteTransectFormSchema}
          uiSchemas={UISchemas.deleteTransectUISchema}
          submitForm={handleDeleteTransect}
        />
      )}
    </div>
  );
};

export default TransectDetail;
