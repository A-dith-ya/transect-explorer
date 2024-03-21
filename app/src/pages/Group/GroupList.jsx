import React, { useEffect, useState } from "react";
import { getUserGroup } from "../../services/GroupService";
import { useNavigate } from "react-router-dom";
import GroupCard from "../../components/group/GroupCard";
import "./index.css";


const testGroups = [
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
  const [data, setData] = useState([]);
  const [groups, setGroups] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await getUserGroup(userId);
      console.log(response);
      const arr = [];
      response.userGroups.forEach((item) => {
        arr.push({
          id: item.id,
          role: 'Member',
          name: item.groupName
        });
      });
      response.leaderGroups.forEach((item) => {
        arr.push({
          id: item.id,
          role: 'Leader',
          name: item.groupName
        });
      })
      setData(arr);
    };
    fetchGroups();
  }, [userId]);

  return (
    <div className='group-list-page'>

      <div className='title'>
        <h3>Groups</h3>
      </div>

      <div className='table-div group-list'>
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) =><tr key={item.id} onClick={() => navigate(`/group/${item.id}`)}> 
                <td key={Math.random()}>{item.role.charAt(0)}</td>
                <td key={Math.random()}>{item.name}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className='title'>
        <h3>Add Group</h3>
          <button className='icon-btn'>
            <i className="fa-solid fa-plus" />
        </button>
      </div>

    </div>
  );
};

export default GroupList;

/**

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
*/
