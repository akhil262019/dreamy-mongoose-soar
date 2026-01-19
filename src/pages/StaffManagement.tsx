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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for dropdowns - in a real app, this would come from your database
const mockDepartments = [
  { id: "dep1", name: "Cardiology" },
  { id: "dep2", name: "Neurology" },
  { id: "dep3", name: "Pediatrics" },
  { id: "dep4", name: "Administration" },
  { id: "dep5", name: "IT" },
];

interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  contact: string;
}

export default function StaffManagement() {
  const [staffMembers, setStaffMembers] = useState<Staff[]>([
    { id: "s1", name: "John Smith", role: "Nurse", department: "Cardiology", contact: "123-456-7890" },
    { id: "s2", name: "Emily Johnson", role: "Administrator", department: "Administration", contact: "987-654-3210" },
    { id: "s3", name: "Michael Brown", role: "IT Support", department: "IT", contact: "555-123-4567" },
    { id: "s4", name: "Sarah Davis", role: "Doctor", department: "Pediatrics", contact: "111-222-3333" },
  ]);

  const [newStaff, setNewStaff] = useState<Omit<Staff, 'id'>>({
    name: "",
    role: "",
    department: "",
    contact: "",
  });
  const [selectedDepartmentId, setSelectedDepartmentId] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewStaff((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setSelectedDepartmentId(value);
    const selectedDept = mockDepartments.find(d => d.id === value);
    setNewStaff((prev) => ({ ...prev, department: selectedDept ? selectedDept.name : "" }));
  };

  const addStaffMember = () => {
    if (!newStaff.name || !newStaff.role || !newStaff.department || !newStaff.contact) {
      alert("Please fill in all fields and select a department.");
      return;
    }
    const staffToAdd: Staff = {
      id: `s${Date.now()}`, // Simple ID generation
      ...newStaff,
    };
    setStaffMembers((prev) => [...prev, staffToAdd]);
    setNewStaff({ name: "", role: "", department: "", contact: "" }); // Clear form
    setSelectedDepartmentId(""); // Clear department selection
  };

  const deleteStaffMember = (id: string) => {
    setStaffMembers((prev) => prev.filter((staff) => staff.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Staff Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Add New Staff Member</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={newStaff.name}
              onChange={handleInputChange}
              placeholder="Staff Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              name="role"
              value={newStaff.role}
              onChange={handleInputChange}
              placeholder="e.g., Nurse, Administrator, Technician"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={selectedDepartmentId} onValueChange={handleSelectChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a department" />
              </SelectTrigger>
              <SelectContent>
                {mockDepartments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id}>
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="contact">Contact Number</Label>
            <Input
              id="contact"
              name="contact"
              value={newStaff.contact}
              onChange={handleInputChange}
              placeholder="Contact Number"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addStaffMember} className="mt-6">
          Add Staff Member
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Staff List</h2>
        <Table>
          <TableCaption>A list of all hospital staff members.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {staffMembers.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell className="font-medium">{staff.name}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>{staff.department}</TableCell>
                <TableCell>{staff.contact}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteStaffMember(staff.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}