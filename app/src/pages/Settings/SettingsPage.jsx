import React, { useEffect, useState } from "react";
import SettingsList from "../../components/layout/sidebar/SettingsSidebar";
import "./index.css";
import { getUser } from "../../services/UserService";
import { useRef } from "react";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const dialogRef = useRef();
  const [selected, setSelected] = useState(null);

  const toggle = (index) => {
    if (selected == index) {
      return setSelected(null);
    }

    setSelected(index);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const result = await getUser();
        setUserData(result);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, []);

  const data = [
    {
      title: "Username",
      value: "TestUser",
    },
    {
      title: "Email",
      value: "UserEmailAddress",
    },
    {
      title: "Password",
      value: "Change password",
    },
    {
      title: "Logout",
      value: "Are you sure you want to logout?",
    },
  ];

  return (
    <div className="settings-page">
      <div className="settings-page-title">Account Settings</div>
      <div className="wrapper">
        <div className="accordion">
          {data.map((item, index) => (
            <div className="accordion-item">
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
                {item.value}
                <button>Button</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
