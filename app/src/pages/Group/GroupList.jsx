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
      // Check if both userGroups and leaderGroups exist and are arrays before spreading
      const userGroups = Array.isArray(response.userGroups)
        ? response.userGroups
        : [];
      const leaderGroups = Array.isArray(response.leaderGroups)
        ? response.leaderGroups
        : [];
      const combinedGroups = [...userGroups, ...leaderGroups];
      setGroups(combinedGroups);
      console.log("Group response:", combinedGroups, "for user:", userId);
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
