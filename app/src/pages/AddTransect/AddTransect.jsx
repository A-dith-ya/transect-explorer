import React, { useState } from 'react';
import './AddTransect.css';
import FormContainer from "../../components/rjsf/FormContainer";
import { addTransectFormSchema } from '../../components/rjsf/schema/AddTransectFormSchema';
import UISchemas from '../../components/rjsf/UISchema/UISchema';

const AddTransect = () => {

  return (
    <FormContainer 
    uiSchema={UISchemas.addTransectUISchema}
    schema={addTransectFormSchema}
    />
  );
};

export default AddTransect;