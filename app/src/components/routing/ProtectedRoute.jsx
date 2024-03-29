import { Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
