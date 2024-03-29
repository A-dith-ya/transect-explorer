import React, { useState, useEffect } from "react";
import "./AddTransect.css";
import FormContainer from "../../components/rjsf/FormContainer";
import { addTransectFormSchema } from "../../components/rjsf/schema/AddTransectFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { useNavigate } from "react-router-dom";
import { createTransect } from "../../services/TransectService";
import { getUserGroup } from "../../services/GroupService";

const AddTransect = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const userId = Number(sessionStorage.getItem("id"));
  const [groups, setGroups] = useState([]);

  const handleCreateTransect = (formData) => {
    // Convert the coordinates array into GeoJSON format for a Polygon
    const coordinatesGeoJSON = [
      formData.coordinates.map((coordinate) =>
        coordinate.split(",").map(parseFloat)
      ),
    ];
    // Add the first coordinate to the end to close the polygon
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
      creatorName: username,
      creatorId: userId,
      coordinates: geoJSONString,
      group: selectedGroupId,
    };
    createTransect(formDataUpdated, navigate);
  };

  useEffect(() => {
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
    <FormContainer
      uiSchema={UISchemas.addTransectUISchema}
      schema={addTransectFormSchema(groupOptions)}
      onSubmitAction={handleCreateTransect}
    />
  );
};

export default AddTransect;
