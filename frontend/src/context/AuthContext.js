import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

function readStorage(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function readProfile() {
  const raw = readStorage('profile');
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    localStorage.removeItem('profile');
    return null;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => readStorage('token'));
  const [role, setRole] = useState(() => readStorage('role'));
  const [profile, setProfile] = useState(() => readProfile());

  function login({ token: nextToken, role: nextRole, profile: nextProfile }) {
    const safeToken = nextToken || null;
    const safeRole = nextRole || null;

    try {
      if (safeToken) localStorage.setItem('token', safeToken);
      else localStorage.removeItem('token');

      if (safeRole) localStorage.setItem('role', safeRole);
      else localStorage.removeItem('role');

      if (nextProfile) localStorage.setItem('profile', JSON.stringify(nextProfile));
      else localStorage.removeItem('profile');
    } catch {
      // Ignore storage issues in restricted browser contexts.
    }

    setToken(safeToken);
    setRole(safeRole);
    setProfile(nextProfile || null);
  }

  function logout() {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('profile');
    } catch {
      // Ignore storage issues in restricted browser contexts.
    }

    setToken(null);
    setRole(null);
    setProfile(null);
  }

  const value = useMemo(
    () => ({
      token,
      role,
      profile,
      login,
      logout,
      isAuthenticated: Boolean(token),
      isAdmin: role === 'admin',
      isUser: role === 'user',
    }),
    [token, role, profile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
