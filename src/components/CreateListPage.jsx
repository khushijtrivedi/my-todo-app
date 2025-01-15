import React, { useState, useEffect } from "react";
import { useTodoContext } from "../context/TodoContext";
import { useNavigate, useParams } from "react-router-dom";

const CreateListPage = () => {
  const { todoLists, addItem, removeItem, updateItem, addList } = useTodoContext();
  const { listId } = useParams();
  const [newItem, setNewItem] = useState("");
  const [listTitle, setListTitle] = useState("My To-Do List");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (listId) {
      const existingList = todoLists.find((list) => list.id === listId);
      if (existingList) {
        setListTitle(existingList.title);
        setTodoList(existingList.items);
      }
    }
  }, [listId, todoLists]);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;

    const item = { id: Date.now(), name: newItem, checked: false };
    setTodoList((prev) => [...prev, item]);
    setNewItem("");
  };

  const handleSaveList = () => {
  const updatedList = {
    id: listId || `${listTitle}_${Date.now()}`, // Use existing ID if editing
    title: listTitle,
    items: todoList,
    createdBy: JSON.parse(localStorage.getItem("user")).email,
  };

  addList(updatedList); // addList will update if the title matches
  navigate("/my-lists");
};

  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-4">
        {isEditingTitle ? (
          <input
            type="text"
            value={listTitle}
            onChange={(e) => setListTitle(e.target.value)}
            onBlur={() => setIsEditingTitle(false)}
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
            className={`flex items-center justify-between p-4 rounded-md shadow-md ${item.checked ? "bg-green-300 text-black" : "bg-red-400 text-white"}`}
          >
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => setTodoList((prev) =>
                  prev.map((i) => (i.id === item.id ? { ...i, checked: !i.checked } : i))
                )}
                className="mr-4"
              />
              <span>{item.name}</span>
            </div>
            <button
              onClick={() => setTodoList((prev) => prev.filter((i) => i.id !== item.id))}
              className="text-white hover:text-gray-200"
            >
              &times;
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSaveList}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Save List
      </button>
    </div>
  );
};

export default CreateListPage;
