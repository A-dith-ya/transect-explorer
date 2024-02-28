import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import groupIcon from "../../../assets/group-icon.png";
import pinIcon from "../../../assets/pin-icon.png";
import addIcon from "../../../assets/add-icon.png";
import settingsIcon from "../../../assets/settings-icon.png";
import regionIcon from "../../../assets/region-icon.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <Link to="/add">
            <img src={addIcon} alt="Add Transect" className="icon" />
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link to="/region">
            <img src={regionIcon} alt="Region" className="icon" />
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link to="/map">
            <img src={pinIcon} alt="Map" className="icon" />
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link to="/group">
            <img src={groupIcon} alt="Group" className="icon" />
          </Link>
        </li>
        <li className="navbar-list-item">
          <Link to="/settings">
            <img src={settingsIcon} alt="Settings" className="icon" />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
