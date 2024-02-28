import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { registerFormSchema } from "../../components/rjsf/schema/RegisterFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { registerUser } from "../../services/UserService";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <div>
      <FormContainer
        schema={registerFormSchema}
        uiSchema={UISchemas.registerUISchema}
        onSubmitAction={registerUser}
      />
      <div mt={5}>
        Have an account?{" "}
        <Link
          style={{
            textDecoration: "none",
          }}
          to={"/login"}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default RegisterForm;
