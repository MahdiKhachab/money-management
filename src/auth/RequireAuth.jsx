import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Guards admin routes; optionally restricts to a role (e.g. "ADMIN").
const RequireAuth = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (role && user.role !== role) {
    return <Navigate to="/admin" replace />;
  }
  return <Outlet />;
};

export default RequireAuth;
