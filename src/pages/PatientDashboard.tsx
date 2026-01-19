import React from "react";

const PatientDashboard: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">Upcoming Appointments</h3>
          <ul>
            <li className="mb-2 p-2 border rounded">Doctor Name - Date - Time</li>
          </ul>
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-3">My Treatment History</h3>
          <p>Treatment details will be displayed here.</p>
        </div>
      </div>
      {/* More patient functionalities will be added here */}
    </div>
  );
};

export default PatientDashboard;