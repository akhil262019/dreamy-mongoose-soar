import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "./AuthContext"; // Import UserRole type

interface ProtectedRouteProps {
  allowedRoles?: UserRole[]; // Optional: Specify roles that can access this route
  redirectPath?: string; // Optional: Path to redirect if not authenticated or role is not allowed
}

export const ProtectedRoute = ({ allowedRoles, redirectPath = "/login" }: ProtectedRouteProps) => {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login page if not authenticated
    return <Navigate to={redirectPath} state={{ from: location }} replace />;
  }

  // If specific roles are required and the current user's role is not allowed
  if (allowedRoles && !allowedRoles.includes(role)) {
    // Redirect to a generic dashboard or home page if role is not permitted
    console.log(`Access denied. User role: ${role}, Allowed roles: ${allowedRoles.join(', ')}`);
    // Fallback redirect: could be '/', '/dashboard', or a specific unauthorized page
    return <Navigate to="/" replace />;
  }

  // If authenticated and role is allowed (or no specific roles required)
  return <Outlet />;
};