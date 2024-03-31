import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { calculateCenter } from "../../components/map/helpers/Calculate";
import "./index.css";
import { getTransectID } from "../../services/TransectService";
import FormContainer from "../../components/rjsf/FormContainer";
import { getUserGroup } from "../../services/GroupService";
import { addTransectFormSchema } from "../../components/rjsf/schema/AddTransectFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";

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
  const [groups, setGroups] = useState([]);
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    const fetchTransect = async () => {
      try {
        const fetchedTransect = await getTransectID(id);
        setTransect(fetchedTransect);
      } catch (error) {
        console.error("Error fetching transect:", error);
      }
    };
    const fetchGroups = async () => {
      const userId = Number(sessionStorage.getItem("id"));
      const fetchedGroupsData = await getUserGroup(userId);
      let mergedGroups = [];
      if (
        fetchedGroupsData &&
        fetchedGroupsData.userGroups &&
        fetchedGroupsData.userGroups.length > 0
      ) {
        mergedGroups = [...fetchedGroupsData.userGroups.map((group) => group)];
      }
      if (
        fetchedGroupsData &&
        fetchedGroupsData.leaderGroups &&
        fetchedGroupsData.leaderGroups.length > 0
      ) {
        mergedGroups = [
          ...mergedGroups,
          ...fetchedGroupsData.leaderGroups.map((group) => group),
        ];
      }
      const uniqueGroups = removeDuplicateGroups(mergedGroups);
      setGroups(uniqueGroups);
    };

    fetchTransect();
    fetchGroups();
  }, [id]);

  const removeDuplicateGroups = (groupsData) => {
    const uniqueGroupIDs = new Set();
    const uniqueGroups = [];
    for (const group of groupsData) {
      if (!uniqueGroupIDs.has(group.id)) {
        uniqueGroupIDs.add(group.id);
        uniqueGroups.push(group);
      }
    }
    return uniqueGroups;
  };

  const groupOptions = groups.map((group) => ({
    label: `${group.id}: ${group.groupName}`,
    value: group.id,
  }));

  const handleUpdateTransect = async (formData) => {
    const coordinatesGeoJSON = [
      formData.coordinates.map((coordinate) =>
        coordinate.split(",").map(parseFloat)
      ),
    ];
    coordinatesGeoJSON[0].push(coordinatesGeoJSON[0][0]);

    const geoJSON = {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: coordinatesGeoJSON,
      },
      properties: {},
    };

    const geoJSONString = JSON.stringify(geoJSON);
    const selectedGroupValue = formData.group;
    const selectedGroupId = parseInt(selectedGroupValue.split(":")[0]);

    const formDataUpdated = {
      ...formData,
      coordinates: geoJSONString,
      group: selectedGroupId,
    };

    try {
      // await updateTransect(formDataUpdated);
      setEditable(false);
    } catch (error) {
      console.error("Error updating transect:", error);
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
      {editable ? (
        <FormContainer
          uiSchema={UISchemas.addTransectUISchema}
          schema={addTransectFormSchema(groupOptions)}
          onSubmitAction={handleUpdateTransect}
          formData={{
            transectName: transect?.transectName || "",
            group: transect?.groupId
              ? groupOptions.find((option) =>
                  option.label.startsWith(`${transect.groupId}:`)
                )?.label || ""
              : "",
            region: transect?.location || "",
            observation: transect?.description || "",
            coordinates: transect?.coordinate
              ? JSON.parse(transect.coordinate).geometry.coordinates[0].map(
                  (coord) => coord.join(",")
                )
              : [],
            files: [],
          }}
        />
      ) : (
        <>
          <h3>Region</h3>
          <p>{transect ? transect.location : "Loading ..."}</p>
          <h3>Description</h3>
          <p>{transect ? transect.description : "Loading ..."}</p>
          <div
            style={{ width: "90vw", height: "350px", paddingBottom: "5rem" }}
          >
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
        </>
      )}
      <button className="text-btn" onClick={() => setEditable(!editable)}>
        {editable ? "Cancel" : "Edit"}
      </button>
    </div>
  );
};

export default TransectDetail;
