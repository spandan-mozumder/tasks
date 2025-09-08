"use client";

import { ModeToggle } from "@/components/mode-toggle";
import Tasks from "@/components/tasks";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useState } from "react";

const Page = () => {
  const [incompleteTasks, setIncompleteTasks] = useState<string[]>([]);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      setIncompleteTasks((prev) => [...prev, newTask.trim()]);
      setNewTask("");
    }
  };

  const handleCompleteTask = (index: number) => {
    setIncompleteTasks((prev) => {
      const task = prev[index];
      if (!task) return prev;
      const next = prev.filter((_, i) => i !== index);
      setCompletedTasks((cprev) =>
        cprev.includes(task) ? cprev : [...cprev, task]
      );
      return next;
    });
  };

  const handleEditTask = (index: number, updated: string) => {
    setIncompleteTasks((prev) =>
      prev.map((t, i) => (i === index ? updated : t))
    );
  };

  const handleDeleteTask = (index: number, completed?: boolean) => {
    if (completed) {
      setCompletedTasks((prev) => prev.filter((_, i) => i !== index));
    } else {
      setIncompleteTasks((prev) => prev.filter((_, i) => i !== index));
    }
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

      <div className="p-10 flex flex-col gap-5">
        <Card className="gap-10 flex flex-row p-5">
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <Button className="cursor-pointer" onClick={handleAddTask}>
            Add
          </Button>
        </Card>

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Your Pending Tasks
        </h4>

        <Tasks
          incomplete={incompleteTasks}
          onComplete={handleCompleteTask}
          onEdit={handleEditTask}
          onDelete={handleDeleteTask}
        />

        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          Tasks You&apos;ve Completed
        </h4>

        <Tasks completed={completedTasks} onDelete={handleDeleteTask} />
      </div>
    </div>
  );
};

export default Page;
