import React, { useState, useEffect } from 'react';
import AdminLoginPage from '../pages/AdminLoginPage';

const ProtectedAdminRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const adminLogged = localStorage.getItem('adminLogged');
    if (adminLogged === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLogged');
    localStorage.removeItem('adminUsername');
    setIsAuthenticated(false);
  };

  if (loading) {
    return <div className="min-h-screen bg-black" />;
  }

  if (!isAuthenticated) {
    return <AdminLoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      {React.cloneElement(children, { onLogout: handleLogout })}
    </>
  );
};

export default ProtectedAdminRoute;
