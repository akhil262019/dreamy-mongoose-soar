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

interface Goal {
  id: number;
  name: string;
  targetAmount: number;
  savedAmount: number;
  deadline?: string;
}

interface EditGoalModalProps {
  goalToEdit: Goal | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedGoal: Goal) => void;
}

const EditGoalModal: React.FC<EditGoalModalProps> = ({
  goalToEdit,
  isOpen,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [savedAmount, setSavedAmount] = useState("");
  const [deadline, setDeadline] = useState("");

  // Populate form when goalToEdit changes
  useEffect(() => {
    if (goalToEdit) {
      setName(goalToEdit.name);
      setTargetAmount(goalToEdit.targetAmount.toString());
      setSavedAmount(goalToEdit.savedAmount.toString());
      setDeadline(goalToEdit.deadline || "");
    }
  }, [goalToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericTargetAmount = parseFloat(targetAmount);
    const numericSavedAmount = parseFloat(savedAmount);

    if (
      !goalToEdit ||
      !name ||
      isNaN(numericTargetAmount) ||
      numericTargetAmount <= 0 ||
      isNaN(numericSavedAmount) ||
      numericSavedAmount < 0
    ) {
      alert("Please enter a valid goal name, a positive target amount, and a non-negative saved amount.");
      return;
    }

    onSave({
      ...goalToEdit,
      name,
      targetAmount: numericTargetAmount,
      savedAmount: numericSavedAmount,
      deadline: deadline || undefined,
    });
    // onClose() is called within handleSaveEditGoal in IndexPage after onSave
  };

  // If no goal is being edited, don't render the modal content
  if (!goalToEdit) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogDescription>
            Make changes to your financial goal here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="edit-goal-name">Goal Name</Label>
            <Input
              id="edit-goal-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-goal-target-amount">Target Amount</Label>
            <Input
              id="edit-goal-target-amount"
              type="number"
              step="0.01"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-goal-saved-amount">Saved Amount</Label>
            <Input
              id="edit-goal-saved-amount"
              type="number"
              step="0.01"
              value={savedAmount}
              onChange={(e) => setSavedAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-goal-deadline">Deadline (Optional)</Label>
            <Input
              id="edit-goal-deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
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

export default EditGoalModal;