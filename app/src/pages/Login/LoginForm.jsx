import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { loginFormSchema } from "../../components/rjsf/schema/LoginFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { loginUser } from "../../services/UserService";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = React.useState(null);

  const handleSubmit = async ({ formData }) => {
    console.log(formData);
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
