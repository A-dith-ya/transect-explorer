import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/loginschema.json";
import ObjectFieldTemplate from "../../components/rjsf/ObjectFieldTemplate";
import SubmitButton from "../../components/rjsf/SubmitButton";
import { loginUser } from "../../services/UserService";
import "./styles.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = React.useState(null);

  const handleSubmit = async ({ formData }) => {
    loginUser(formData);
  };

  const uiSchema = {
    password: {
      "ui:widget": "password",
    },
  };

  return (
    <div className="container">
      <div
        style={{
          outline: "1px solid #333",
          borderRadius: "10px",
          padding: "30px 20px",
        }}
      >
        <h1>Login</h1>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={(e) => setFormData(e.formData)}
          validator={validator}
          templates={{ ObjectFieldTemplate, ButtonTemplates: { SubmitButton } }}
          onSubmit={handleSubmit}
        />

        <div>
          Don't have an account?{" "}
          <Link
            style={{
              textDecoration: "none",
            }}
            to={"/register"}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
