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
    // onClose() is called within handleSaveEditBudget in IndexPageAfter saving
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