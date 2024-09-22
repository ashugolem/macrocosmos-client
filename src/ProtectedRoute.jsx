import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, roles }) => {
  const userRole = useSelector((state) => state.setLog.role);
  const location = useLocation()
  if (roles.includes(userRole)) {
    return children;
  } else {
    // Redirection to a login page
    return <Navigate to="/login" state= {{ from: location }}  replace />;
  }
};

export default ProtectedRoute;
