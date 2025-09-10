import React, { useState } from "react";
import { Button } from "./ui/button";
import { Check, Pencil, Trash, X } from "lucide-react";
import { Input } from "./ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@radix-ui/react-tooltip";
import ConfirmDialog from "./ui/confirm-dialog";

type TasksProps = {
  incomplete?: string[];
  completed?: string[];
  onComplete?: (index: number) => void;
  onEdit?: (index: number, newText: string) => void;
  onDelete?: (index: number, completed?: boolean) => void;
  processing?: boolean;
};

const Tasks: React.FC<TasksProps> = ({
  incomplete = [],
  completed = [],
  onComplete = () => {},
  onEdit = () => {},
  onDelete = () => {},
  processing = false,
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [openCompleted, setOpenCompleted] = useState<boolean | undefined>(false);

  const startEditing = (index: number, text: string) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const saveEdit = (index: number) => {
    if (editingText.trim() !== "") {
      onEdit(index, editingText.trim());
    }
    setEditingIndex(null);
    setEditingText("");
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditingText("");
  };

  return (
    <TooltipProvider>
      <div className="p-3 sm:p-5 space-y-4">
      {incomplete.length > 0 &&
        incomplete.map((task, idx) => (
          <div key={`in-${idx}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-10">
            {editingIndex === idx ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  autoFocus
                />

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => saveEdit(idx)} aria-label="Save edit">
                      <Check className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Save</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={cancelEdit} aria-label="Cancel edit">
                      <X className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Cancel</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <>
                <p className="flex-1 break-words">{task}</p>
                <div className="flex gap-2 flex-wrap">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => onComplete(idx)} aria-label="Mark complete" disabled={processing}>
                        <Check className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Mark complete</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" onClick={() => startEditing(idx, task)} aria-label="Edit task" disabled={processing}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Edit</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <ConfirmDialog
                        trigger={({ disabled }) => (
                          <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => { setOpenIndex(idx); setOpenCompleted(false); }} aria-label="Delete task" disabled={disabled}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                        title="Delete task?"
                        description="This will permanently remove the task on-chain. Are you sure?"
                        onConfirm={() => { if (openIndex !== null) onDelete(openIndex, false); }}
                        disabled={processing}
                      />
                    </TooltipTrigger>
                    <TooltipContent side="top">Delete</TooltipContent>
                  </Tooltip>
                </div>
              </>
            )}
          </div>
        ))}

      {completed.length > 0 &&
        completed.map((task, idx) => (
          <div key={`done-${idx}`} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-10 opacity-80">
            <p className="flex-1 text-muted-foreground break-words">{task}</p>

            <Tooltip>
              <TooltipTrigger asChild>
                <ConfirmDialog
                  trigger={({ disabled }) => (
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => { setOpenIndex(idx); setOpenCompleted(true); }} aria-label="Delete completed" disabled={disabled}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  )}
                  title="Delete task?"
                  description="This will permanently remove the completed task on-chain. Are you sure?"
                  onConfirm={() => { if (openIndex !== null) onDelete(openIndex, true); }}
                  disabled={processing}
                />
              </TooltipTrigger>
              <TooltipContent side="top">Delete</TooltipContent>
            </Tooltip>
            
          </div>
        ))}

      {incomplete.length === 0 && completed.length === 0 && (
        <p className="text-sm text-muted-foreground">No tasks</p>
      )}
      </div>
    </TooltipProvider>
  );
};

export default Tasks;
