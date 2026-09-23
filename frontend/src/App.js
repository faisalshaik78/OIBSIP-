import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Register from './pages/Register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import OrderDashboard from './pages/OrderDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function RootRedirect() {
  const { token, role } = useAuth();

  if (!token) return <Navigate to="/login" replace />;
  if (role === 'admin') return <Navigate to="/admin/dashboard" replace />;
  return <Navigate to="/order" replace />;
}

function AppRoutes() {
  const { token, role } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/register" element={token ? <Navigate to={role === 'admin' ? '/admin/dashboard' : '/order'} replace /> : <Register />} />
      <Route path="/login" element={token ? <Navigate to={role === 'admin' ? '/admin/dashboard' : '/order'} replace /> : <Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route
        path="/order"
        element={
          <ProtectedRoute requiredRole="user">
            <OrderDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/admin/login" element={token ? <Navigate to={role === 'admin' ? '/admin/dashboard' : '/order'} replace /> : <AdminLogin />} />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
