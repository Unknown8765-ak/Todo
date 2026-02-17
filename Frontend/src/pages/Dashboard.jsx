import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTasks,
  addTask,
  updateTask,
  deleteTask
} from "../features/task/taskSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks);

  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/v1/tasks", {
          credentials: "include"
        });
        const result = await res.json();
        if (res.ok) dispatch(setTasks(result.data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      if (editingId) {
        const res = await fetch(
          `http://localhost:8000/api/v1/tasks/${editingId}`,
          {
            method: "PATCH",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
          }
        );
        const result = await res.json();
        if (res.ok) {
          dispatch(updateTask(result.data));
          setEditingId(null);
        }
      } else {
        const res = await fetch(
          "http://localhost:8000/api/v1/tasks",
          {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title })
          }
        );
        const result = await res.json();
        if (res.ok) dispatch(addTask(result.data));
      }
      setTitle("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/tasks/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      if (res.ok) dispatch(deleteTask(id));
    } catch (error) {
      console.error(error);
    }
  };

  const toggleComplete = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/v1/tasks/${task._id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ completed: !task.completed })
        }
      );
      const result = await res.json();
      if (res.ok) dispatch(updateTask(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 flex justify-center items-start">
      
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-3xl p-8">

        <h1 className="text-3xl font-bold text-white text-center mb-6">
          📝 My Tasks
        </h1>

        {/* Task Form */}
        <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
          <input
            type="text"
            placeholder="Enter your task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 px-4 py-2 rounded-xl bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-white text-indigo-600 font-semibold hover:scale-105 transition-all"
          >
            {editingId ? "Update" : "Add"}
          </button>
        </form>

        {/* Task List */}
        <ul className="space-y-4">
          {tasks.length === 0 && (
            <p className="text-center text-white/70">
              No tasks yet 🚀 Add one!
            </p>
          )}

          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-white/20 backdrop-blur-md p-4 rounded-2xl shadow-md hover:scale-[1.02] transition-all"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(task)}
                  className="w-5 h-5 accent-indigo-600"
                />
                <span
                  className={`text-white text-lg ${
                    task.completed
                      ? "line-through opacity-60"
                      : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setTitle(task.title);
                    setEditingId(task._id);
                  }}
                  className="text-yellow-300 hover:scale-110 transition"
                >
                  ✏ Edit
                </button>

                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-400 hover:scale-110 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default Dashboard;
