import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import BudgetForm from "@/components/BudgetForm"; // Import BudgetForm
import BudgetList from "@/components/BudgetList"; // Import BudgetList

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

// Define the structure for a budget
interface Budget {
  id: number;
  category: string;
  amount: number;
}

const IndexPage: React.FC = () => {
  // State for transactions
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, description: "Salary", amount: 3000, type: "income" },
    { id: 2, description: "Groceries", amount: 150, type: "expense" },
    { id: 3, description: "Rent", amount: 1200, type: "expense" },
    { id: 4, description: "Freelance Gig", amount: 500, type: "income" },
  ]);

  // State for budgets
  const [budgets, setBudgets] = useState<Budget[]>([
    { id: 1, category: "Groceries", amount: 400 },
    { id: 2, category: "Rent", amount: 1200 },
    { id: 3, category: "Utilities", amount: 200 },
  ]);

  // Function to add a new transaction
  const handleAddTransaction = (newTransactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
      ...newTransactionData,
    };
    setTransactions([...transactions, newTransaction]);
  };

  // Function to add a new budget
  const handleAddBudget = (newBudgetData: Omit<Budget, "id">) => {
    const newBudget: Budget = {
      id: budgets.length > 0 ? budgets[budgets.length - 1].id + 1 : 1,
      ...newBudgetData,
    };
    setBudgets([...budgets, newBudget]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Planner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <FinancialSummary />
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <BudgetForm onAddBudget={handleAddBudget} /> {/* Add BudgetForm */}
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TransactionList transactions={transactions} />
        <BudgetList budgets={budgets} /> {/* Add BudgetList */}
      </div>
    </div>
  );
};

export default IndexPage;