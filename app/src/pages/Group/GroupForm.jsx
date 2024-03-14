import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { groupFormSchema } from "../../components/rjsf/schema/GroupFormSchema";
import { createGroup } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupTransects from "../../components/group/GroupTransects";
import GroupArrayFieldTemplate from "../../components/rjsf/template/GroupArrayFieldTemplate";

const GroupForm = () => {
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem("userEmail");

  const handleCreateGroup = (formData) => {
    if (!userEmail) return;
    formData.groupUserEmails.push(userEmail);
    createGroup(formData, navigate);
  };
  return (
    <div className="container">
      <button
        className="group__detail__button--back"
        onClick={() => navigate("/group")}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button>
      <div className="group__form__container">
        <div className="group__form__wrap">
          {/* <GroupTransects onAddClick={() => {}} /> */}

          <FormContainer
            schema={groupFormSchema}
            onSubmitAction={handleCreateGroup}
            arrayFieldTemplate={GroupArrayFieldTemplate}
          />
        </div>
        {/* <button
          className="group__detail__button--repeat"
          onClick={() => navigate("/group")}
        >
          <i className="fa-solid fa-repeat"></i>
        </button> */}
      </div>
    </div>
  );
};

export default GroupForm;
