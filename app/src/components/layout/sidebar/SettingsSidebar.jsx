import React, { useState } from "react";
import { SettingsData } from "./SettingsData";

function SettingsList() {
  const [collapsed, setCollapsed] = useState(true);

  const handleItemClick = (link) => {
    setCollapsed(!collapsed);
    window.location.pathname = link;
  };

  const handleExpand = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="sidebar">
      {!collapsed ? (
        <ul>
          {SettingsData.map((val, key) => (
            <li
              key={key}
              id={window.location.pathname === val.link ? "active" : ""}
              onClick={() => handleItemClick(val.link)}
            >
              <div id="options"> {val.title} </div>
            </li>
          ))}
        </ul>
      ) : (
        <button onClick={handleExpand}>Options</button>
      )}
    </div>
  );
}

export default SettingsList;
