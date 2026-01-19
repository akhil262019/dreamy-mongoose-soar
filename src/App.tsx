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
            <li>
              <Button variant="link" asChild>
                <Link to="/departments">Departments</Link>
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
import MedicalRecords from "./pages/MedicalRecords";
import Departments from "./pages/Departments"; // Import the Departments component

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
      { path: "departments", element: <Departments /> }, // Add the route for Departments
      // Add other routes here
    ],
  },
]);

export default App;