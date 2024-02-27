import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { loginFormSchema } from "../../components/rjsf/schema/LoginFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { loginUser } from "../../services/UserService";

const LoginForm = () => {
  return (
    <FormContainer
      schema={loginFormSchema}
      uiSchema={UISchemas.loginUISchema}
      onSubmitAction={loginUser}
    />
  );
};

export default LoginForm;
