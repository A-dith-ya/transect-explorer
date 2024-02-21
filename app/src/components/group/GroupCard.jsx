import { useNavigate } from "react-router-dom";
import "./GroupCardStyle.css";
const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  return (
    <div onClick={() => navigate(`/group/${group.id}`)} className="group-card">
      {+id === group.groupLeader.id && <i class="fa-solid fa-user-tie"></i>}
      <h1
        style={{
          fontWeight: "bold",
          fontSize: "25px",
          textAlign: "center",
          color: "#555",
        }}
      >
        {group.groupName}
      </h1>
    </div>
  );
};

export default GroupCard;
