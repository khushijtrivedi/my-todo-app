import React, { useState, useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";

const CreateListPage = () => {
  const { todoList, addItem, removeItem, updateItem } = useTodoContext();
  const [newItem, setNewItem] = useState("");
  const [listTitle, setListTitle] = useState(""); // Title should be persisted
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Load list title from localStorage on component mount
  useEffect(() => {
    const savedTitle = localStorage.getItem("listTitle");
    if (savedTitle) {
      setListTitle(savedTitle); // Set the saved title
    } else {
      setListTitle("My To-Do List"); // Default title
    }
  }, []);

  // Save the list title to localStorage when it changes
  useEffect(() => {
    if (listTitle) {
      localStorage.setItem("listTitle", listTitle); // Save title to localStorage
    }
  }, [listTitle]);

  // Handle adding a new item
  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item = { id: Date.now(), name: newItem, checked: false };
    addItem(item);
    setNewItem(""); // Clear the input after adding
  };

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    const item = todoList.find((item) => item.id === id);
    updateItem(id, { ...item, checked: !item.checked });
  };

  // Handle title change
  const handleTitleChange = (e) => {
    setListTitle(e.target.value);
  };

  // Save title after editing
  const handleSaveTitle = () => {
    setIsEditingTitle(false);
  };

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-4">
        {isEditingTitle ? (
          <input
            type="text"
            value={listTitle}
            onChange={handleTitleChange}
            onBlur={handleSaveTitle}
            autoFocus
            className="text-2xl font-bold text-center border-b-2 border-gray-300 focus:border-blue-500 outline-none"
          />
        ) : (
          <h2
            className="text-2xl font-bold cursor-pointer"
            onClick={() => setIsEditingTitle(true)}
          >
            {listTitle}
          </h2>
        )}
      </div>

      <form onSubmit={handleAddItem} className="flex items-center mb-4">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
        <button type="submit" className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-md">
          Add Item
        </button>
      </form>

      <ul className="space-y-2">
        {todoList.map((item) => (
          <li
            key={item.id}
            className={`flex items-center justify-between p-4 rounded-md shadow-md ${item.checked ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheckboxChange(item.id)}
                className="mr-4"
              />
              <span className="flex-1">{item.name}</span>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-white hover:text-gray-200"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CreateListPage;
