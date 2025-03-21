import { createContext, useState, useEffect } from "react";
import { login, logout, getCurrentUser, isAuthenticated } from "../services/api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (isAuthenticated()) {
      getCurrentUser().then(setUser).catch(() => logout());
    }
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error(error); 
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
