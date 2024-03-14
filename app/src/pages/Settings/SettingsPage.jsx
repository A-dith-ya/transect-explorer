import React, { useEffect, useState } from "react";
import SettingsList from "../../components/layout/sidebar/SettingsSidebar";
import "./index.css";
import { getUser } from "../../services/UserService";
import { useRef } from "react";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const dialogRef = useRef();

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

  return (
    <div className="page">
      <div className="panel">
        <button style={{
        }}>
          Account
        </button>
        <button>
          Preferences
        </button>
        <button id="deactivate" className="text-btn"
          onClick={function () {
            dialogRef.current.showModal();
          }}
        >
          Deactivate Account
        </button>
      </div>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  );
};

export default SettingsPage;

/**
      <div className="settings">
        <h3> Account Settings </h3>
        <SettingsList />
        <form>
          {userData ? (
            <p> {userData.username} </p>
          ) : (
            <ul>
              <li>
                {" "}
                <h5>Username:</h5> <input />{" "}
              </li>
              <li>
                {" "}
                <h5>Email:</h5> <input />{" "}
              </li>
              <li>
                {" "}
                <h5>Password:</h5> <input />
              </li>
            </ul>
          )}
          <div className="edit">
            <button style={{ }} className="text-btn">Save</button>

            <button className="text-btn">Cancel</button>
          </div>
        </form>
        <div id="myModal" className="modal">
          {" "}
        </div>
      </div>
      <dialog ref={dialogRef}>
        <form method="dialog">
          Are you sure you want to deactivate your account?
          <div className="dialog">
            <button>Yes</button>
            <button
              onClick={function () {
                dialogRef.current.close();
              }}
            >
              No
            </button>
          </div>
        </form>
      </dialog>
 */
