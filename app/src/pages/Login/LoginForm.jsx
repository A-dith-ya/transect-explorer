import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { loginFormSchema } from "../../components/rjsf/schema/LoginFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { loginUser } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  return (
    <div className="container login__page">
      <FormContainer
        schema={loginFormSchema}
        uiSchema={UISchemas.loginUISchema}
        onSubmitAction={(formData) => loginUser(formData, navigate)}
      />
      <div style={{ paddingBottom: "30px" }}>
        Don't have an account? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;