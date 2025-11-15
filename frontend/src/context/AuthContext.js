// src/context/AuthContext.js
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useState } from 'react';
import { login as loginService } from '../services/authService';
import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(token ? jwtDecode(token) : null);

  const login = async (credentials) => {
    const response = await loginService(credentials);
    const { token } = response.data;
    const decodedUser = jwtDecode(token);
    setToken(token);
    setUser(decodedUser);
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    // ...
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
