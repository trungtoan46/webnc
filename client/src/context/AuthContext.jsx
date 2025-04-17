import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await api.get('/auth/me', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setUser(response.data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      console.log(token);
      setUser(user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Đăng nhập thất bại'
      };
    }
  };

  const register = async (userData) => {
    console.log("Username:", userData.username);
    console.log("Email:", userData.email);
    console.log("Password:", userData.password);

    try {
      const response = await api.post('/auth/register', {
        username: userData.username,
        email: userData.email,
        password: userData.password
      });

      console.log(response.data);
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      setUser(user);

      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);

      return {
        success: false,
        error: error.response?.data?.message || 'Đăng ký thất bại'
      };
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const updateUserProfile = async (profileData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.put('/auth/profile', profileData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data);
      return { success: true };
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Cập nhật thông tin thất bại');
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    handleLogout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

