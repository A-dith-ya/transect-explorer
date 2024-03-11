import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { groupFormSchema } from "../../components/rjsf/schema/GroupFormSchema";
import { createGroup } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupTransects from "../../components/group/GroupTransects";

const GroupForm = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="group__form__container">
        <div className="group__form__wrap">
          <GroupTransects onAddClick={() => {}} />

          <FormContainer
            schema={groupFormSchema}
            onSubmitAction={(formData) => createGroup(formData, navigate)}
          />
        </div>
        <button
          className="group__detail__button--repeat"
          onClick={() => navigate("/group")}
        >
          <i className="fa-solid fa-repeat"></i>
        </button>
      </div>
    </div>
  );
};

export default GroupForm;
