import React, { useContext, useEffect, useState } from "react";
import "./index.css";
import {
  getUser,
  updateUser,
  updateEmail,
  updatePassword,
} from "../../services/UserService";
import Modal from "../../components/Modal/Modal";
import UISchemas from "../../components/rjsf/UISchema/UISchema";
import { resetUsernameFormSchema } from "../../components/rjsf/schema/ResetUsernameFormSchema";
import { resetEmailFormSchema } from "../../components/rjsf/schema/ResetEmailFormSchema";
import { resetPasswordFormSchema } from "../../components/rjsf/schema/ResetPasswordFormSchema";
import AuthContext from "../../contexts/AuthContext";
import { logoutUser } from "../../services/UserService";
import { toFormData } from "axios";
import { useNavigate } from "react-router-dom";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userModal, setUserModal] = useState(false);
  const [emailModal, setEmailModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const id = sessionStorage.getItem("id");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
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
          onClick: () => {
            setUserModal(true);
          },
        },
        {
          title: "Email",
          value: userData.userEmail,
          buttonName: "Email",
          buttonIcon: "fa-solid fa-pen-to-square",
          buttonType: "edit-button",
          onClick: () => {
            setEmailModal(true);
          },
        },
        {
          title: "Password",
          value: "Would you like to change your password?",
          buttonName: " Password",
          buttonIcon: "fa-solid fa-pen-to-square",
          buttonType: "edit-button",
          onClick: () => {
            setPasswordModal(true);
          },
        },
        {
          title: "Logout",
          value: "Are you sure you want to logout?",
          buttonName: "Logout",
          buttonIcon: "fa-solid fa-arrow-right-from-bracket",
          buttonType: "delete-button",
          onClick: async () => {
            await logoutUser(logout, navigate);
          },
        },
      ];
      setData(data);
    }
  }, [userData]);

  const handleResetUserSubmit = (formData) => {
    updateUser(formData, id, navigate);
  };

  const handleResetEmailSubmit = (formData) => {
    console.log(userData.userEmail);
    const email = userData.userEmail;
    const newformData = { ...formData, email };
    console.log(newformData);
    updateEmail(newformData, id, navigate);
  };

  const handleResetPasswordSubmit = (formData) => {
    console.log(formData);
    updatePassword(formData, id, navigate);
  };

  return (
    <div className="settings-page">
      <div className="page-title">Account Settings</div>
      <div className="wrapper">
        <div className="accordion">
          {data.map((item, index) => (
            <div className="accordion-item" key={`${item.title}-${index}`}>
              <div
                className={
                  selected === index
                    ? "accordion-item-title show"
                    : "accordion-item-title"
                }
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
                <button className={item.buttonType} onClick={item.onClick}>
                  {" "}
                  <i className={item.buttonIcon}></i> {item.buttonName}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {userModal && (
        <Modal
          modal={userModal}
          setModal={setUserModal}
          formSchema={resetUsernameFormSchema}
          uiSchemas={UISchemas.resetUsernameUISchema}
          submitForm={handleResetUserSubmit}
        />
      )}

      {emailModal && (
        <Modal
          modal={emailModal}
          setModal={setEmailModal}
          formSchema={resetEmailFormSchema}
          uiSchemas={UISchemas.resetEmailUISchema}
          submitForm={handleResetEmailSubmit}
        />
      )}

      {passwordModal && (
        <Modal
          modal={passwordModal}
          setModal={setPasswordModal}
          formSchema={resetPasswordFormSchema}
          uiSchemas={UISchemas.resetPasswordUISchema}
          submitForm={handleResetPasswordSubmit}
        />
      )}
    </div>
  );
};

export default SettingsPage;
