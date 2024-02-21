import UserButton from "../user/UserButton";
import { useNavigate } from "react-router-dom";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("username");
  const handleLogout = () => {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("userEmail");
    navigate("/");
  };
  return (
    <header style={{ width: "100%" }}>
      <div className="header-wrap">
        <img
          src="https://th.bing.com/th/id/OIG3.c9TTuw7Bt8mTz4v7uFA2?w=173&h=173&c=6&r=0&o=5&pid=ImgGn"
          height={"60px"}
          alt="logo"
          style={{
            borderRadius: "50px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/")}
        />
        <div className="header-right-content ">
          {user && (
            <button
              onClick={() => navigate("/group")}
              className="header-group-button"
            >
              <h3 style={{ color: "#2CEAA3" }}>MY GROUPS</h3>
            </button>
          )}
          <UserButton />
          {user && (
            <button onClick={handleLogout} className="header-logout-button">
              <i
                style={{ color: "#E79C55" }}
                class="fa-solid fa-right-from-bracket"
              ></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
