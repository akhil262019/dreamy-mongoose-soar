import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"; // For profile editing
import { Label } from "@/components/ui/label"; // For profile editing labels

const PatientDashboard: React.FC = () => {
  // Placeholder states
  const [selectedSpecialization, setSelectedSpecialization] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [profileName, setProfileName] = useState("Patient Name");
  const [profileEmail, setProfileEmail] = useState("patient@example.com");
  const [profileContact, setProfileContact] = useState("123-456-7890");

  const handleSearchDoctors = () => {
    console.log("Searching doctors for specialization:", selectedSpecialization, "or name:", doctorName);
    // TODO: Implement doctor search logic
    alert("Searching for doctors...");
  };

  const handleBookAppointment = () => {
    console.log("Booking appointment for:", selectedSpecialization, appointmentDate, appointmentTime);
    // TODO: Implement booking logic
    alert("Appointment booked successfully!");
  };

  const handleUpdateProfile = () => {
    console.log("Updating profile:", { profileName, profileEmail, profileContact });
    // TODO: Implement profile update logic
    alert("Profile updated successfully!");
  };

  // Simulated function for user-triggered async job
  const handleExportHistory = () => {
    alert("Generating your treatment history report...");
    // Simulate a backend job taking time
    setTimeout(() => {
      alert("Your treatment history export is ready! (Simulated)");
      // In a real app, this would trigger a download or provide a link
    }, 3000); // 3 second delay
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Upcoming Appointments Card */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Your scheduled appointments will be listed here.</p>
            <ul>
              <li className="mb-2 p-3 border rounded flex justify-between items-center">
                <div>
                  <p className="font-medium">Dr. Smith - Cardiology</p>
                  <p className="text-sm text-gray-500">2023-12-01 at 10:00 AM</p>
                </div>
                <div>
                  <Button size="sm" variant="outline" className="mr-2">Reschedule</Button>
                  <Button size="sm" variant="destructive">Cancel</Button>
                </div>
              </li>
              {/* Add more appointments as needed */}
            </ul>
          </CardContent>
        </Card>

        {/* Treatment History Card */}
        <Card>
          <CardHeader>
            <CardTitle>My Treatment History</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">Your past treatments and diagnoses will be shown here.</p>
            <ul>
              <li className="mb-2 p-3 border rounded">
                <p className="font-medium">Dr. Jones - 2023-11-15</p>
                <p><strong>Diagnosis:</strong> Common Cold</p>
                <p><strong>Prescription:</strong> Rest and fluids</p>
                <p><strong>Notes:</strong> Advised follow-up if symptoms persist.</p>
              </li>
              {/* Add more history items as needed */}
            </ul>
            <Button variant="outline" className="mt-4" onClick={handleExportHistory}>Export Treatment History (CSV)</Button>
          </CardContent>
        </Card>
      </div>

      {/* Book Appointment Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <Label htmlFor="specialization-select" className="block text-sm font-medium mb-1">Specialization</Label>
              <Select value={selectedSpecialization} onValueChange={setSelectedSpecialization} required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="pediatrics">Pediatrics</SelectItem>
                  <SelectItem value="dermatology">Dermatology</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="doctor-search" className="block text-sm font-medium mb-1">Doctor Name (Optional)</Label>
              <Input id="doctor-search" placeholder="Search by doctor name" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} />
            </div>
            <div>
              <Button onClick={handleSearchDoctors} className="mt-6 w-full md:w-auto">Search Doctors</Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="appointment-date" className="block text-sm font-medium mb-1">Date</Label>
              <Input id="appointment-date" type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="appointment-time" className="block text-sm font-medium mb-1">Time</Label>
              <Input id="appointment-time" type="time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} />
            </div>
          </div>
          <Button onClick={handleBookAppointment}>Book Appointment</Button>
        </CardContent>
      </Card>

      {/* Profile Management Card */}
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="profile-name">Full Name</Label>
              <Input id="profile-name" value={profileName} onChange={(e) => setProfileName(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="profile-email">Email</Label>
              <Input id="profile-email" type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="profile-contact">Contact Number</Label>
              <Input id="profile-contact" value={profileContact} onChange={(e) => setProfileContact(e.target.value)} />
            </div>
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientDashboard;