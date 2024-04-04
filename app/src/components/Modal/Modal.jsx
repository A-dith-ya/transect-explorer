import React, { useState } from "react";
import "./Modal.css";
import FormContainer from "../rjsf/FormContainer";

export default function Modal({
  modal,
  setModal,
  formSchema,
  uiSchema,
  submitForm,
}) {
  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <>
      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <FormContainer
              schema={formSchema}
              uiSchema={uiSchema}
              onSubmitAction={submitForm}
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
