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
    <>
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
            <button> Save </button>

            <button> Cancel </button>
          </div>
        </form>
        <button
          id="delete"
          onClick={function () {
            dialogRef.current.showModal();
          }}
        >
          Deactivate Account{" "}
        </button>
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
    </>
  );
};

export default SettingsPage;
