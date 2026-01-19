import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // Import Progress component
import { Button } from "@/components/ui/button"; // Import Button

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;
}

interface GoalListProps {
  goals: Goal[];
  onDeleteGoal: (id: number) => void; // Implement delete callback
  onEditGoal: (goal: Goal) => void; // Add callback for editing
}

const GoalList: React.FC<GoalListProps> = ({ goals, onDeleteGoal, onEditGoal }) => {
  const getProgress = (goal: Goal): number => {
    if (goal.targetAmount === 0) return 0;
    return Math.min(100, (goal.savedAmount / goal.targetAmount) * 100);
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this goal?")) {
      onDeleteGoal(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Goals</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Your progress towards financial goals.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Goal</TableHead>
              <TableHead>Target Amount</TableHead>
              <TableHead>Saved Amount</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead>Actions</TableHead> {/* Add Actions header */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">No goals set yet.</TableCell>
              </TableRow>
            ) : (
              goals.map((goal) => (
                <TableRow key={goal.id}>
                  <TableCell>{goal.name}</TableCell>
                  <TableCell>${goal.targetAmount.toFixed(2)}</TableCell>
                  <TableCell>${goal.savedAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Progress value={getProgress(goal)} className="w-[150px]" />
                  </TableCell>
                  <TableCell>{goal.deadline ? new Date(goal.deadline).toLocaleDateString() : "N/A"}</TableCell>
                  <TableCell className="flex space-x-2">
                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditGoal(goal)} // Pass the entire goal object
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Button>
                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(goal.id)} // Use confirmation handler
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GoalList;