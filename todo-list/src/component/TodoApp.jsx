import React, { useState } from "react";
import TodoList from "./TodoList";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState("Normal");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj = {
      id: Date.now(),
      text: newTask,
      priority,
      completed: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div>
      <div className="flex gap-3 mt-4">
        <input
          type="text"
          placeholder="Add a new task..."
          className="flex-grow px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={addTask}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      <TodoList
        tasks={tasks}
        toggleTaskCompletion={toggleTaskCompletion}
        deleteTask={deleteTask}
      />
    </div>
  );
};

export default TodoApp;
