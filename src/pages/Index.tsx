import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 animate-fade-in-up">
        Welcome to the Hospital Management System
      </h1>
      <p className="text-lg text-gray-700 mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
        Manage patients, appointments, doctors, and more with ease. Our intuitive interface and robust features ensure efficient healthcare management.
      </p>
      <div className="flex flex-wrap justify-center space-x-4 gap-4 mb-12 animate-fade-in-up animation-delay-400">
        <Button size="lg" asChild className="bg-indigo-600 hover:bg-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/patients">Manage Patients</Link>
        </Button>
        <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/doctors">Manage Doctors</Link>
        </Button>
        <Button size="lg" asChild className="bg-purple-600 hover:bg-purple-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/appointments">Schedule Appointment</Link>
        </Button>
        <Button size="lg" asChild className="bg-pink-600 hover:bg-pink-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/prescriptions">Manage Prescriptions</Link>
        </Button>
        <Button size="lg" asChild className="bg-blue-700 hover:bg-blue-800 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/medical-records">Medical Records</Link>
        </Button>
        <Button size="lg" asChild className="bg-green-600 hover:bg-green-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/departments">Manage Departments</Link>
        </Button>
        <Button size="lg" asChild className="bg-orange-600 hover:bg-orange-700 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out">
          <Link to="/staff">Manage Staff</Link>
        </Button>
        <Button size="lg" variant="outline" className="text-indigo-700 border-indigo-700 hover:bg-indigo-50 hover:scale-105 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
          View Reports
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
        {/* Quick Links / Stats Section */}
        <div className="p-6 border rounded-lg shadow-xl bg-white transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-2xl font-bold mb-4 text-indigo-700 border-b-2 border-indigo-200 pb-2">Quick Links</h3>
          <ul>
            <li className="mb-2"><Link to="/patients" className="text-indigo-600 hover:underline hover:font-semibold transition-all duration-200">View Patients</Link></li>
            <li className="mb-2"><Link to="/doctors" className="text-teal-600 hover:underline hover:font-semibold transition-all duration-200">View Doctors</Link></li>
            <li className="mb-2"><Link to="/appointments" className="text-purple-600 hover:underline hover:font-semibold transition-all duration-200">View Appointments</Link></li>
            <li className="mb-2"><Link to="/prescriptions" className="text-pink-600 hover:underline hover:font-semibold transition-all duration-200">View Prescriptions</Link></li>
            <li className="mb-2"><Link to="/medical-records" className="text-blue-700 hover:underline hover:font-semibold transition-all duration-200">View Medical Records</Link></li>
            <li className="mb-2"><Link to="/departments" className="text-green-600 hover:underline hover:font-semibold transition-all duration-200">View Departments</Link></li>
            <li className="mb-2"><Link to="/staff" className="text-orange-600 hover:underline hover:font-semibold transition-all duration-200">View Staff</Link></li>
          </ul>
        </div>
        <div className="p-6 border rounded-lg shadow-xl bg-white transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl" style={{ borderLeft: '5px solid #4F46E5' /* Indigo-600 */ }}>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Today's Overview</h3>
          <p className="text-5xl font-bold text-indigo-600">15</p>
          <p className="text-gray-500 text-lg mt-2">New Patients</p>
        </div>
        <div className="p-6 border rounded-lg shadow-xl bg-white transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-2xl" style={{ borderLeft: '5px solid #14B8A6' /* Teal-500 */ }}>
          <h3 className="text-2xl font-bold mb-2 text-gray-800">Appointments</h3>
          <p className="text-5xl font-bold text-teal-500">42</p>
          <p className="text-gray-500 text-lg mt-2">Scheduled Today</p>
        </div>
      </div>
    </div>
  );
}