import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/groupschema.json";
import ObjectFieldTemplate from "../../components/rjsf/ObjectFieldTemplate";
import ArrayFieldTemplate from "../../components/rjsf/ArrayFieldTemplate";
import SubmitButton from "../../components/rjsf/SubmitButton";
import { createGroup } from "../../services/GroupService";

const GroupForm = () => {
  const [formData, setFormData] = React.useState(null);

  const handleSubmit = async ({ formData }) => {
    createGroup(formData);
  };

  return (
    <Form
      schema={schema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      validator={validator}
      templates={{
        ObjectFieldTemplate,
        ButtonTemplates: { SubmitButton },
        ArrayFieldTemplate,
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default GroupForm;