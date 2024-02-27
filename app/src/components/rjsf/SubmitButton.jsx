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
      className="submit-btn"
      style={{
        color: "white",
        borderRadius: "10px",
        backgroundColor: "#333",
        padding: "10px 20px",
        fontSize: "18px",
        margin: "20px",
        border: "none",
        cursor: "pointer",
      }}
    >
      {props.registry.rootSchema.button}
    </button>
  );
};

export default SubmitButton;
