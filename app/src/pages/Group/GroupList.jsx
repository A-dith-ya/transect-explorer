import React, { useEffect, useState } from "react";
import { getGroupUser } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../components/group/GroupCard";
import "./style.css";

const GroupList = () => {
  const userId = sessionStorage.getItem("id").toString();
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getGroups = async () => {
      const response = await getGroupUser(userId);
      setGroups(response);
      console.log("Group response: " + response);
    };
    getGroups();
  }, []);

  return (
    <>
      <div className="group__header">
        <h1 className="group__detail__title">My Groups</h1>
      </div>
      <div className="group">
        <div className="group__box">
          {groups?.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
          <button
            onClick={() => navigate("/create-group")}
            className="group__button--create"
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </div>
    </>
  );
};

export default GroupList;
