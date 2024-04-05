import { useState, useContext, useEffect } from "react";
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
import { UPDATE_GEOJSON } from "../../state/actions/index";

/***** MAP IMPORTS *****/
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import DrawingBar from "../../components/map/DrawingBar";
import DrawPoly from "../../components/map/buttons/DrawPoly";
import FetchPosition from "../../components/map/buttons/FetchPosition";
import ClickMarkers from "../../components/map/renders/ClickMarkers";
import { MapContext } from "../../contexts/MapContext";
import { toGeoJSON } from "../../components/map/helpers/GeoJSON";
import { EDIT_TRANSECT, EDIT_TRANSECT_NAME } from "../../state/actions/index";

const AddTransect = () => {
  const { state, dispatch } = useContext(MapContext);
  const { id } = useParams();
  const [groups, setGroups] = useState([]);
  const [transect, setTransect] = useState(null);
  const [coords, setCoords] = useState([]);
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const userId = Number(sessionStorage.getItem("id"));

  useEffect(() => {
    fetchData();

    if (id) {
      const fetchTransect = async () => {
        try {
          const fetchedTransect = await getTransectID(id);
          setTransect(fetchedTransect);

          dispatch({
            type: EDIT_TRANSECT_NAME,
            payload: {
              transectName: fetchedTransect.transectName,
            },
          });
        } catch (error) {
          console.error("Error fetching transect:", error);
        }
      };
      fetchTransect();
    }
  }, [setTransect]);

  const handleCreateTransect = (formData) => {
    const geoJSON = toGeoJSON(state.coordinates, "Polygon");

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

    const geoJSON = toGeoJSON(state.coordinates, "Polygon");

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

  const groupOptions = groups.map((group) => ({
    label: `${group.id}: ${group.groupName}`, // Concatenate ID and name
    value: group.id,
  }));

  async function fetchData() {
    const fetchedGroupsData = await getUserGroup(userId);
    let mergedGroups = [];
    if (
      (fetchedGroupsData && fetchedGroupsData.userGroups) ||
      (fetchedGroupsData.leaderGroups &&
        fetchedGroupsData.userGroups.length > 0) ||
      fetchedGroupsData.leaderGroups.length > 0
    ) {
      mergedGroups = [
        ...fetchedGroupsData.leaderGroups.map((group) => group),
        ...fetchedGroupsData.userGroups.map((group) => group),
      ];
    }

    const uniqueGroups = removeDuplicateGroups(mergedGroups);
    setGroups(uniqueGroups);
  }

  function removeDuplicateGroups(groupsData) {
    const uniqueGroupIDs = new Set();
    const uniqueGroups = [];

    for (const group of groupsData) {
      if (!uniqueGroupIDs.has(group.id)) {
        uniqueGroupIDs.add(group.id);
        uniqueGroups.push(group);
      }
    }

    return uniqueGroups;
  }

  return (
    <div className="page">
      {/*<div className='title'>
        <h2>Create transect</h2>
        </div>*/}

      {transect ? (
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
        <FormContainer
          uiSchema={UISchemas.addTransectUISchema}
          schema={addTransectFormSchema(groupOptions)}
          onSubmitAction={handleCreateTransect}
          formData={{
            ...this,
            coordinates: state.coordinates,
          }}
        />
      )}

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

          <ClickMarkers />

          {state.geojson && (
            <GeoJSON key={Math.random()} data={state.geojson} />
          )}

          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
      </div>
    </div>
  );
};

export default AddTransect;

/*transect ? (
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
      ) : (*/
