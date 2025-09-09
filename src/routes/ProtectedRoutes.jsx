import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ allowedRoles }) => {
  const mockUser = {
    role: 'pets', 
    isAuthenticated: true
  }

  if (!mockUser.isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(mockUser.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  return <Outlet />
}

export default ProtectedRoutes