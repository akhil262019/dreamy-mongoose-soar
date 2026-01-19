import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">
            Hospital Management
          </div>
          <ul className="flex space-x-4">
            <li>
              <Button variant="link" asChild>
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/patients">Patients</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/doctors">Doctors</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/appointments">Appointments</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/prescriptions">Prescriptions</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" asChild>
                <Link to="/medical-records">Medical Records</Link>
              </Button>
            </li>
            {/* Add other navigation links here */}
          </ul>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <footer className="text-center p-4 mt-8 text-gray-500">
        © 2023 Hospital Management. All rights reserved.
      </footer>
    </div>
  );
}

// Define routes here
import { createBrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Prescriptions from "./pages/Prescriptions";
import MedicalRecords from "./pages/MedicalRecords"; // Import the MedicalRecords component

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Index /> },
      { path: "patients", element: <Patients /> },
      { path: "doctors", element: <Doctors /> },
      { path: "appointments", element: <Appointments /> },
      { path: "prescriptions", element: <Prescriptions /> },
      { path: "medical-records", element: <MedicalRecords /> }, // Add the route for Medical Records
      // Add other routes here
    ],
<scalix-write path="src/pages/Index.tsx" description="Update homepage to include a link to Medical Records page">
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
        <Button size="lg" asChild>
          <Link to="/prescriptions">Manage Prescriptions</Link>
        </Button>
        <Button size="lg" asChild>
          <Link to="/medical-records">Medical Records</Link>
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
            <li className="mb-2"><Link to="/prescriptions" className="text-blue-500 hover:underline">View Prescriptions</Link></li>
            <li className="mb-2"><Link to="/medical-records" className="text-blue-500 hover:underline">View Medical Records</Link></li>
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