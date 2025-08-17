import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles }) => {
  // Get auth state from Redux
  const { user, token } = useSelector((state) => state.auth);

  if (!token) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Logged in but role not authorized
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
