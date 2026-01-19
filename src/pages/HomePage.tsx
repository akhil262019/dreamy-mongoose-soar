import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Hospital Management System</h1>
      <p className="text-lg text-gray-600">
        Please log in or register to access the system.
      </p>
    </div>
  );
};

export default HomePage;