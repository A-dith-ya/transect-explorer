import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/loginschema.json";

const LoginForm = () => {
  const [formData, setFormData] = React.useState(null);

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
    />
  );
};
export default LoginForm;
