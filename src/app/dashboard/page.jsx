"use client";

import { useEffect, useState } from "react";
import { addTask, getTasks, completeTask } from "../actions/task";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function loadTasks() {
    const data = await getTasks();
    setTasks(data);
  }

  useEffect(() => {
    loadTasks();
  }, []);

  async function handleAdd() {
    if (!title) return;
    await addTask(title);
    setTitle("");
    loadTasks();
  }

  async function handleComplete(id) {
    await completeTask(id);
    loadTasks();
  }

  return (
    <main className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Study Tasks</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 flex-1"
          placeholder="New task"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="bg-black text-white p-2" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between border p-2"
          >
            <span className={task.completed ? "line-through" : ""}>
              {task.title}
            </span>
            {!task.completed && (
              <button
                className="text-sm text-blue-600"
                onClick={() => handleComplete(task.id)}
              >
                Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
