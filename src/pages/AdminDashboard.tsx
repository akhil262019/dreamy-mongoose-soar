import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";

const AdminDashboard: React.FC = () => {
  // Placeholder data
  const doctors = [
    { id: 1, name: "Dr. Alice Smith", specialization: "Cardiology", contact: "111-222-3333" },
    { id: 2, name: "Dr. Bob Johnson", specialization: "Neurology", contact: "444-555-6666" },
  ];

  const appointments = [
    { id: 101, patient: "Patient One", doctor: "Dr. Alice Smith", date: "2023-12-01", time: "10:00 AM", status: "Booked" },
    { id: 102, patient: "Patient Two", doctor: "Dr. Bob Johnson", date: "2023-12-01", time: "11:00 AM", status: "Booked" },
  ];

  // Placeholder states for search
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearch = () => {
    console.log("Searching for:", searchTerm);
    // TODO: Implement actual search logic (patients, doctors)
    // For now, simulate results based on whether search term is empty
    if (searchTerm.toLowerCase().includes("patient")) {
      setSearchResults([{ type: "Patient", name: "Patient X", id: "P001", contact: "999-888-7777" }]);
    } else if (searchTerm.toLowerCase().includes("dr.")) {
      setSearchResults([{ type: "Doctor", name: "Dr. Charlie", specialization: "Dermatology", id: "D001" }]);
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">15</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">150</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">300</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Search</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Search by Patient Name, ID, or Doctor Name/Specialization"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={handleSearch}>
                <Search className="mr-2 h-4 w-4" /> Search
              </Button>
            </div>
            {searchResults.length > 0 && (
              <div className="mt-4">
                <h4 className="text-lg font-semibold mb-2">Search Results:</h4>
                <Table>
                  <TableCaption>Search results for "{searchTerm}"</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Details</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchResults.map((result: any) => (
                      <TableRow key={result.id}>
                        <TableCell>{result.type}</TableCell>
                        <TableCell>{result.name}</TableCell>
                        <TableCell>
                          {result.type === "Patient" ? `ID: ${result.id}, Contact: ${result.contact}` : `ID: ${result.id}, Specialization: ${result.specialization}`}
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className="mr-1">View</Button>
                          <Button variant="destructive" size="sm">Edit</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Doctors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button>Add New Doctor</Button>
            </div>
            <Table>
              <TableCaption>List of registered doctors</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>{doctor.name}</TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell>{doctor.contact}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-1">Edit</Button>
                      <Button variant="destructive" size="sm">Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <Button>View All Appointments</Button>
            </div>
            <Table>
              <TableCaption>Upcoming appointments</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {appointments.map((appt) => (
                  <TableRow key={appt.id}>
                    <TableCell>{appt.patient}</TableCell>
                    <TableCell>{appt.doctor}</TableCell>
                    <TableCell>{appt.date}</TableCell>
                    <TableCell>{appt.status}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" className="mr-1">Details</Button>
                      <Button variant="destructive" size="sm">Cancel</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;