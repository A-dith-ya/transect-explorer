import React, {useEffect, useState} from 'react';
import Sidebar from "../../components/layout/sidebar/SettingsSidebar";
import "./sidebar.css";
import { getUser } from "../../services/UserService";


const SettingsPage = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async() => {
            try{
                const result = await getUser();
                setUserData(result);
            }
            catch(error){
                console.log(error);
            }
        };
        fetchUserData();
    }, []);

    return (

     <div className="settings">
        <div className="title"> Settings </div>
        <div className="info"> 
            {userData ? (
            <p> Username: {userData.username} </p>
            ) : (
            <p> Loading user data... </p>)} 

        </div>
        <Sidebar  />
                   
     </div>

        
    );
};

export default SettingsPage;
