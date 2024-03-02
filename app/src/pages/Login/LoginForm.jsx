import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { loginFormSchema } from "../../components/rjsf/schema/LoginFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { loginUser } from "../../services/UserService";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="container">
      <FormContainer
        schema={loginFormSchema}
        uiSchema={UISchemas.loginUISchema}
        onSubmitAction={loginUser}
      />
      <div>
        Don't have an account?{" "}
        <Link
          to={"/register"}
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
