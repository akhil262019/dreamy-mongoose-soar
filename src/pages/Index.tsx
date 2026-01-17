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
import EditTransactionModal from "@/components/EditTransactionModal"; // Import the modal

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
        <BudgetList budgets={budgets} />
        <GoalList goals={goals} />
      </div>

      {/* Render the EditTransactionModal */}
      <EditTransactionModal
        transactionToEdit={editingTransaction}
        isOpen={isEditingModalOpen}
        onClose={handleCloseEditModal}
        onSave={handleSaveEditTransaction}
      />
    </div>
  I've added a modal for editing transactions. You can now click the "Edit" button on any transaction to open a modal, make changes, and save them.
<scalix-chat-summary>Created an EditTransactionModal component and integrated it into the IndexPage. Updated TransactionList to pass the entire transaction object for editing. Implemented logic in IndexPage to handle opening, saving, and closing the edit modal.</scalix-chat-summary><think>
The user wants to continue building the financial planner app. They have just had the edit functionality for transactions added via a modal. The next logical step is to implement editing for other data types, such as budgets and goals. I will start with budgets.

**Plan:**
1.  **Create `EditBudgetModal.tsx`**: A modal component for editing budget details. It will contain a form similar to `BudgetForm`.
2.  **Update `BudgetList.tsx`**: Modify the `onEditBudget` prop (which needs to be added) to pass the *entire budget object* to the parent, not just the ID. Add an "Edit" button to each budget row.
3.  **Update `IndexPage.tsx`**:
    *   Add state to manage the modal's visibility (`isEditingBudgetModalOpen`) and the budget being edited (`editingBudget`).
    *   Implement `handleEditBudget` to set `editingBudget` and open the modal.
    *   Implement `handleSaveEditBudget` to update the `budgets` state and close the modal.
    *   Implement `handleCloseEditBudgetModal` to close the modal and reset `editingBudget`.
    *   Render the `EditBudgetModal` conditionally, passing the necessary props.
    *   Add the `onEditBudget` prop to `BudgetList` in the `return` statement.
4.  **Update `scalix-chat-summary`**.

**Constraint Checklist & Confidence Score:**
1. Reply in user's language: Yes
2. Exactly one `scalix-chat-summary`: Yes
3. If request implemented, say so: N/A (request is to continue)
4. Only edit files related to request: Yes
5. ALL `<scalix-*>` tags use double quotes: Yes
6. NO lazy coding: Yes (will write full file content)
7. Update main page: Yes
8. Use shadcn/ui: Yes
9. Use Tailwind CSS: Yes
10. Resolve all imports: Yes
11. Add missing deps: N/A (no new deps needed)

Confidence Score: 5/5

**Mental Sandbox Simulation:**
*   The "Edit" button in `BudgetList` will call `onEditBudget(budget)`.
*   `IndexPage`'s `handleEditBudget` will receive the `budget` object, set `editingBudget` to it, and set `isEditingBudgetModalOpen` to `true`.
*   The `EditBudgetModal` will receive `editingBudget` and `isEditingBudgetModalOpen`. Its `useEffect` will populate its internal form state with `editingBudget`'s data.
*   When the user saves in the modal, `handleSaveEditBudget` will be called with the updated budget data. This function will update the `budgets` state in `IndexPage` using `map` and then close the modal.
*   `BudgetForm` is not reused; a new form structure will be defined within `EditBudgetModal`.

**Refinement:**
The plan looks solid. I will proceed with creating the `EditBudgetModal` and updating `BudgetList` and `IndexPage`.
</think>
I'll add a modal component for editing budgets, similar to how we handled transaction editing. This will allow you to modify budget categories and amounts.

<scalix-write path="src/components/EditBudgetModal.tsx" description="Create a modal component for editing budgets.">
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Budget {
  id: number;
  category: string;
  amount: number;
}

interface EditBudgetModalProps {
  budgetToEdit: Budget | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedBudget: Budget) => void;
}

const EditBudgetModal: React.FC<EditBudgetModalProps> = ({
  budgetToEdit,
  isOpen,
  onClose,
  onSave,
}) => {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");

  // Populate form when budgetToEdit changes
  useEffect(() => {
    if (budgetToEdit) {
      setCategory(budgetToEdit.category);
      setAmount(budgetToEdit.amount.toString());
    }
  }, [budgetToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (!budgetToEdit || !category || isNaN(numericAmount) || numericAmount <= 0) {
      alert("Please enter a valid category and a positive budget amount.");
      return;
    }
    onSave({
      ...budgetToEdit,
      category,
      amount: numericAmount,
    });
    // onClose() is called within handleSaveEditBudget in IndexPage after onSave
  };

  // If no budget is being edited, don't render the modal content
  if (!budgetToEdit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogDescription>
            Make changes to your budget here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-budget-category">Category</Label>
            <Input
              id="edit-budget-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-budget-amount">Amount</Label>
            <Input
              id="edit-budget-amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit">Save Changes</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditBudgetModal;