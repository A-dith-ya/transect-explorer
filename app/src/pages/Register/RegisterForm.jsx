import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/registerschema.json";
import ObjectFieldTemplate from "../../components/rjsf/ObjectFieldTemplate";
import SubmitButton from "../../components/rjsf/SubmitButton";
import { registerUser } from "../../services/UserService";
import "../Login/styles.css";

const RegisterForm = () => {
  const [formData, setFormData] = React.useState(null);

  const handleSubmit = async ({ formData }) => {
    registerUser(formData);
  };

  const uiSchema = {
    password: {
      "ui:widget": "password",
    },
  };

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      validator={validator}
      templates={{ ObjectFieldTemplate, ButtonTemplates: { SubmitButton } }}
      onSubmit={handleSubmit}
    />
  );
};

export default RegisterForm;
