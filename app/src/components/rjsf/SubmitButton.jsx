import React from "react";
import { getSubmitButtonOptions } from "@rjsf/utils";

const SubmitButton = (props) => {
  const { uiSchema } = props;
  const { norender } = getSubmitButtonOptions(uiSchema);
  if (norender) {
    return null;
  }
  return (
    <div className="form">
      <button type="submit" className="submit-button">
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;
