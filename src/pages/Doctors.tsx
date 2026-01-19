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

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  contact: string;
  licenseNumber: string;
}

export default function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([
    { id: "d1", name: "Dr. Alice Smith", specialty: "Cardiology", contact: "111-222-3333", licenseNumber: "LIC12345" },
    { id: "d2", name: "Dr. Bob Johnson", specialty: "Neurology", contact: "444-555-6666", licenseNumber: "LIC67890" },
  ]);
  const [newDoctor, setNewDoctor] = useState<Omit<Doctor, 'id'>>({
    name: "",
    specialty: "",
    contact: "",
    licenseNumber: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewDoctor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addDoctor = () => {
    if (!newDoctor.name || !newDoctor.specialty || !newDoctor.contact || !newDoctor.licenseNumber) {
      alert("Please fill in all fields.");
      return;
    }
    const doctorToAdd: Doctor = {
      id: `d${Date.now()}`, // Simple ID generation
      ...newDoctor,
    };
    setDoctors((prev) => [...prev, doctorToAdd]);
    setNewDoctor({ name: "", specialty: "", contact: "", licenseNumber: "" }); // Clear form
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Doctor Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Add New Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newDoctor.name}
              onChange={handleInputChange}
              placeholder="Doctor Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="specialty">Specialty</Label>
            <Input
              id="specialty"
              name="specialty"
              value={newDoctor.specialty}
              onChange={handleInputChange}
              placeholder="e.g., Cardiology, Neurology"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              name="contact"
              value={newDoctor.contact}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              name="licenseNumber"
              value={newDoctor.licenseNumber}
              onChange={handleInputChange}
              placeholder="Medical License Number"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addDoctor} className="mt-6">
          Add Doctor
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Doctor List</h2>
        <Table>
          <TableCaption>A list of all registered doctors.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>License Number</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.contact}</TableCell>
                <TableCell>{doctor.licenseNumber}</TableCell>
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