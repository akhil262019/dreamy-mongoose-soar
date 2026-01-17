import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Budget {
  id: number;
  category: string;
  amount: number;
}

interface BudgetFormProps {
  onAddBudget: (budget: Omit<Budget, "id">) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ onAddBudget }) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!category || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid category name and a positive budget amount.");
      return;
    }
    onAddBudget({ category, amount: numericAmount });
    // Reset form fields
    setCategory("");
    setAmount("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Budget</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="budget-category">Category</Label>
            <Input
              id="budget-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Groceries, Entertainment"
              required
            />
          </div>
          <div>
            <Label htmlFor="budget-amount">Amount</Label>
            <Input
              id="budget-amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g., 500.00"
              required
            />
          </div>
          <Button type="submit" className="w-full">Add Budget</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BudgetForm;