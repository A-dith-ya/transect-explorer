import React from "react";
import { getSubmitButtonOptions } from "@rjsf/utils";

const SubmitButton = (props) => {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }

  return (
    <button type="submit" variant="contained" className="submit-button">
      <i className="fa-solid fa-check-to-slot"></i>
      Submit
      {props.registry.rootSchema.button}
    </button>
  );
};

export default SubmitButton;
