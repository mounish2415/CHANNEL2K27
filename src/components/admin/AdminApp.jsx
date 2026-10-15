import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';

export default function AdminApp({ onReturnToSite }) {
  const [token, setToken] = useState(() => localStorage.getItem('channel2k27_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('channel2k27_admin_user') || 'null');
    } catch {
      return null;
    }
  });

  const handleLoginSuccess = (newToken, user) => {
    localStorage.setItem('channel2k27_admin_token', newToken);
    localStorage.setItem('channel2k27_admin_user', JSON.stringify(user));
    setToken(newToken);
    setAdminUser(user);
    window.history.pushState({}, '', '/admin/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('channel2k27_admin_token');
    localStorage.removeItem('channel2k27_admin_user');
    setToken('');
    setAdminUser(null);
    window.history.pushState({}, '', '/admin/login');
  };

  if (!token) {
    return (
      <AdminLogin
        onLoginSuccess={handleLoginSuccess}
        onReturnToSite={onReturnToSite}
      />
    );
  }

  return (
    <AdminDashboard
      token={token}
      adminUser={adminUser}
      onLogout={handleLogout}
      onReturnToSite={onReturnToSite}
    />
  );
}
