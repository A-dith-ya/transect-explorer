import React from "react";
import { useState } from "react";
import { Link, useMatch, useResolvedPath, useLocation} from "react-router-dom";
import "./NavBar.css";
import groupIcon from "../../../assets/group-icon.png";
import pinIcon from "../../../assets/pin-icon.png";
import addIcon from "../../../assets/add-icon.png";
import settingsIcon from "../../../assets/settings-icon.png";
import regionIcon from "../../../assets/region-icon.png";

export default function NavBar() {
  const location = useLocation();
  const hiddenPaths = ['/login', '/register'];
  const isHidden = hiddenPaths.includes(location.pathname);

  if(isHidden){
    return null;
  }

  
  return (
    <div className="navbar">
      <ul className="navbar-list">
          <CustomLink to="/add">
            <img src={addIcon} alt="Add Transect" className="icon" />
          </CustomLink>
          <CustomLink to="/region" >
            <img src={regionIcon} alt="Region" className="icon" />
          </CustomLink>
          <CustomLink to="/map">
            <img src={pinIcon} alt="Map" className="icon" />
          </CustomLink>
          <CustomLink to="/group">
            <img src={groupIcon} alt="Group" className="icon" />
          </CustomLink>
          <CustomLink to="/settings">
            <img src={settingsIcon} alt="Settings" className="icon" />
          </CustomLink>
      </ul>
    </div>
  );
};

function CustomLink({ to, children, ...props }) {
  const location = useLocation();
  const pathname = to.split('?')[0]; // Extract pathname from to
  const resolvedPath = useResolvedPath(pathname);
  const isActive = useMatch({ path: resolvedPath?.pathname });

  //Checks if page is child of navlink page to set active styling ex. /group/create-group should have the group navbar button styled as active
  const isActiveOrChild = isActive ? true : location.pathname.startsWith(pathname); 

  return (
    <li className={isActiveOrChild ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}