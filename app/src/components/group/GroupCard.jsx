import { useNavigate } from "react-router-dom";
const GroupCard = ({ group }) => {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("id");

  return (
    <div onClick={() => navigate(`/group/${group.id}`)} className="group__card">
      {+id === group.groupLeaderId && <i className="fa-solid fa-user-tie"></i>}
      <h1
        className="group__card__header"
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
