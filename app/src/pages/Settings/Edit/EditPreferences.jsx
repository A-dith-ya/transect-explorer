import React from "react";
import SettingsList from "../../../components/layout/sidebar/SettingsSidebar";
import "../index.css";
import { getUser } from "../../../services/UserService";

function EditPreferences() {
  return (
    <div className="edit">
      <div className="title"> Edit Preferences </div>
      <SettingsList />
    </div>
  );
}

export default EditPreferences;
