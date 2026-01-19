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
  { id: "p4", name: "Alice Wonderland" },
];

interface MedicalRecord {
  id: string;
  patientName: string;
  date: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

// Mock medical records data, keyed by patient ID
const mockMedicalRecordsData: Record<string, Omit<MedicalRecord, 'id' | 'patientName'>[]> = {
  "p1": [
    { date: "2023-01-15", diagnosis: "Common Cold", treatment: "Rest and fluids", notes: "Patient advised to stay hydrated." },
    { date: "2023-05-20", diagnosis: "Allergic Reaction", treatment: "Antihistamines", notes: "Mild reaction to pollen." },
  ],
  "p2": [
    { date: "2023-03-10", diagnosis: "Hypertension", treatment: "Lisinopril 10mg daily", notes: "Regular blood pressure monitoring required." },
    { date: "2023-07-01", diagnosis: "Migraine", treatment: "Sumatriptan as needed", notes: "Advised to avoid triggers." },
  ],
  "p3": [
    { date: "2023-02-28", diagnosis: "Appendicitis", treatment: "Appendectomy", notes: "Successful surgery, recovery progressing well." },
  ],
  "p4": [], // Alice has no records yet
};

export default function MedicalRecords() {
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [patientRecords, setPatientRecords] = useState<MedicalRecord[]>([]);
  const [newRecord, setNewRecord] = useState<Omit<MedicalRecord, 'id' | 'patientName' | 'date'>>({
    diagnosis: "",
    treatment: "",
    notes: "",
  });
  const [currentDate, setCurrentDate] = useState<string>("");

  useEffect(() => {
    // Initialize date input to today
    setCurrentDate(new Date().toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    if (selectedPatientId) {
      const records = mockMedicalRecordsData[selectedPatientId] || [];
      setPatientRecords(records.map((record, index) => ({
        id: `${selectedPatientId}-rec${index + 1}`, // Simple ID generation
        patientName: mockPatients.find(p => p.id === selectedPatientId)?.name || "Unknown Patient",
        ...record,
      })));
    } else {
      setPatientRecords([]);
    }
  }, [selectedPatientId]);

  const handlePatientSelectChange = (value: string) => {
    setSelectedPatientId(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewRecord((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMedicalRecord = () => {
    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

    if (!selectedPatient || !currentDate || !newRecord.diagnosis || !newRecord.treatment) {
      alert("Please select a patient and fill in Diagnosis and Treatment.");
      return;
    }

    const recordToAdd: MedicalRecord = {
      id: `rec${Date.now()}`, // Simple ID generation
      patientName: selectedPatient.name,
      date: currentDate,
      ...newRecord,
    };

    // Update mock data in memory (in a real app, this would be an API call)
    const updatedMockData = { ...mockMedicalRecordsData };
    if (!updatedMockData[selectedPatientId]) {
      updatedMockData[selectedPatientId] = [];
    }
    updatedMockData[selectedPatientId].push({
      diagnosis: recordToAdd.diagnosis,
      treatment: recordToAdd.treatment,
      notes: recordToAdd.notes,
      date: recordToAdd.date,
    });
    // In a real app, you'd likely update state here and then persist to backend

    setPatientRecords((prev) => [...prev, recordToAdd]); // Add to displayed records
    setNewRecord({ diagnosis: "", treatment: "", notes: "" }); // Clear form
    // Keep currentDate as is, or reset if desired
  };

  const deleteRecord = (id: string) => {
    setPatientRecords((prev) => prev.filter((record) => record.id !== id));
    // In a real app, you'd call an API to delete the record from the backend
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Medical Records Management</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Patient Selection</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
          <div>
            <Label htmlFor="patient-select">Select Patient</Label>
            <Select value={selectedPatientId} onValueChange={handlePatientSelectChange}>
              <SelectTrigger className="mt-1 w-full">
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
        </div>
      </div>

      {selectedPatientId && (
        <>
          <div className="mb-8 p-6 border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Add New Medical Record</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="record-date">Date</Label>
                <Input
                  id="record-date"
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="diagnosis">Diagnosis</Label>
                <Input
                  id="diagnosis"
                  name="diagnosis"
                  value={newRecord.diagnosis}
                  onChange={handleInputChange}
                  placeholder="Diagnosis"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="treatment">Treatment</Label>
                <Input
                  id="treatment"
                  name="treatment"
                  value={newRecord.treatment}
                  onChange={handleInputChange}
                  placeholder="Treatment"
                  className="mt-1"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  name="notes"
                  value={newRecord.notes}
                  onChange={handleInputChange}
                  placeholder="Additional notes"
                  className="mt-1"
                />
              </div>
            </div>
            <Button onClick={addMedicalRecord} className="mt-6">
              Add Record
            </Button>
          </div>

          <div className="border rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold p-6 pb-0">Medical Records for {mockPatients.find(p => p.id === selectedPatientId)?.name}</h2>
            {patientRecords.length === 0 ? (
              <p className="p-6 text-gray-500">No medical records found for this patient.</p>
            ) : (
              <Table>
                <TableCaption>A list of medical records.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead>Treatment</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {patientRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.date}</TableCell>
                      <TableCell>{record.diagnosis}</TableCell>
                      <TableCell>{record.treatment}</TableCell>
                      <TableCell>{record.notes}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteRecord(record.id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </>
      )}
    </div>
  );
}