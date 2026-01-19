import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for dropdowns - in a real app, this would come from your database
const mockPatients = [
  { id: "p1", name: "John Doe" },
  { id: "p2", name: "Jane Smith" },
  { id: "p3", name: "Peter Jones" },
];

const mockDoctors = [
  { id: "d1", name: "Dr. Alice Smith" },
  { id: "d2", name: "Dr. Bob Johnson" },
  { id: "d3", name: "Dr. Carol White" },
];

interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  reason: string;
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = useState<Omit<Appointment, 'id' | 'patientName' | 'doctorName'>>({
    date: "",
    time: "",
    reason: "",
  });
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");

  // Load initial appointments from local storage or mock data if none exist
  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      // Use mock data for initial display if no data in local storage
      setAppointments([
        { id: "a1", patientName: "John Doe", doctorName: "Dr. Alice Smith", date: "2023-10-27", time: "10:00", reason: "Annual check-up" },
        { id: "a2", patientName: "Jane Smith", doctorName: "Dr. Bob Johnson", date: "2023-10-28", time: "14:30", reason: "Follow-up consultation" },
      ]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewAppointment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (type: "patient" | "doctor", value: string) => {
    if (type === "patient") {
      setSelectedPatientId(value);
    } else {
      setSelectedDoctorId(value);
    }
  };

  const addAppointment = () => {
    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);
    const selectedDoctor = mockDoctors.find(d => d.id === selectedDoctorId);

    if (!selectedPatient || !selectedDoctor || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      alert("Please fill in all fields and select a patient and doctor.");
      return;
    }

    const appointmentToAdd: Appointment = {
      id: `a${Date.now()}`, // Simple ID generation
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
      ...newAppointment,
    };

    setAppointments((prev) => [...prev, appointmentToAdd]);
    localStorage.setItem("appointments", JSON.stringify([...appointments, appointmentToAdd])); // Save to local storage

    // Clear form and selections
    setNewAppointment({ date: "", time: "", reason: "" });
    setSelectedPatientId("");
    setSelectedDoctorId("");
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((app) => app.id !== id));
    localStorage.setItem("appointments", JSON.stringify(appointments.filter((app) => app.id !== id)));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Appointment Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Schedule New Appointment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patient">Patient</Label>
            <Select value={selectedPatientId} onValueChange={(value) => handleSelectChange("patient", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a patient" />
              </SelectTrigger>
              <SelectContent>
                {mockPatients.map((patient) => (
                  <SelectItem key={patient.id} value={patient.id}>
                    {patient.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="doctor">Doctor</Label>
            <Select value={selectedDoctorId} onValueChange={(value) => handleSelectChange("doctor", value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a doctor" />
              </SelectTrigger>
              <SelectContent>
                {mockDoctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={newAppointment.date}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="time">Time</Label>
            <Input
              id="time"
              name="time"
              type="time"
              value={newAppointment.time}
              onChange={handleInputChange}
              placeholder="HH:MM"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="reason">Reason for Visit</Label>
            <Input
              id="reason"
              name="reason"
              value={newAppointment.reason}
              onChange={handleInputChange}
              placeholder="Reason for visit"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addAppointment} className="mt-6">
          Schedule Appointment
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Appointment List</h2>
        <Table>
          <TableCaption>A list of all scheduled appointments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Reason</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium">{appointment.patientName}</TableCell>
                <TableCell>{appointment.doctorName}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.time}</TableCell>
                <TableCell>{appointment.reason}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteAppointment(appointment.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}