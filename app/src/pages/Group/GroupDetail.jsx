import React, { useEffect, useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/groupschema.json";
import ObjectFieldTemplate from "../../components/rjsf/ObjectFieldTemplate";
import ArrayFieldTemplate from "../../components/rjsf/ArrayFieldTemplate";
import SubmitButton from "../../components/rjsf/SubmitButton";
import {
  deleteGroup,
  getGroupId,
  updateGroup,
} from "../../services/GroupService";
import { useParams } from "react-router-dom";
import { getUser } from "../../services/UserService";

const GroupDetail = () => {
  const [formData, setFormData] = useState(null);
  const [group, setGroup] = useState(null);
  const [leader, setLeader] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const username = sessionStorage.getItem("username");

  const { id } = useParams();

  const handleSubmit = async ({ formData }) => {
    updateGroup(formData);
  };

  useEffect(() => {
    const fetchGroup = async () => {
      const result = await getGroupId(id);

      if (!result || result === undefined)
        return (window.location.href = "/group");
      setGroup(result);
      setFormData(result);
    };
    fetchGroup();
  }, [id]);

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
      deleteGroup(group.id);
    }
  };

  return (
    <div className="group__detail">
      <h4 className="group__detail__title">{group?.groupName} group</h4>

      <h5 className="group__detail__subtitle">
        {username === leader?.username ? "You are " : leader?.username + " is"}{" "}
        admin
      </h5>

      <div className="group__detail__information">
        {!isEdit ? (
          <div>
            <h4>Leader</h4>
            <p className="group__detail__information--border">
              {leader?.userEmail}({leader?.username})
            </p>
            <hr />
            <h4>Members</h4>
            <ul className="members__list">
              {group?.groupUserEmails.map((member) => {
                return (
                  <li key={member} className="member__item">
                    {member}
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <Form
            schema={{ ...schema, button: "Update" }}
            formData={formData}
            onChange={(e) => setFormData(e.formData)}
            validator={validator}
            templates={{
              ObjectFieldTemplate,
              ButtonTemplates: { SubmitButton },
              ArrayFieldTemplate,
            }}
            onSubmit={handleSubmit}
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
