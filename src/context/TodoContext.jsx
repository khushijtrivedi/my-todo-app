import React, { createContext, useState, useEffect, useContext } from "react";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [todoList, setTodoList] = useState([]);
  const [todoLists, setTodoLists] = useState([]); // Store all lists

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedLists = localStorage.getItem("todoLists");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedLists) setTodoLists(JSON.parse(storedLists));
  }, []);

  useEffect(() => {
    if (todoLists.length > 0) {
      localStorage.setItem("todoLists", JSON.stringify(todoLists));
    }
  }, [todoLists]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const addItem = (item) => {
    setTodoList((prevList) => [...prevList, item]);
  };

  const removeItem = (id) => {
    setTodoList((prevList) => prevList.filter((item) => item.id !== id));
  };

  const updateItem = (id, updatedItem) => {
    setTodoList((prevList) =>
      prevList.map((item) => (item.id === id ? updatedItem : item))
    );
  };

  const addList = (newList) => {
  setTodoLists((prevLists) => {
    const updatedLists = prevLists.map((list) =>
      list.id === newList.id ? { ...list, ...newList } : list
    );

    const isExistingList = prevLists.some((list) => list.id === newList.id);
    const finalLists = isExistingList ? updatedLists : [...prevLists, newList];

    localStorage.setItem("todoLists", JSON.stringify(finalLists));
    return finalLists;
  });
};

  return (
    <TodoContext.Provider
      value={{ user, login, logout, todoList, addItem, removeItem, updateItem, addList, todoLists }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => useContext(TodoContext);
