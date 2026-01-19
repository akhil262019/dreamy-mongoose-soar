import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold hover:text-blue-200">
          HMS
        </Link>
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:text-blue-200">Login</Link>
          <Link to="/register" className="text-white hover:text-blue-200">Register</Link>
          {/* Conditional rendering for admin/doctor/patient links would go here */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;