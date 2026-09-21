import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [profile, setProfile] = useState(() => {
    const raw = localStorage.getItem('profile');
    return raw ? JSON.parse(raw) : null;
  });

  function login({ token, role, profile }) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('profile', JSON.stringify(profile));
    setToken(token);
    setRole(role);
    setProfile(profile);
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('profile');
    setToken(null);
    setRole(null);
    setProfile(null);
  }

  return <AuthContext.Provider value={{ token, role, profile, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
