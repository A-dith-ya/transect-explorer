import React from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/groupschema.json";
import ObjectFieldTemplate from "../../components/rjsf/ObjectFieldTemplate";
import ArrayFieldTemplate from "../../components/rjsf/ArrayFieldTemplate";
import SubmitButton from "../../components/rjsf/SubmitButton";
import { createGroup } from "../../services/GroupService";

const GroupForm = () => {
  const [formData, setFormData] = React.useState(null);
  const userEmail = sessionStorage.getItem("userEmail");

  const handleSubmit = async ({ formData }) => {
    if (!formData.groupUserEmails?.length) return alert("At least one user");
    if (formData.groupUserEmails.includes(userEmail)) {
      return alert("Can't add oneself!");
    }
    createGroup({
      ...formData,
      groupUserEmails: [...formData?.groupUserEmails, userEmail],
    });
  };

  return (
    <div className="group__form">
      <div className="group__form__content">
        <h1>Create Group</h1>
        <Form
          schema={schema}
          formData={formData}
          onChange={(e) => setFormData(e.formData)}
          validator={validator}
          templates={{
            ObjectFieldTemplate,
            ButtonTemplates: { SubmitButton },
            ArrayFieldTemplate,
          }}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default GroupForm;
