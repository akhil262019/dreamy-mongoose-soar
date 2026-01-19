import React from "react";

const DoctorDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Upcoming Appointments Today</h3>
          <ul>
            <li className="mb-2 p-2 border rounded">Patient Name - 10:00 AM</li>
            <li className="mb-2 p-2 border rounded">Patient Name - 11:00 AM</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">My Patients</h3>
          <p>List of patients assigned to the doctor will appear here.</p>
        </div>
      </div>
      {/* More doctor functionalities will be added here */}
    </div>
  );
};

export default DoctorDashboard;