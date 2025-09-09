"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Tasks from "@/components/tasks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import { useTodo } from "@/hooks/todo";

const Page = () => {
  const { incomplete, completed, addTodo, markTodo, removeTodo, initializeUser, fetchTodos, loading } = useTodo();
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    await addTodo(newTask.trim());
    setNewTask("");
  };

  const handleCompleteTask = async (index: number) => {
    // mark on chain by index (assumes ordering matches)
    await markTodo(index);
  };

  const handleEditTask = (index: number, updated: string) => {
    // Editing content in-place is not implemented on-chain in the program.
    // Keep it local for now. Consider adding an `update_todo` instruction.
  };

  const handleDeleteTask = async (index: number, completed?: boolean) => {
    await removeTodo(index);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          Save Your Tasks on the Chain
        </h2>
        <div className="flex gap-4 items-center justify-center">
          <ModeToggle />
          <WalletMultiButton />
        </div>
      </div>

      <div className="p-6 sm:p-10 flex flex-col gap-5">
        <Card className="gap-4 flex flex-col sm:flex-row p-4 sm:p-5 items-stretch">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="min-w-0 flex-1"
          />
          <Button className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto" onClick={handleAddTask}>
            Add
          </Button>
        </Card>

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your Pending Tasks
        </h4>

        <Tasks
          incomplete={incomplete}
          onComplete={handleCompleteTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tasks You&apos;ve Completed
        </h4>

  <Tasks completed={completed} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default Page;
