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

interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: "income" | "expense";
}

interface TransactionListProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: number) => void; // Add callback for deletion
  onEditTransaction: (transaction: Transaction) => void; // Modified to pass the whole transaction
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDeleteTransaction, onEditTransaction }) => {
  const getAmountColorClass = (type: "income" | "expense", amount: number) => {
    if (type === "income") return "text-green-600";
    return "text-red-600";
  };

  const handleDeleteClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      onDeleteTransaction(id);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent financial transactions.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Actions</TableHead> {/* Add Actions header */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">No transactions yet.</TableCell>
              </TableRow>
            ) : (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className={getAmountColorClass(transaction.type, transaction.amount)}>
                    {transaction.type === "income" ? "+" : "-"}
                    ${transaction.amount.toFixed(2)}
                  </TableCell>
                  <TableCell className={transaction.type === "income" ? "text-green-600" : "text-red-600"}>
                    {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                  </TableCell>
                  <TableCell className="flex space-x-2">
                    {/* Edit Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditTransaction(transaction)} // Pass the entire transaction object
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Edit
                    </Button>
                    {/* Delete Button */}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteClick(transaction.id)} // Use confirmation handler
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

export default TransactionList;