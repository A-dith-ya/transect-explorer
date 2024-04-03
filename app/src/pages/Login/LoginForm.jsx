import React from "react";
import "./login.css";
import FormContainer from "../../components/rjsf/FormContainer";
import { loginFormSchema } from "../../components/rjsf/schema/LoginFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import AuthContext from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { loginUser } from "../../services/UserService";

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (formData, navigate) => {
    await loginUser(formData, navigate, login);
  };

  return (
    <div className="container">
      <FormContainer
        schema={loginFormSchema}
        uiSchema={UISchemas.loginUISchema}
        onSubmitAction={(formData) => handleLogin(formData, navigate)}
      />
      <div className="paddingBottom"> 
        Don't have an account? <Link to={"/register"}>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
