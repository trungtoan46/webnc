import { createContext, useState, useEffect } from "react";
import { login, logout, getCurrentUser, isAuthenticated, register } from "../services/api/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  useEffect(() => {
    if (isAuthenticated()) {
      getCurrentUser().then(setUser).catch(() => logout());
    }
  }, []);


  // Đăng ký tài khoản
  const handleRegister = async (userData) => {
    try {
      const response = await register(userData);
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error; // Throw the error để component có thể bắt và hiển thị
    }
  };
    // Đăng nhập
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
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, handleRegister }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
