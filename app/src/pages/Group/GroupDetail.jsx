import React, { useEffect, useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";

import { groupFormSchema } from "../../components/rjsf/schema/GroupFormSchema";
import ObjectFieldTemplate from "../../components/rjsf/template/ObjectFieldTemplate";
import GroupArrayFieldTemplate from "../../components/rjsf/template/GroupArrayFieldTemplate";
import SubmitButton from "../../components/rjsf/template/SubmitButton";
import {
  deleteGroup,
  getGroupId,
  updateGroup,
} from "../../services/GroupService";
import { useNavigate, useParams } from "react-router-dom";
import { getUser } from "../../services/UserService";
import "./index.css";
import FormContainer from "../../components/rjsf/FormContainer";

const GroupDetail = () => {
  const [formData, setFormData] = useState(null);
  const [group, setGroup] = useState(null);
  const [leader, setLeader] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const username = sessionStorage.getItem("username");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    updateGroup(formData).then(() => {
      setIsEdit(false);
    });
  };

  useEffect(() => {
    const fetchGroup = async () => {
      const result = await getGroupId(id);
      setGroup(result);
      setFormData(result);
    };
    fetchGroup();
  }, [id, isEdit]);

  useEffect(() => {
    const fetchLeader = async () => {
      if (group) {
        const result = await getUser(group.groupLeaderId);
        setLeader(result);
      }
    };
    fetchLeader();
  }, [group]);

  const handleEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete " + group.groupName)) {
      deleteGroup(group.id, navigate);
    }
  };

  return (
    <div className="group__detail">
      {/* <button
        className="group__detail__button--back"
        onClick={() => navigate("/group")}
      >
        <i className="fa-solid fa-arrow-left"></i>
      </button> */}
      <button
        className="group__detail__button--repeat"
        onClick={() => navigate("/group")}
      >
        <i className="fa-solid fa-repeat"></i>
      </button>
      <h1 className="group__detail__title">{group?.groupName} group</h1>

      <h5 className="group__detail__subtitle">
        {username === leader?.username ? "You are " : leader?.username + " is"}{" "}
        admin
      </h5>

      <div className="group__detail__information">
        {!isEdit ? (
          <div>
            <h2>Leader</h2>
            <p className="member__item">
              {leader?.userEmail} - {leader?.username}
            </p>
            <hr />
            <h2>Members</h2>
            <ul className="members__list">
              {group?.groupUserEmails.map((member) => {
                const username = member.split("@")[0]; // Extracts the part before the '@'
                return (
                  <li key={member} className="member__item">
                    {member} - {username}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <FormContainer
            schema={{ ...groupFormSchema, button: "Update" }}
            formData={formData}
            setFormData={setFormData}
            onChange={(e) => setFormData(e.formData)}
            validator={validator}
            templates={{
              ObjectFieldTemplate,
              ButtonTemplates: { SubmitButton },
              GroupArrayFieldTemplate,
              // GroupArrayFieldTemplate,
            }}
            onSubmitAction={handleSubmit}
            arrayFieldTemplate={GroupArrayFieldTemplate}
          />
        )}

        {username === leader?.username && (
          <div className="detail__buttons">
            <button className="detail__buttons--delete" onClick={handleDelete}>
              Delete
            </button>
            <button className="detail__buttons--edit" onClick={handleEdit}>
              {isEdit ? "Cancel" : "Edit"}
            </button>
          </div>
        )}
      </div>

      {/* <GroupTransects onAddClick={() => {}} /> */}
    </div>
  );
};

export default GroupDetail;
