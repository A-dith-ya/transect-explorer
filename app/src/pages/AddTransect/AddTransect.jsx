import React, { useState } from "react";
import "./AddTransect.css";
import FormContainer from "../../components/rjsf/FormContainer";
import { addTransectFormSchema } from "../../components/rjsf/schema/AddTransectFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { useNavigate } from "react-router-dom";
import { createTransect } from "../../services/TransectService";

const AddTransect = () => {
  const navigate = useNavigate();
  const username = sessionStorage.getItem("username");
  const userId = Number(sessionStorage.getItem("id"));

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
    console.log(geoJSONString);

    const formDataUpdated = {
      ...formData,
      creatorName: username,
      creatorId: userId,
      coordinates: geoJSONString,
    };
    console.log(JSON.stringify(formDataUpdated));
    createTransect(formDataUpdated, navigate);
  };

  return (
    <FormContainer
      uiSchema={UISchemas.addTransectUISchema}
      schema={addTransectFormSchema}
      onSubmitAction={handleCreateTransect}
    />
  );
};

export default AddTransect;
