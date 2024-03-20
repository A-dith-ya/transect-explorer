import React, { useEffect, useState } from "react";
import { getUserGroup } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../components/group/GroupCard";
import "./index.css";


const groups = [
  {
    role: "Leader",
    name: "Kool Kids Klub"
  },
  {
    role: "Member",
    name: "Range Branch"
  },
  {
    role: "Member",
    name: "Ecological Research Team"
  },
  // Add more transects as needed
];

const GroupList = () => {
  const userId = sessionStorage.getItem("id")?.toString();
  const [groupsData, setGroupsData] = useState({
    userGroups: [],
    leaderGroups: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await getUserGroup(userId);
      setGroupsData(response);
    };
    fetchGroups();
  }, [userId]);

  return (
    <div className="group">
      <div className="group__section">
        <h2 className="group__section__title">User groups</h2>
        <div className="group__box">
          {groupsData.userGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      </div>

      <div className="group__section">
        <h2 className="group__section__title">LeaderGroup</h2>
        <div className="group__box">
          {groupsData.leaderGroups.map((group) => (
            <GroupCard key={group.id} group={group} />
          ))}
          <button
            onClick={() => navigate("/group/create-group")}
            className="group__button--create"
          >
            <i className="fa-solid fa-plus" />
          </button>
        </div>
      </div>

      <div>

        <table>
          <thead>
            <th>Role</th>
            <th>Name</th>
          </thead>
          <tbody>
            {groups.map((item) => <tr> 
                <td>{item.role.charAt(0)}</td>
                <td>{item.name}</td>
              </tr>)}
          </tbody>
        </table>
        
      </div>

    </div>
  );
};

export default GroupList;
