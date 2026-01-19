import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Hospital Management System</h1>
      <p className="text-lg text-gray-600 mb-8">
        Manage patients, appointments, doctors, and more with ease.
      </p>
      <div className="flex space-x-4">
        <Button size="lg" asChild>
          <Link to="/patients">Manage Patients</Link>
        </Button>
        <Button size="lg" asChild>
          <Link to="/doctors">Manage Doctors</Link>
        </Button>
        <Button size="lg" asChild>
          <Link to="/appointments">Schedule Appointment</Link>
        </Button>
        <Button size="lg" variant="outline">
          View Reports
        </Button>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Quick Links / Stats Section */}
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul>
            <li className="mb-2"><Link to="/patients" className="text-blue-500 hover:underline">View Patients</Link></li>
            <li className="mb-2"><Link to="/doctors" className="text-blue-500 hover:underline">View Doctors</Link></li>
            <li className="mb-2"><Link to="/appointments" className="text-blue-500 hover:underline">View Appointments</Link></li>
            {/* Add more links */}
          </ul>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Today's Overview</h3>
          <p className="text-3xl font-bold">15</p>
          <p className="text-gray-500">New Patients</p>
        </div>
        <div className="p-6 border rounded-lg shadow-sm bg-white">
          <h3 className="text-xl font-semibold mb-2">Appointments</h3>
          <p className="text-3xl font-bold">42</p>
          <p className="text-gray-500">Scheduled Today</p>
        </div>
      </div>
    </div>
  );
}