"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";

export default function TasksPage() {
  const [userName, setUserName] = useState("Utilisateur");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [tasks, setTasks] = useState<any[]>([]);
  useEffect(() => {
    const savedName = localStorage.getItem("userName");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (savedName) setUserName(savedName);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://127.0.0.1:8000/api/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        }
      } catch {
        console.error("Erreur réseau");
      }
    };
    fetchTasks();
  }, []);

  const handleTaskCreated = (newTask: []) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  const completeTask = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ is_completed: true }),
    });

    if (res.ok) {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, is_completed: true } : t))
      );
    }
  };

  const deleteTask = async (id: number) => {
    const token = localStorage.getItem("token");
    const res = await fetch(`http://127.0.0.1:8000/api/tasks/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    }
  };

  return (
    <main className="p-4 lg:px-20 bg-gray-50 min-h-screen">
      <Navbar userName={userName} />

      <div className="flex flex-col items-center gap-10">
        <TaskForm onTaskCreated={handleTaskCreated} />

        <div className="w-full flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-6 text-slate-600">
            my to-do list
          </h1>

          <div className="flex flex-col gap-4">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">
                Chargement ou aucune tâche...
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
