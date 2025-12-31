// components/TaskForm.tsx
"use client";
import { useState } from "react";

export default function TaskForm({
  onTaskCreated,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onTaskCreated: (task: any) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const res = await fetch("http://127.0.0.1:8000/api/tasks", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ title, description, priority }),
    });

    if (res.ok) {
      const data = await res.json();
      onTaskCreated(data); // On renvoie la tâche au parent
      setTitle("");
      setDescription("");
      setPriority("low");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full lg:w-4/5 text-slate-600 p-4 bg-gray-100 flex flex-col items-center gap-4 rounded-lg shadow-md"
    >
      <h2 className="font-semibold lg:text-2xl">Create your task</h2>
      <div className="flex flex-col justify-center items-center gap-4 lg:flex-row">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-60 h-14 p-2 border border-gray-300 rounded-lg"
          placeholder="Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-60 h-14 p-2 border border-gray-300 rounded-lg"
          placeholder="Description"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-60 h-14 p-2 border border-gray-300 rounded-lg"
        >
          <option value="low" className="text-sm text-slate-600">
            Low
          </option>
          <option value="medium" className="text-sm text-orange-500">
            Medium
          </option>
          <option value="high" className="text-sm text-red-500">
            High
          </option>
        </select>
        <button className="w-32 h-10 text-white bg-slate-950 lg:bg-slate-400 rounded-lg lg:hover:bg-slate-950 transition lg:w-36 lg:h-12 lg:cursor-pointer">
          Create
        </button>
      </div>
    </form>
  );
}
