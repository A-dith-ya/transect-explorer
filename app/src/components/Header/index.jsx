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
    <header className="header">
      <div className="header__content">
        <img
          src="https://th.bing.com/th/id/OIG3.c9TTuw7Bt8mTz4v7uFA2?w=173&h=173&c=6&r=0&o=5&pid=ImgGn"
          alt="logo"
          className="header__content__image"
          onClick={() => navigate("/")}
        />
        <div className="header__content__right">
          {user && (
            <button
              onClick={() => navigate("/group")}
              className="header__content__button"
            >
              <h3 className="header__content__button__text">MY GROUPS</h3>
            </button>
          )}
          <UserButton />
          {user && (
            <button
              onClick={handleLogout}
              className="header__content__button--logout"
            >
              <i
                style={{ color: "#E79C55" }}
                className="fa-solid fa-right-from-bracket"
              ></i>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
