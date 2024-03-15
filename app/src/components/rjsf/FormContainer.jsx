import { useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import ObjectFieldTemplate from "./template/ObjectFieldTemplate";
import ArrayFieldTemplate from "./template/ArrayFieldTemplate";
import SubmitButton from "./template/SubmitButton";
import "./FormContainer.css";

const FormContainer = ({
  schema,
  uiSchema,
  onSubmitAction,
  arrayFieldTemplate,
  formData: initialFormData,
}) => {
  const [formData, setFormData] = useState(initialFormData);

  const handleSubmit = async () => {
    onSubmitAction(formData);
  };

  return (
    <div className="container">
      <Form
        className="login-form"
        schema={schema}
        uiSchema={uiSchema}
        formData={formData}
        onChange={({ formData }) => setFormData(formData)}
        validator={validator}
        templates={{
          ObjectFieldTemplate,
          ArrayFieldTemplate: arrayFieldTemplate || ArrayFieldTemplate,
          ButtonTemplates: { SubmitButton },
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default FormContainer;
