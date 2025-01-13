import React, { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const addTodo = (text, priority) => {
    const newTodo = { id: Date.now(), text, priority, completed: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };


  return (
    <TodoContext.Provider value={{ todos, addTodo, toggleTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
