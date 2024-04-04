import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { groupFormSchema } from "../../components/rjsf/schema/GroupFormSchema";
import { getUser } from "../../services/UserService";
import {
  deleteGroup,
  getGroupId,
  updateGroup,
} from "../../services/GroupService";
import FormContainer from "../../components/rjsf/FormContainer";
import validator from "@rjsf/validator-ajv8";
import ObjectFieldTemplate from "../../components/rjsf/template/ObjectFieldTemplate";
import GroupArrayFieldTemplate from "../../components/rjsf/template/GroupArrayFieldTemplate";
import SubmitButton from "../../components/rjsf/template/SubmitButton";
import TransectList from "../../components/transects/TransectList";
import MemberList from "../../components/group/MemberList";
import "./index.css";

const GroupDetail = () => {
  const [formData, setFormData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [members, setMembers] = useState([]);

  const username = sessionStorage.getItem("username");

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    updateGroup(formData).then(() => {
      setIsEdit(false);
    });
  };

  useEffect(() => {
    async function fetchLeader() {
      const leader = await getUser(formData?.groupLeaderId);
      const temp = [];
      console.log(leader);

      temp.push({
        role: "Leader",
        name: leader.username,
        email: leader.userEmail,
      });

      formData.groupUserEmails.forEach((item) => {
        temp.push({
          role: "Member",
          name: "N/A",
          email: item,
        });
      });

      setMembers(temp);
    }

    if (formData && members.length === 0) {
      fetchLeader();
    }
  }, [formData, members]);

  useEffect(() => {
    const fetchGroup = async () => {
      const result = await getGroupId(id);
      setFormData(result);
    };

    fetchGroup();
  }, [id, editable]);

  const handleEdit = () => {
    setEditable(!editable);
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete " + formData.groupName)) {
      deleteGroup(formData.id, navigate);
    }
  };

  return (
    <div className="details-page">
      <div className="details-page-title">
        <button className="icon-btn" onClick={() => navigate("/group")}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <h1>{formData?.groupName}</h1>
      </div>

      <div>
        {editable && (
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
            }}
            onSubmitAction={handleSubmit}
            arrayFieldTemplate={GroupArrayFieldTemplate}
          />
        )}
      </div>

      {!editable && (
        <>
          <div>
            <h2>Members</h2>
            <MemberList data={members} />
          </div>

          <div>
            <h2>Transects</h2>
            <TransectList group_id={id} />
          </div>
        </>
      )}

      {username === members[0]?.name && (
        <div className="btn-div">
          <button className="text-btn" onClick={handleDelete}>
            Delete
          </button>
          <button className="text-btn" onClick={handleEdit}>
            {editable ? "Cancel" : "Edit"}
          </button>
        </div>
      )}

      {/* <GroupTransects onAddClick={() => {}} /> */}
    </div>
  );
};

export default GroupDetail;
