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
import { Textarea } from "@/components/ui/textarea";

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

interface Prescription {
  id: string;
  patientName: string;
  doctorName: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes: string;
}

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [newPrescription, setNewPrescription] = useState<Omit<Prescription, 'id' | 'patientName' | 'doctorName'>>({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    notes: "",
  });
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>("");

  // Load initial prescriptions from local storage or mock data if none exist
  useEffect(() => {
    const storedPrescriptions = localStorage.getItem("prescriptions");
    if (storedPrescriptions) {
      setPrescriptions(JSON.parse(storedPrescriptions));
    } else {
      // Use mock data for initial display if no data in local storage
      setPrescriptions([
        { id: "pr1", patientName: "John Doe", doctorName: "Dr. Alice Smith", medication: "Aspirin", dosage: "10mg", frequency: "Daily", duration: "7 days", notes: "Take with food" },
        { id: "pr2", patientName: "Jane Smith", doctorName: "Dr. Bob Johnson", medication: "Metformin", dosage: "500mg", frequency: "Twice daily", duration: "Ongoing", notes: "Monitor blood sugar" },
      ]);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPrescription((prev) => ({
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

  const addPrescription = () => {
    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);
    const selectedDoctor = mockDoctors.find(d => d.id === selectedDoctorId);

    if (!selectedPatient || !selectedDoctor || !newPrescription.medication || !newPrescription.dosage || !newPrescription.frequency || !newPrescription.duration) {
      alert("Please fill in all required fields and select a patient and doctor.");
      return;
    }

    const prescriptionToAdd: Prescription = {
      id: `pr${Date.now()}`, // Simple ID generation
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
      ...newPrescription,
    };

    const updatedPrescriptions = [...prescriptions, prescriptionToAdd];
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions)); // Save to local storage

    // Clear form and selections
    setNewPrescription({ medication: "", dosage: "", frequency: "", duration: "", notes: "" });
    setSelectedPatientId("");
    setSelectedDoctorId("");
  };

  const deletePrescription = (id: string) => {
    const updatedPrescriptions = prescriptions.filter((pres) => pres.id !== id);
    setPrescriptions(updatedPrescriptions);
    localStorage.setItem("prescriptions", JSON.stringify(updatedPrescriptions));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Prescription Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Add New Prescription</h2>
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
            <Label htmlFor="doctor">Prescribing Doctor</Label>
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
            <Label htmlFor="medication">Medication</Label>
            <Input
              id="medication"
              name="medication"
              value={newPrescription.medication}
              onChange={handleInputChange}
              placeholder="Medication Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="dosage">Dosage</Label>
            <Input
              id="dosage"
              name="dosage"
              value={newPrescription.dosage}
              onChange={handleInputChange}
              placeholder="e.g., 10mg, 5ml"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="frequency">Frequency</Label>
            <Input
              id="frequency"
              name="frequency"
              value={newPrescription.frequency}
              onChange={handleInputChange}
              placeholder="e.g., Daily, Twice a day"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="duration">Duration</Label>
            <Input
              id="duration"
              name="duration"
              value={newPrescription.duration}
              onChange={handleInputChange}
              placeholder="e.g., 7 days, 1 month"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={newPrescription.notes}
              onChange={handleInputChange}
              placeholder="Additional notes or instructions"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addPrescription} className="mt-6">
          Add Prescription
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Prescription List</h2>
        <Table>
          <TableCaption>A list of all issued prescriptions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Medication</TableHead>
              <TableHead>Dosage</TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Notes</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {prescriptions.map((prescription) => (
              <TableRow key={prescription.id}>
                <TableCell className="font-medium">{prescription.patientName}</TableCell>
                <TableCell>{prescription.doctorName}</TableCell>
                <TableCell>{prescription.medication}</TableCell>
                <TableCell>{prescription.dosage}</TableCell>
                <TableCell>{prescription.frequency}</TableCell>
                <TableCell>{prescription.duration}</TableCell>
                <TableCell>{prescription.notes}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => deletePrescription(prescription.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}