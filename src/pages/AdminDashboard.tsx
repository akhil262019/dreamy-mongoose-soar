import React from "react";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Doctors</h3>
          <p className="text-4xl font-bold mt-2">15</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Patients</h3>
          <p className="text-4xl font-bold mt-2">150</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold">Total Appointments</h3>
          <p className="text-4xl font-bold mt-2">300</p>
        </div>
      </div>
      {/* More admin functionalities will be added here */}
    </div>
  );
};

export default AdminDashboard;