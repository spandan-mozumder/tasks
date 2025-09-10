"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Tasks from "@/components/tasks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";
import { useTodo } from "@/hooks/todo";
import { Plus } from "lucide-react";
import OverlayLoader from "@/components/ui/overlay-loader";

const Page = () => {
  const { incomplete, completed, addTodo, markTodo, removeTodo, editTodo, initializeUser, fetchTodos, loading, processing } = useTodo();
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = async () => {
    if (newTask.trim() === "") return;
    await addTodo(newTask.trim());
    setNewTask("");
  };

  const handleCompleteTask = async (index: number) => {
    await markTodo(index);
  };

  const handleEditTask = (index: number, updated: string) => {
    editTodo(index, updated);
  };

  const handleDeleteTask = async (index: number, completed?: boolean) => {
  await removeTodo(index, completed);
  };

  return (
    <div>
      <OverlayLoader visible={loading || processing} />
      <div className="mx-auto max-w-3xl p-10 sm:px-6 lg:px-8">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="scroll-m-20 border-b pb-2 text-2xl sm:text-3xl font-semibold tracking-tight first:mt-0">
          Save Your Tasks on the Chain
        </h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
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
          <Button className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto" onClick={handleAddTask} aria-label="Add task" disabled={processing}>
            {processing ? (
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
              </svg>
            ) : (
              <Plus className="h-4 w-4" />
            )}
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
          processing={processing}
        />

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tasks You&apos;ve Completed
        </h4>

        <Tasks completed={completed} onDelete={handleDeleteTask} processing={processing} />

      </div>
    </div>
    </div>
  );
};

export default Page;
