import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const UserLayout = () => {
  const user = sessionStorage.getItem("username");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      setIsLoading(false);
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  return isLoading ? <p>Loading...</p> : <Outlet />;
};

export default UserLayout;