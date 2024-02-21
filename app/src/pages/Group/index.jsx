import React, { useEffect, useState } from "react";
import { getGroupUser } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../components/group/GroupCard";
import "./style.css";

const Group = () => {
  const userId = sessionStorage.getItem("id").toString();
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getGroups = async () => {
      const response = await getGroupUser(userId);
      setGroups(response);
    };
    getGroups();
  }, []);

  return (
    <div className="container">
      <div className="group-box">
        {groups?.map((group) => (
          <GroupCard key={group.id} group={group} />
        ))}
        <button
          onClick={() => navigate("/create-group")}
          className="create-group-btn"
        >
          <i class="fa-solid fa-plus"></i>
        </button>
      </div>
    </div>
  );
};

export default Group;
