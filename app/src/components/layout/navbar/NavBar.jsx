import React from 'react';
import './NavBar.css'; // Importing the CSS file
import groupIcon from '../../../assets/group-icon.png'
import pinIcon from '../../../assets/pin-icon.png'
import addIcon from '../../../assets/add-icon.png'
import settingsIcon from '../../../assets/settings-icon.png'
import regionIcon from '../../../assets/region-icon.png'

const NavBar = () => {
  return (
    <div className="navbar"> 
      <ul className="navbar-list">
        <li className="navbar-list-item">
          <img src={addIcon} alt="Add Transect" className='icon'/>
        </li>
        <li className="navbar-list-item">
          <img src={regionIcon} alt="Region" className='icon'/>
        </li>
        <li className="navbar-list-item">
          <img src={pinIcon} alt="Map" className='icon'/>
        </li>
        <li className="navbar-list-item">
          <img src={groupIcon} alt="Group" className='icon' />
        </li>
        <li className="navbar-list-item">
          <img src={settingsIcon} alt="Settings" className='icon'/>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;