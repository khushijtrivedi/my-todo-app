import React, { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedList = localStorage.getItem("todoList");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedList) setTodoList(JSON.parse(storedList));
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // Add an item to the list
  const addItem = (item) => {
    setTodoList((prevList) => [...prevList, item]);
  };

  // Remove an item from the list
  const removeItem = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  // Update an item in the list
  const updateItem = (id, updatedItem) => {
    setTodoList((prevList) =>
      prevList.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  return (
    <TodoContext.Provider
      value={{ user, login, logout, todoList, addItem, removeItem, updateItem }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
