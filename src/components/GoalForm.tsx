import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string; // Optional deadline
}

interface GoalFormProps {
  onAddGoal: (goal: Omit<Goal, "id" | "savedAmount">) => void;
}

const GoalForm: React.FC<GoalFormProps> = ({ onAddGoal }) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericTargetAmount = parseFloat(targetAmount);
    if (!name || isNaN(numericTargetAmount) || numericTargetAmount <= 0) {
      alert("Please enter a valid goal name and a positive target amount.");
      return;
    }
    onAddGoal({ name, targetAmount: numericTargetAmount, deadline: deadline || undefined });
    // Reset form fields
    setName("");
    setTargetAmount("");
    setDeadline("");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Set Financial Goal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="goal-name">Goal Name</Label>
            <Input
              id="goal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Down Payment, Vacation Fund"
              required
            />
          </div>
          <div>
            <Label htmlFor="goal-target-amount">Target Amount</Label>
            <Input
              id="goal-target-amount"
              type="number"
              step="0.01"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g., 10000.00"
              required
            />
          </div>
          <div>
            <Label htmlFor="goal-deadline">Deadline (Optional)</Label>
            <Input
              id="goal-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">Add Goal</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GoalForm;