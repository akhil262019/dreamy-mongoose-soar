import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import BudgetForm from "@/components/BudgetForm";
import BudgetList from "@/components/BudgetList";
import GoalForm from "@/components/GoalForm";
import GoalList from "@/components/GoalList";
import FinancialSummary from "@/components/FinancialSummary";
import EditTransactionModal from "@/components/EditTransactionModal";
import EditBudgetModal from "@/components/EditBudgetModal"; // Import the budget edit modal

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

// Define the structure for a goal
interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;
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

  // State for goals
  const [goals, setGoals] = useState<Goal[]>([
    { id: 1, name: "Emergency Fund", targetAmount: 5000, savedAmount: 1200, deadline: "2024-12-31" },
    { id: 2, name: "New Car", targetAmount: 20000, savedAmount: 3500, deadline: "2025-06-30" },
  ]);

  // State for editing transaction modal
  const [isEditingModalOpen, setIsEditingModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // State for editing budget modal
  const [isEditingBudgetModalOpen, setIsEditingBudgetModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);


  // Function to add a new transaction
  const handleAddTransaction = (newTransactionData: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
      ...newTransactionData,
    };
    setTransactions([...transactions, newTransaction]);
  };

  // Function to delete a transaction
  const handleDeleteTransaction = (id: number) => {
    setTransactions(transactions.filter(transaction => transaction.id !== id));
  };

  // Function to open the edit modal with transaction data
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsEditingModalOpen(true);
  };

  // Function to save edited transaction
  const handleSaveEditTransaction = (updatedTransaction: Transaction) => {
    setTransactions(transactions.map(t => (t.id === updatedTransaction.id ? updatedTransaction : t)));
    setIsEditingModalOpen(false);
    setEditingTransaction(null);
  };

  // Function to close the edit modal
  const handleCloseEditModal = () => {
    setIsEditingModalOpen(false);
    setEditingTransaction(null);
  };

  // Function to open the edit modal with budget data
  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setIsEditingBudgetModalOpen(true);
  };

  // Function to save edited budget
  const handleSaveEditBudget = (updatedBudget: Budget) => {
    setBudgets(budgets.map(b => (b.id === updatedBudget.id ? updatedBudget : b)));
    setIsEditingBudgetModalOpen(false);
    setEditingBudget(null);
  };

  // Function to close the edit budget modal
  const handleCloseEditBudgetModal = () => {
    setIsEditingBudgetModalOpen(false);
    setEditingBudget(null);
  };

  // Function to add a new budget
  const handleAddBudget = (newBudgetData: Omit<Budget, "id">) => {
    const newBudget: Budget = {
      id: budgets.length > 0 ? budgets[budgets.length - 1].id + 1 : 1,
      ...newBudgetData,
    };
    setBudgets([...budgets, newBudget]);
  };

  // Function to add a new goal
  const handleAddGoal = (newGoalData: Omit<Goal, "id" | "savedAmount">) => {
    const newGoal: Goal = {
      id: goals.length > 0 ? goals[goals.length - 1].id + 1 : 1,
      savedAmount: 0, // New goals start with 0 saved amount
      ...newGoalData,
    };
    setGoals([...goals, newGoal]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Financial Planner Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <FinancialSummary transactions={transactions} /> {/* Pass transactions */}
        <TransactionForm onAddTransaction={handleAddTransaction} />
        <BudgetForm onAddBudget={handleAddBudget} />
        <GoalForm onAddGoal={handleAddGoal} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <TransactionList
          transactions={transactions}
          onDeleteTransaction={handleDeleteTransaction}
          onEditTransaction={handleEditTransaction} // Pass edit handler
        /> {/* Pass delete and edit handlers */}
        <BudgetList
          budgets={budgets}
          onDeleteBudget={() => {}} // Placeholder for delete budget
          onEditBudget={handleEditBudget} // Pass edit handler
        /> {/* Pass delete and edit handlers */}
        <GoalList goals={goals} />
      </div>

      {/* Render the EditTransactionModal */}
      <EditTransactionModal
        transactionToEdit={editingTransaction}
        isOpen={isEditingModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditTransaction}
      />

      {/* Render the EditBudgetModal */}
      <EditBudgetModal
        budgetToEdit={editingBudget}
        isOpen={isEditingBudgetModalOpen}
        onClose={handleCloseEditBudgetModal}
        onSave={handleSaveEditBudget}
      />
    </div>
  );
};

export default IndexPage;