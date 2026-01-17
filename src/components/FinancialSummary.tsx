import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Define the structure for a transaction
interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}

// Define props for FinancialSummary
interface FinancialSummaryProps {
  transactions: Transaction[];
}

const FinancialSummary: React.FC<FinancialSummaryProps> = ({ transactions }) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpenses;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold">Current Balance: ${currentBalance.toFixed(2)}</p>
        <p className="text-green-600">Income This Month: +${totalIncome.toFixed(2)}</p>
        <p className="text-red-600">Expenses This Month: -${totalExpenses.toFixed(2)}</p>
        <Button className="mt-4">View Details</Button>
      </CardContent>
    </Card>
  );
};

export default FinancialSummary;