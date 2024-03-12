import React, { useEffect, useMemo, useState } from "react";
import { getGroupLeader, getGroupUser } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../components/group/GroupCard";
import "./style.css";

const GroupList = () => {
  const userId = sessionStorage.getItem("id")?.toString();
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState("all");

  const navigate = useNavigate();
  useEffect(() => {
    const getGroups = async () => {
      const response = await getGroupUser(userId);
      setGroups(response);
    };
    const getGroupsLeader = async () => {
      const response = await getGroupLeader(userId);
      setGroups(response);
    };
    if (groupSelected === "leader") {
      getGroupsLeader();
    } else {
      getGroups();
    }
  }, [groupSelected]);

  return (
    <div className="group">
      <div className="group__nav">
        <button
          className="group__nav__btn all__groups"
          onClick={() => setGroupSelected("all")}
          style={{
            backgroundColor: groupSelected === "all" ? "#547ed9" : "",
          }}
        >
          All Groups
        </button>
        <button
          className="group__nav__btn group__leader"
          onClick={() => setGroupSelected("leader")}
          style={{
            backgroundColor: groupSelected === "leader" ? "#e79c55" : "",
          }}
        >
          Groups Leader
        </button>
      </div>
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
  );
};

export default GroupList;
