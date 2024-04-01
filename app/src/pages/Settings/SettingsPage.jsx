import React, { useEffect, useState } from "react";
import SettingsList from "../../components/layout/sidebar/SettingsSidebar";
import "./index.css";
import { getUser } from "../../services/UserService";
import { useRef } from "react";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const id = sessionStorage.getItem("id");
  console.log(userData);

  const toggle = (index) => {
    if (selected == index) {
      return setSelected(null);
    }

    setSelected(index);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUser(id);
        setUserData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [id]);

  useEffect(() => {
    if (userData && userData.username) {
      const data = [
        {
          title: "Username",
          value: userData.username,
          buttonName: "Username",
          buttonIcon: "fa-solid fa-pen-to-square",
          buttonType: "edit-button",
        },
        {
          title: "Email",
          value: userData.userEmail,
          buttonName: "Email",
          buttonIcon: "fa-solid fa-pen-to-square",
          buttonType: "edit-button",
        },
        {
          title: "Password",
          value: "Would you like to change your password?",
          buttonName: " Password",
          buttonIcon: "fa-solid fa-pen-to-square",
          buttonType: "edit-button",
        },
        {
          title: "Logout",
          value: "Are you sure you want to logout?",
          buttonName: "Logout",
          buttonIcon: "fa-solid fa-arrow-right-from-bracket",
          buttonType: "delete-button",
        },
      ];
      setData(data);
    }
  }, [userData]);

  return (
    <div className="settings-page">
      <div className="page-title">Account Settings</div>
      <div className="wrapper">
        <div className="accordion">
          {data.map((item, index) => (
            <div className="accordion-item" key={`${item.title}-${index}`}>
              <div
                className="accordion-item-title"
                onClick={() => toggle(index)}
              >
                <h2>{item.title}</h2>
                {selected === index ? (
                  <i className="fa-solid fa-caret-up"></i> // Use different icon when selected
                ) : (
                  <i className="fa-solid fa-caret-down"></i>
                )}
              </div>
              <div
                className={
                  selected === index
                    ? "accordion-item-content show"
                    : "accordion-item-content"
                }
              >
                <div className="accordion-value">{item.value}</div>
                <button className={item.buttonType}>
                  {" "}
                  <i className={item.buttonIcon}></i> {item.buttonName}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
