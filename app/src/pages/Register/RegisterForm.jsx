import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { registerFormSchema } from "../../components/rjsf/schema/RegisterFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { registerUser } from "../../services/UserService";

const RegisterForm = () => {
  return (
    <FormContainer
      schema={registerFormSchema}
      uiSchema={UISchemas.registerUISchema}
      onSubmitAction={registerUser}
    />
  );
};

export default RegisterForm;
