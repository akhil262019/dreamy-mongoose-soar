import React, { useState } from "react";
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
import { Textarea } from "@/components/ui/textarea";

interface Department {
  id: string;
  name: string;
  headOfDepartment: string;
  contactPerson: string;
  contactNumber: string;
  location: string;
}

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([
    { id: "dep1", name: "Cardiology", headOfDepartment: "Dr. Alice Smith", contactPerson: "Nurse Davis", contactNumber: "111-222-3333", location: "Building A, Floor 3" },
    { id: "dep2", name: "Neurology", headOfDepartment: "Dr. Bob Johnson", contactPerson: "Nurse Evans", contactNumber: "444-555-6666", location: "Building B, Floor 2" },
    { id: "dep3", name: "Pediatrics", headOfDepartment: "Dr. Carol White", contactPerson: "Nurse Green", contactNumber: "777-888-9999", location: "Building A, Floor 1" },
  ]);

  const [newDepartment, setNewDepartment] = useState<Omit<Department, 'id'>>({
    name: "",
    headOfDepartment: "",
    contactPerson: "",
    contactNumber: "",
    location: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewDepartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addDepartment = () => {
    if (!newDepartment.name || !newDepartment.headOfDepartment || !newDepartment.contactPerson || !newDepartment.contactNumber || !newDepartment.location) {
      alert("Please fill in all fields.");
      return;
    }
    const departmentToAdd: Department = {
      id: `dep${Date.now()}`, // Simple ID generation
      ...newDepartment,
    };
    setDepartments((prev) => [...prev, departmentToAdd]);
    setNewDepartment({ name: "", headOfDepartment: "", contactPerson: "", contactNumber: "", location: "" }); // Clear form
  };

  const deleteDepartment = (id: string) => {
    setDepartments((prev) => prev.filter((dep) => dep.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Department Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Add New Department</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Department Name</Label>
            <Input
              id="name"
              name="name"
              value={newDepartment.name}
              onChange={handleInputChange}
              placeholder="e.g., Cardiology, Radiology"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="headOfDepartment">Head of Department</Label>
            <Input
              id="headOfDepartment"
              name="headOfDepartment"
              value={newDepartment.headOfDepartment}
              onChange={handleInputChange}
              placeholder="Doctor's Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input
              id="contactPerson"
              name="contactPerson"
              value={newDepartment.contactPerson}
              onChange={handleInputChange}
              placeholder="Name of Contact Person"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              id="contactNumber"
              name="contactNumber"
              value={newDepartment.contactNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={newDepartment.location}
              onChange={handleInputChange}
              placeholder="e.g., Building A, Floor 3"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addDepartment} className="mt-6">
          Add Department
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Department List</h2>
        <Table>
          <TableCaption>A list of all hospital departments.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Head of Dept.</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">{department.name}</TableCell>
                <TableCell>{department.headOfDepartment}</TableCell>
                <TableCell>{department.contactPerson}</TableCell>
                <TableCell>{department.contactNumber}</TableCell>
                <TableCell>{department.location}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteDepartment(department.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}