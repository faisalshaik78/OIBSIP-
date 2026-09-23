import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, requiredRole }) {
  const { token, role, isAdmin, isUser } = useAuth();

  if (!token) {
    return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
  }

  if (requiredRole && role !== requiredRole) {
    if (isAdmin) return <Navigate to="/admin/dashboard" replace />;
    if (isUser) return <Navigate to="/order" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
