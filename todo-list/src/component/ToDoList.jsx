import React from "react";

const TodoList = ({ tasks, toggleTaskCompletion, deleteTask }) => {
  return (
    <ul className="mt-6">
      {tasks.map((task) => (
        <li
          key={task.id}
          className={`flex items-center justify-between px-4 py-2 border-b ${
            task.priority === "High"
              ? "bg-red-100 border-red-300"
              : task.priority === "Normal"
              ? "bg-yellow-100 border-yellow-300"
              : "bg-green-100 border-green-300"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTaskCompletion(task.id)}
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span
              className={`${
                task.completed ? "line-through text-gray-500" : ""
              } font-medium`}
            >
              {task.text}
            </span>
          </div>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-600 hover:text-red-800"
          >
            &times;
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
