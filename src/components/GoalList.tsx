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

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;
}

interface GoalListProps {
  goals: Goal[];
}

const GoalList: React.FC<GoalListProps> = ({ goals }) => {
  const getProgress = (goal: Goal): number => {
    if (goal.targetAmount === 0) return 0;
    return Math.min(100, (goal.savedAmount / goal.targetAmount) * 100);
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
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground">No goals set yet.</TableCell>
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