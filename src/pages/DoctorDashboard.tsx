import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const DoctorDashboard: React.FC = () => {
  // State for availability
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(undefined);
  const handleSetAvailability = () => {
    console.log("Setting availability for:", availabilityDate);
    alert("Availability updated!");
  };

  // State for marking appointment complete
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleMarkComplete = (patientName: string, appointmentId: string) => {
    setSelectedPatient(patientName);
    setSelectedAppointment(appointmentId);
    setIsCompleteDialogOpen(true);
  };

  const handleSaveVisitDetails = () => {
    console.log("Saving visit details:", { selectedPatient, selectedAppointment, diagnosis, prescription, notes });
    alert("Visit details saved successfully!");
    setIsCompleteDialogOpen(false);
    // TODO: Clear form fields and potentially update appointment status
  };

  // State for viewing patient history
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [patientHistory, setPatientHistory] = useState<Array<{ date: string; diagnosis: string; prescription: string; notes: string }>>([]);

  const handleViewHistory = (patientName: string) => {
    console.log("Viewing history for:", patientName);
    // TODO: Fetch actual patient history from backend
    setPatientHistory([
      { date: "2023-11-15", diagnosis: "Common Cold", prescription: "Rest and fluids", notes: "Advised follow-up if symptoms persist." },
      { date: "2023-10-01", diagnosis: "Allergy Flare-up", prescription: "Antihistamines", notes: "Patient advised to avoid triggers." },
    ]);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Patient Name 1</p>
                  <p className="text-sm text-gray-500">10:00 AM - Consultation</p>
                </div>
                <div>
                  <Button size="sm" className="mr-2" onClick={() => handleMarkComplete("Patient Name 1", "APP001")}>
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewHistory("Patient Name 1")}>
                    View History
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Patient Name 2</p>
                  <p className="text-sm text-gray-500">11:00 AM - Follow-up</p>
                </div>
                <div>
                  <Button size="sm" className="mr-2" onClick={() => handleMarkComplete("Patient Name 2", "APP002")}>
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewHistory("Patient Name 2")}>
                    View History
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">List of patients assigned to the doctor will appear here.</p>
            <scalix-write path="src/pages/DoctorDashboard.tsx" description="Updated Doctor Dashboard with patient history view and refined completion action">
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

const DoctorDashboard: React.FC = () => {
  // State for availability
  const [availabilityDate, setAvailabilityDate] = useState<Date | undefined>(undefined);
  const handleSetAvailability = () => {
    console.log("Setting availability for:", availabilityDate);
    alert("Availability updated!");
  };

  // State for marking appointment complete
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);
  const [diagnosis, setDiagnosis] = useState("");
  const [prescription, setPrescription] = useState("");
  const [notes, setNotes] = useState("");

  const handleMarkComplete = (patientName: string, appointmentId: string) => {
    setSelectedPatient(patientName);
    setSelectedAppointment(appointmentId);
    setIsCompleteDialogOpen(true);
  };

  const handleSaveVisitDetails = () => {
    console.log("Saving visit details:", { selectedPatient, selectedAppointment, diagnosis, prescription, notes });
    alert("Visit details saved successfully!");
    setIsCompleteDialogOpen(false);
    // TODO: Clear form fields and potentially update appointment status
  };

  // State for viewing patient history
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [patientHistory, setPatientHistory] = useState<Array<{ date: string; diagnosis: string; prescription: string; notes: string }>>([]);

  const handleViewHistory = (patientName: string) => {
    console.log("Viewing history for:", patientName);
    // TODO: Fetch actual patient history from backend
    setPatientHistory([
      { date: "2023-11-15", diagnosis: "Common Cold", prescription: "Rest and fluids", notes: "Advised follow-up if symptoms persist." },
      { date: "2023-10-01", diagnosis: "Allergy Flare-up", prescription: "Antihistamines", notes: "Patient advised to avoid triggers." },
    ]);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Doctor Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Patient Name 1</p>
                  <p className="text-sm text-gray-500">10:00 AM - Consultation</p>
                </div>
                <div>
                  <Button size="sm" className="mr-2" onClick={() => handleMarkComplete("Patient Name 1", "APP001")}>
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewHistory("Patient Name 1")}>
                    View History
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-center p-3 border rounded">
                <div>
                  <p className="font-medium">Patient Name 2</p>
                  <p className="text-sm text-gray-500">11:00 AM - Follow-up</p>
                </div>
                <div>
                  <Button size="sm" className="mr-2" onClick={() => handleMarkComplete("Patient Name 2", "APP002")}>
                    Mark Complete
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => handleViewHistory("Patient Name 2")}>
                    View History
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-3">List of patients assigned to the doctor will appear here.</p>
            <Button variant="outline">View All Patients</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Set Your Availability (Next 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <Calendar
              mode="multiple"
              selected={availabilityDate ? [availabilityDate] : []} // Simplified for single date selection example
              onSelect={setAvailabilityDate}
              className="rounded-md border shadow"
            />
            {/* Add time slot selection here if needed */}
            <Button onClick={handleSetAvailability} className="mt-4 md:mt-0">
              Update Availability
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dialog for Marking Appointment Complete */}
      <Dialog open={isCompleteDialogOpen} onOpenChange={setIsCompleteDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Mark Appointment Complete</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <Label>Patient: {selectedPatient}</Label>
            <Label>Appointment ID: {selectedAppointment}</Label>
            <Textarea placeholder="Diagnosis notes..." value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} />
            <Textarea placeholder="Prescription details..." value={prescription} onChange={(e) => setPrescription(e.target.value)} />
            <Textarea placeholder="General treatment notes..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCompleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveVisitDetails}>Save Visit Details</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog for Viewing Patient History */}
      <Dialog open={isHistoryDialogOpen} onOpenChange={setIsHistoryDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Patient History</DialogTitle>
          </DialogHeader>
          <div className="max-h-[400px] overflow-y-auto pr-4">
            {patientHistory.length > 0 ? (
              patientHistory.map((entry, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <CardTitle>{entry.date}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p><strong>Diagnosis:</strong> {entry.diagnosis}</p>
                    <p className="mt-2"><strong>Prescription:</strong> {entry.prescription}</p>
                    <p className="mt-2"><strong>Notes:</strong> {entry.notes}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p>No history found for this patient.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsHistoryDialogOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorDashboard;