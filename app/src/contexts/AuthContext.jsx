import { createContext, useEffect, useState } from "react";
import { getUser } from "../services/UserService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const checkIsAuthenticated = async () => {
    try {
      const userId = sessionStorage.getItem("id");
      const response = await getUser(userId);
      if (response.id == userId) {
        login();
      } else {
        logout();
      }
    } catch (error) {
      logout();
    }
    setIsAuthenticating(false);
  };

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  useEffect(() => {
    checkIsAuthenticated();
  }, []);

  const authContextValue = {
    isAuthenticated,
    login,
    logout,
    isAuthenticating,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
