import { useState, useEffect } from "react";
import "./AddTransect.css";
import FormContainer from "../../components/rjsf/FormContainer";
import { addTransectFormSchema } from "../../components/rjsf/schema/AddTransectFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { useNavigate, useParams } from "react-router-dom";
import {
  createTransect,
  getTransectID,
  updateTransect,
} from "../../services/TransectService";
import { getUserGroup } from "../../services/GroupService";
/***** MAP IMPORTS *****/
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import DrawingBar from "../../components/map/DrawingBar";
import DrawPoly from "../../components/map/buttons/DrawPoly";
import FetchPosition from "../../components/map/buttons/FetchPosition";

const AddTransect = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const username = sessionStorage.getItem("username");
  const userId = Number(sessionStorage.getItem("id"));
  const [groups, setGroups] = useState([]);
  const [transect, setTransect] = useState(null);

  const handleCreateTransect = (formData) => {
    // Convert the coordinates array into GeoJSON format for a Polygon
    const coordinatesGeoJSON = [
      formData.coordinates.map((coordinate) =>
        coordinate.split(",").map(parseFloat)
      ),
    ];
    // Add the first coordinate to the end to close the polygon if it's not already closed
    if (
      coordinatesGeoJSON[0][0][0] !==
      coordinatesGeoJSON[0][coordinatesGeoJSON[0].length - 1][0]
    ) {
      coordinatesGeoJSON[0].push(coordinatesGeoJSON[0][0]);
    }

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
      creatorName: username,
      creatorId: userId,
      coordinates: geoJSONString,
      group: selectedGroupId,
    };
    createTransect(formDataUpdated, navigate);
  };

  const handleUpdateTransect = async (formData) => {
    const coordinatesGeoJSON = [
      formData.coordinates.map((coordinate) =>
        coordinate.split(",").map(parseFloat)
      ),
    ];
    // Add the first coordinate to the end to close the polygon if it's not already closed
    if (
      coordinatesGeoJSON[0][0][0] !==
      coordinatesGeoJSON[0][coordinatesGeoJSON[0].length - 1][0]
    ) {
      coordinatesGeoJSON[0].push(coordinatesGeoJSON[0][0]);
    }

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
      await updateTransect(formDataUpdated, id, navigate);
    } catch (error) {
      console.error("Error updating transect:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const fetchTransect = async () => {
        try {
          const fetchedTransect = await getTransectID(id);
          console.log(fetchedTransect);
          setTransect(fetchedTransect);
        } catch (error) {
          console.error("Error fetching transect:", error);
        }
      };
      fetchTransect();
    }

    async function fetchData() {
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
    }
    fetchData();
  }, []);

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
    label: `${group.id}: ${group.groupName}`, // Concatenate ID and name
    value: group.id,
  }));

  return (
    <>
      {transect ? (
        <>
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
        </>
      ) : (
        <div className="page">
          {/*<div className='title'>
            <h2>Create transect</h2>
            </div>*/}

          <FormContainer
            uiSchema={UISchemas.addTransectUISchema}
            schema={addTransectFormSchema(groupOptions)}
            onSubmitAction={handleCreateTransect}
          />

          <div>
            <MapContainer
              id="transect-map"
              center={[55, -122]}
              zoom={7}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <DrawingBar>
                <DrawPoly />
                <FetchPosition />
              </DrawingBar>

              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            </MapContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransect;
