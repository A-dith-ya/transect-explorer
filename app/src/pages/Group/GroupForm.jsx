import React from "react";
import FormContainer from "../../components/rjsf/FormContainer";
import { groupFormSchema } from "../../components/rjsf/schema/GroupFormSchema";
import { createGroup } from "../../services/GroupService";

const GroupForm = () => {
  return (
    <FormContainer schema={groupFormSchema} onSubmitAction={createGroup} />
  );
};

export default GroupForm;
