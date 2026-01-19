import { Outlet, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-indigo-500 to-indigo-700 shadow-md p-4">
        <nav className="container mx-auto flex items-center justify-between">
          <div className="text-xl font-bold text-white">
            Hospital Management
          </div>
          <ul className="flex space-x-4">
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/">Home</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/patients">Patients</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/doctors">Doctors</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/appointments">Appointments</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/prescriptions">Prescriptions</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/medical-records">Medical Records</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/departments">Departments</Link>
              </Button>
            </li>
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/staff">Staff Management</Link>
              </Button>
            </li>
            {/* Add other navigation links here */}
            <li>
              <Button variant="link" className="text-white hover:text-indigo-200">
                <Link to="/login">Login</Link> {/* Link to login page */}
              </Button>
            </li>
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
import MedicalRecords from "./pages/MedicalRecords";
import Departments from "./pages/Departments";
import StaffManagement from "./pages/StaffManagement";
import LoginPage from "./pages/LoginPage"; // Import LoginPage

// Placeholder components for dashboards
const DoctorDashboard = () => <div><h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1><p>Welcome, Doctor!</p></div>;
const PatientDashboard = () => <div><h1 className="text-2xl font-bold mb-4">Patient Dashboard</h1><p>Welcome, Patient!</p></div>;
const AdminDashboard = () => <div><h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1><p>Welcome, Admin!</p></div>;
const GeneralDashboard = () => <div><h1 className="text-2xl font-bold mb-4">General Dashboard</h1><p>Welcome!</p></div>;


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
      { path: "medical-records", element: <MedicalRecords /> },
      { path: "departments", element: <Departments /> },
      { path: "staff", element: <StaffManagement /> },
      { path: "login", element: <LoginPage /> }, // Route for login page

      // Dashboard routes (these would typically be protected)
      { path: "doctor-dashboard", element: <DoctorDashboard /> },
      { path: "patient-dashboard", element: <PatientDashboard /> },
      { path: "admin-dashboard", element: <AdminDashboard /> },
      { path: "dashboard", element: <GeneralDashboard /> }, // Fallback dashboard
    ],
  },
]);

export default App;