import React, { useState } from "react";
import "./Modal.css";
import FormContainer from "../rjsf/FormContainer";
import UISchemas from "../rjsf/UISchema/UISchema";
import { loginFormSchema } from "../rjsf/schema/LoginFormSchema";

export default function Modal({
  modal,
  setModal,
  formSchema,
  uiSchema,
  handleSubmit,
}) {
  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <FormContainer
              schema={formSchema}
              uiSchema={uiSchema}
              onSubmitAction={handleSubmit}
            />
            <button className="close-modal" onClick={toggleModal}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
