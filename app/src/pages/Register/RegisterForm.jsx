import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { registerFormSchema } from "../../components/rjsf/schema/RegisterFormSchema";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { registerUser } from "../../services/UserService";
import { Link, useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <FormContainer
        schema={registerFormSchema}
        uiSchema={UISchemas.registerUISchema}
        onSubmitAction={(formData) => registerUser(formData, navigate)}
      />
      <div style={{ paddingBottom: "30px" }}>
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