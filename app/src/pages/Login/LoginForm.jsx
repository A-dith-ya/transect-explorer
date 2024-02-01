import React from "react";
import Form from "@rjsf/core";
import { getSubmitButtonOptions } from "@rjsf/utils";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/loginschema.json";
import "./styles.css";

const LoginForm = () => {
  const [formData, setFormData] = React.useState(null);

  const uiSchema = {
    password: {
      "ui:widget": "password",
    },
  };

  function ObjectFieldTemplate(props) {
    return (
      <div>
        {props.title}
        {props.description}
        {props.properties.map((element) => (
          <div className="login-form">{element.content}</div>
        ))}
      </div>
    );
  }

  function SubmitButton(props) {
    const { uiSchema } = props;
    const { norender } = getSubmitButtonOptions(uiSchema);
    if (norender) {
      return null;
    }
    return (
      <div className="login-form">
        <button type="submit" className="submit-button">
          Submit
        </button>
      </div>
    );
  }

  return (
    <Form
      schema={schema}
      uiSchema={uiSchema}
      formData={formData}
      onChange={(e) => setFormData(e.formData)}
      validator={validator}
      templates={{ ObjectFieldTemplate, ButtonTemplates: { SubmitButton } }}
    />
  );
};
export default LoginForm;
