import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { groupFormSchema } from "../../components/rjsf/schema/GroupFormSchema";
import { createGroup } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";

const GroupForm = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button
        className="group__Detail__button--back"
        onClick={() => navigate("/group")}
      >
        <i class="fa-solid fa-arrow-left"></i>
      </button>
      <FormContainer schema={groupFormSchema} onSubmitAction={createGroup} />
    </div>
  );
};

export default GroupForm;
