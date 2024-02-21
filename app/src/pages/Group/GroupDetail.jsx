import React, { useEffect, useState } from "react";
import Form from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import schema from "../../jsonSchemas/groupschema.json";
import ObjectFieldTemplate from "../../components/rjsf/ObjectFieldTemplate";
import ArrayFieldTemplate from "../../components/rjsf/ArrayFieldTemplate";
import SubmitButton from "../../components/rjsf/SubmitButton";
import { createGroup, getGroupId } from "../../services/GroupService";
import { useParams } from "react-router-dom";
// import { Icon } from "@iconify/react";

function GroupTransects(props) {
  return (
    <div className="group-button group-transects">
      <div className="btn-flex">
        <h1>Group Transects</h1>
        <button className="add-btn" onClick={props.onAddClick}>
          {/* <Icon icon="mdi:bell" /> */}
        </button>
      </div>
      <div className="form-border">
        <button className="link-btn">MountDoom</button>
        <button className="link-btn">Frosty Forest</button>
        <button className="link-btn">Merry Meadow</button>
      </div>
    </div>
  );
}

const GroupDetail = () => {
  const [formData, setFormData] = useState(null);
  const [group, setGroup] = useState(null);
  const username = sessionStorage.getItem("username");

  const { id } = useParams();

  const handleSubmit = async ({ formData }) => {
    createGroup(formData);
  };

  useEffect(() => {
    const fetchGroup = async () => {
      const result = await getGroupId(id);
      setGroup(result);
    };
    fetchGroup();
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h4
        style={{
          fontWeight: "bold",
          color: "#555",
        }}
      >
        {group?.groupName} group
      </h4>

      <h5
        style={{
          fontStyle: "italic",
          border: "2px solid #547ED9	",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {username === group?.groupLeader.username
          ? "You are "
          : group?.groupLeader.username + " is"}{" "}
        admin
      </h5>
      <GroupTransects onAddClick={() => {}} />
      {username === group?.groupLeader.username && (
        <Form
          schema={schema}
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
    </div>
  );
};

export default GroupDetail;
