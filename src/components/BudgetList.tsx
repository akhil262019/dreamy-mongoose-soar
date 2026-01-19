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
import { Button } from "@/components/ui/button"; // Import Button

interface Budget {
  id: number;
  category: string;
  amount: number;
}

interface BudgetListProps {
  budgets: Budget[];
  onDeleteBudget: (id: number) => void; // Implement delete callback
  onEditBudget: (budget: Budget) => void; // Add callback for editing
}

const BudgetList: React.FC<BudgetListProps> = ({ budgets, onDeleteBudget, onEditBudget }) => {

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this budget?")) {
      onDeleteBudget(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Budgets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Your current monthly budget allocations.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Category</TableHead>
              <TableHead>Budgeted Amount</TableHead>
              <TableHead>Actions</TableHead> {/* Add Actions header */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">No budgets set yet.</TableCell>
              </TableRow>
            ) : (
              budgets.map((budget) => (
                <TableRow key={budget.id}>
                  <TableCell>{budget.category}</TableCell>
                  <TableCell>${budget.amount.toFixed(2)}</TableCell>
                  <TableCell className="flex space-x-2">
                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditBudget(budget)} // Pass the entire budget object
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Button>
                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(budget.id)} // Use confirmation handler
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

export default BudgetList;