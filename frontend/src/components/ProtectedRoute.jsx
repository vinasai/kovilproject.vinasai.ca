// ProtectedRoute Component

import { Navigate } from 'react-router-dom';
import React from 'react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole');

  // Debug logs
  console.log('Token:', token);
  console.log('User Role:', userRole);
  console.log('Allowed Roles:', allowedRoles);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    console.log('Role not authorized');
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute; // Add this line to export the component
