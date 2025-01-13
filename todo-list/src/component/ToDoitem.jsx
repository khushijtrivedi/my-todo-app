import React from "react";
import { useTodos } from "../todoContext";

const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodos();

  return (
    <li
      className={`flex items-center justify-between p-2 border rounded ${
        todo.completed ? "bg-green-100 line-through" : ""
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="mr-2"
        />
        {todo.text} <span className="text-sm text-gray-500">({todo.priority})</span>
      </div>
      <button
        onClick={() => deleteTodo(todo.id)}
        className="text-red-500 font-bold"
      >
        X
      </button>
    </li>
  );
};

export default TodoItem;
