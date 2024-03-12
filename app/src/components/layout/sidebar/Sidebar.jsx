import React from 'react';
import { SidebarData } from './SidebarData';


function Sidebar() {
  return (
  <div className="sidebar"> 
   <ul className = "sidebarlist">
    {SidebarData.map((val, key) => {
      return (
        <li
          key={key}
          className="row" 
          id={window.location.pathname == val.link ? "active" : ""}
          onClick={() => {
            window.location.pathname = val.link;
          }} 
        > 
          <div id="options"> {val.title} </div>
        </li>
      );
    })}
   </ul>
  </div>
  );
}


export default Sidebar;

