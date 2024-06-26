import { useContext, useEffect, useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import ObjectFieldTemplate from "./template/ObjectFieldTemplate";
import ArrayFieldTemplate from "./template/ArrayFieldTemplate";
import SubmitButton from "./template/SubmitButton";
import "./FormContainer.css";
import { MapContext } from "../../contexts/MapContext";
import { UPDATE_COORDINATES } from "../../state/actions/index";
import { map_modes } from "../../constants/Map.ts";

const FormContainer = ({
  schema,
  uiSchema,
  onSubmitAction,
  arrayFieldTemplate,

  formData: initialFormData,

  addButtonIcon,
  removeButtonIcon,
}) => {
  const { state, dispatch } = useContext(MapContext);
  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    /*
    if (formData?.coordinates.length > 0 && state.mode !== map_modes.polygon) {
      dispatch({
        type: UPDATE_COORDINATES,
        payload: {
          coordinates: formData.coordinates
        }
      });
    }
    */
  }, [formData]);

  useEffect(() => {
    if (schema.title === "Add Transect") {
      setFormData({
        ...formData,
        transectName: state.form.transectName
          ? state.form.transectName
          : formData.transectName,
        observation: state.form.observation
          ? state.form.observation
          : formData.observation,
        group: state.form.group ? state.form.group : formData.group,
        region: state.form.region ? state.form.region : formData.region,
        coordinates: state.coordinates.map((coord) => coord.join(",")),
      });
    }
  }, [state]);

  const handleSubmit = async () => {
    onSubmitAction(formData);
  };

  function handleChange({ formData }) {
    setFormData(formData);
  }

  return (
    <div className="container">
      <Form
        className="login-form"
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={handleChange}
        validator={validator}
        templates={{
          ObjectFieldTemplate,
          ArrayFieldTemplate: arrayFieldTemplate || ArrayFieldTemplate,
          ButtonTemplates: { SubmitButton },
          addButtonIcon,
          removeButtonIcon,
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormContainer;
