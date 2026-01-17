import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionForm from "@/components/TransactionForm"; // Import the new component
import TransactionList from "@/components/TransactionList"; // Import the new component

// Placeholder component for financial summary
const FinancialSummary: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg">Current Balance: $10,000.00</p>
        <p className="text-muted-foreground">Income This Month: $5,000.00</p>
        <p className="text-muted-foreground">Expenses This Month: $3,000.00</p>
        <Button className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
};

// Define the structure for a transaction
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}

const IndexPage: React.FC = () => {
  // State to hold the list of transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    // Initial dummy data
    { id: 1, description: "Salary", amount: 3000, type: "income" },
    { id: 2, description: "Groceries", amount: 150, type: "expense" },
    { id: 3, description: "Rent", amount: 1200, type: "expense" },
    { id: 4, description: "Freelance Gig", amount: 500, type: "income" },
  ]);

  // Function to add a new transaction
  const handleAddTransaction = (newTransactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
      ...newTransactionData,
    };
    setTransactions([...transactions, newTransaction]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Planner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <FinancialSummary />
        {/* Add TransactionForm here */}
        <TransactionForm onAddTransaction={handleAddTransaction} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Add TransactionList here */}
        <TransactionList transactions={transactions} />
      </div>
    </div>
  );
};

export default IndexPage;