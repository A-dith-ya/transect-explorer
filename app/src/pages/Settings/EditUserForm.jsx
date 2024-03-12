import React from 'react';
import Sidebar from "../../components/layout/sidebar/Sidebar";
import "./sidebar.css";
import { getUser } from "../../services/UserService";


function EditUserForm() {
  return (
    <div className="edit">
     <div className="title"> Edit User </div>
        
    <Sidebar />
    </div>
  )
}

export default EditUserForm;
