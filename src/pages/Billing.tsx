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

interface Invoice {
  id: string;
  patientName: string;
  invoiceDate: string;
  dueDate: string;
  amount: number;
  status: "Paid" | "Unpaid" | "Pending";
  description: string;
}

// Mock invoices data
const mockInvoicesData: Invoice[] = [
  { id: "inv1", patientName: "John Doe", invoiceDate: "2023-10-01", dueDate: "2023-10-31", amount: 150.00, status: "Paid", description: "Consultation and basic tests" },
  { id: "inv2", patientName: "Jane Smith", invoiceDate: "2023-10-05", dueDate: "2023-11-04", amount: 300.50, status: "Unpaid", description: "Follow-up and medication" },
  { id: "inv3", patientName: "Peter Jones", invoiceDate: "2023-10-15", dueDate: "2023-11-14", amount: 1200.00, status: "Pending", description: "Surgical procedure" },
];

export default function Billing() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, 'id' | 'patientName' | 'status'>>({
    invoiceDate: "",
    dueDate: "",
    amount: 0,
    description: "",
  });
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");

  // Load initial invoices from local storage or mock data if none exist
  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    } else {
      setInvoices(mockInvoicesData);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewInvoice((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0, // Ensure it's a number
    }));
  };

  const handleSelectChange = (value: string) => {
    setSelectedPatientId(value);
  };

  const addInvoice = () => {
    const selectedPatient = mockPatients.find(p => p.id === selectedPatientId);

    if (!selectedPatient || !newInvoice.invoiceDate || !newInvoice.dueDate || !newInvoice.amount) {
      alert("Please select a patient and fill in Invoice Date, Due Date, and Amount.");
      return;
    }

    const invoiceToAdd: Invoice = {
      id: `inv${Date.now()}`, // Simple ID generation
      patientName: selectedPatient.name,
      status: "Unpaid", // Default status
      ...newInvoice,
    };

    const updatedInvoices = [...invoices, invoiceToAdd];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices)); // Save to local storage

    // Clear form and selections
    setNewInvoice({ invoiceDate: "", dueDate: "", amount: 0, description: "" });
    setSelectedPatientId("");
  };

  const deleteInvoice = (id: string) => {
    const updatedInvoices = invoices.filter((inv) => inv.id !== id);
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  const updateInvoiceStatus = (id: string, newStatus: "Paid" | "Unpaid" | "Pending") => {
    const updatedInvoices = invoices.map((inv) =>
      inv.id === id ? { ...inv, status: newStatus } : inv
    );
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Billing & Invoices</h1>

      <div className="mb-8 p-6 border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-4">Create New Invoice</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="patient-select">Patient</Label>
            <Select value={selectedPatientId} onValueChange={handleSelectChange}>
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
          <div>
            <Label htmlFor="invoice-date">Invoice Date</Label>
            <Input
              id="invoice-date"
              name="invoiceDate"
              type="date"
              value={newInvoice.invoiceDate}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="due-date">Due Date</Label>
            <Input
              id="due-date"
              name="dueDate"
              type="date"
              value={newInvoice.dueDate}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={newInvoice.amount === 0 ? "" : newInvoice.amount} // Show empty if 0 for cleaner input
              onChange={handleNumberInputChange}
              placeholder="0.00"
              className="mt-1"
            />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={newInvoice.description}
              onChange={handleInputChange}
              placeholder="Brief description of services/items"
              className="mt-1"
            />
          </div>
        </div>
        <Button onClick={addInvoice} className="mt-6">
          Create Invoice
        </Button>
      </div>

      <div className="border rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold p-6 pb-0">Invoice List</h2>
        <Table>
          <TableCaption>A list of all generated invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Invoice Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.patientName}</TableCell>
                <TableCell>{invoice.invoiceDate}</TableCell>
                <TableCell>{invoice.dueDate}</TableCell>
                <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                <TableCell>
                  <Select value={invoice.status} onValueChange={(newStatus) => updateInvoiceStatus(invoice.id, newStatus as "Paid" | "Unpaid" | "Pending")}>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Unpaid">Unpaid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>{invoice.description}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="destructive" size="sm" className="ml-2" onClick={() => deleteInvoice(invoice.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}