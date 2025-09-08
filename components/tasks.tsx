import React, { useState } from "react";
import { Button } from "./ui/button";
import { Check, Pencil, Trash, X } from "lucide-react";
import { Input } from "./ui/input";

type TasksProps = {
  incomplete?: string[];
  completed?: string[];
  onComplete?: (index: number) => void;
  onEdit?: (index: number, newText: string) => void;
  onDelete?: (index: number, completed?: boolean) => void;
};

const Tasks: React.FC<TasksProps> = ({
  incomplete = [],
  completed = [],
  onComplete = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>("");

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
    <div className="p-5 space-y-4">
      {incomplete.length > 0 &&
        incomplete.map((task, idx) => (
          <div
            key={`in-${idx}`}
            className="flex items-center justify-between gap-10"
          >
            {editingIndex === idx ? (
              <div className="flex items-center gap-2 flex-1">
                <Input
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  autoFocus
                />
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => saveEdit(idx)}
                >
                  <Check />
                </Button>
                <Button size="sm" variant="outline" onClick={cancelEdit}>
                  <X />
                </Button>
              </div>
            ) : (
              <>
                <p className="flex-1">{task}</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onComplete(idx)}
                  >
                    <Check />
                  </Button>

                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => startEditing(idx, task)}
                  >
                    <Pencil />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-400 hover:text-red-600"
                    onClick={() => onDelete(idx, false)}
                  >
                    <Trash />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}

      {completed.length > 0 &&
        completed.map((task, idx) => (
          <div
            key={`done-${idx}`}
            className="flex items-center justify-between gap-10 opacity-80"
          >
            <p className="flex-1 text-muted-foreground">{task}</p>
            <Button
              size="sm"
              variant="outline"
              className="text-red-400 hover:text-red-600"
              onClick={() => onDelete(idx, true)}
            >
              <Trash />
            </Button>
          </div>
        ))}

      {incomplete.length === 0 && completed.length === 0 && (
        <p className="text-sm text-muted-foreground">No tasks</p>
      )}
    </div>
  );
};

export default Tasks;
