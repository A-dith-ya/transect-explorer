import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import ObjectFieldTemplate from "./template/ObjectFieldTemplate";
import ArrayFieldTemplate from "./template/ArrayFieldTemplate";
import SubmitButton from "./template/SubmitButton";
import "./FormContainer.css";

const FormContainer = ({ schema, uiSchema, onSubmitAction }) => {
  const [formData, setFormData] = useState(null);

  const handleSubmit = async ({ formData }) => {
     onSubmitAction(formData);
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={({ formData }) => setFormData(formData)}
      validator={validator}
      templates={{
        ObjectFieldTemplate,
        ArrayFieldTemplate,
        ButtonTemplates: { SubmitButton },
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default FormContainer;
