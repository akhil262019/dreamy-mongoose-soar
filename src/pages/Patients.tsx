import React from "react";
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
import { useState } from "react";

interface Patient {
  id: string;
  name: string;
  dob: string;
  contact: string;
  address: string;
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([
    { id: "1", name: "John Doe", dob: "1990-01-15", contact: "123-456-7890", address: "123 Main St" },
    { id: "2", name: "Jane Smith", dob: "1985-05-20", contact: "987-654-3210", address: "456 Oak Ave" },
  ]);
  const [newPatient, setNewPatient] = useState<Omit<Patient, 'id'>>({
    name: "",
    dob: "",
    contact: "",
    address: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewPatient((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addPatient = () => {
    if (!newPatient.name || !newPatient.dob || !newPatient.contact || !newPatient.address) {
      alert("Please fill in all fields.");
      return;
    }
    const patientToAdd: Patient = {
      id: Date.now().toString(), // Simple ID generation
      ...newPatient,
    };
    setPatients((prev) => [...prev, patientToAdd]);
    setNewPatient({ name: "", dob: "", contact: "", address: "" }); // Clear form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Patient Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Add New Patient</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newPatient.name}
              onChange={handleInputChange}
              placeholder="Patient Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dob">Date of Birth</Label>
            <Input
              id="dob"
              name="dob"
              type="date"
              value={newPatient.dob}
              onChange={handleInputChange}
              placeholder="YYYY-MM-DD"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              name="contact"
              value={newPatient.contact}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={newPatient.address}
              onChange={handleInputChange}
              placeholder="Patient Address"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addPatient} className="mt-6">
          Add Patient
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Patient List</h2>
        <Table>
          <TableCaption>A list of all registered patients.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell className="font-medium">{patient.name}</TableCell>
                <TableCell>{patient.dob}</TableCell>
                <TableCell>{patient.contact}</TableCell>
                <TableCell>{patient.address}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2">Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}