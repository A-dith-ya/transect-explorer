import React from "react";
import { getSubmitButtonOptions } from "@rjsf/utils";

const SubmitButton = (props) => {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }

  return (
    <button
      type="submit"
      variant="contained"
      className="submit-button"

    > Submit
      <i className="fa-solid fa-check-to-slot"></i>
      {props.registry.rootSchema.button}
    </button>
  );
};

export default SubmitButton;
