import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  // Simulate authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const navigate = useNavigate();

  // Simulate login/logout for demonstration purposes
  useEffect(() => {
    // In a real app, this would come from authentication context or storage
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setIsLoggedIn(true);
      setUserRole(storedRole);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    setUserRole(null);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200">
          HMS
        </Link>
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
              <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
            </>
          ) : (
            <>
              {userRole === "admin" && (
                <Link to="/admin" className="text-white hover:text-blue-200">Admin Dashboard</Link>
              )}
              {userRole === "doctor" && (
                <Link to="/doctor" className="text-white hover:text-blue-200">Doctor Dashboard</Link>
              )}
              {userRole === "patient" && (
                <Link to="/patient" className="text-white hover:text-blue-200">Patient Dashboard</Link>
              )}
              <Button onClick={handleLogout} size="sm" variant="secondary">Logout</Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;