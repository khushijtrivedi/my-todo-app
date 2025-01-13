import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import TodoApp from "./component/TodoApp";
import { TodoProvider } from "./todoContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-300 flex items-center justify-center p-5">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center text-indigo-600">My To-Do List</h1>
        <TodoApp />
      </div>
    </div>
    </TodoProvider>
  </React.StrictMode>
);
