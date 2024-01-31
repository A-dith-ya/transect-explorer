import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/loginschema.json";

const Login = () => {
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
      onChange={(e) => console.log(e.formData)}
      validator={validator}
    />
  );
};
export default Login;
