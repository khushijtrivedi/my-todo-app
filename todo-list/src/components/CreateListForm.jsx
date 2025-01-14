import React, { useState } from "react";

const CreateListForm = ({ onClose, onListCreated }) => {
  const [listTitle, setListTitle] = useState("");
  const [listItems, setListItems] = useState([""]);

  const handleAddItem = () => {
    setListItems([...listItems, ""]);
  };

  const handleItemChange = (index, value) => {
    const newItems = [...listItems];
    newItems[index] = value;
    setListItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newList = {
      title: listTitle,
      items: listItems.filter(item => item.trim() !== ""),
    };

    onListCreated(newList); // Pass the new list to the parent component
    onClose(); // Close the list creation form
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Create a New List</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              List Title
            </label>
            <input
              id="title"
              type="text"
              value={listTitle}
              onChange={(e) => setListTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
              required
              placeholder="Enter list title"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">List Items</label>
            {listItems.map((item, index) => (
              <div key={index} className="mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleItemChange(index, e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder={`Item ${index + 1}`}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddItem}
              className="bg-green-600 text-white px-4 py-2 rounded-md mt-2 hover:bg-green-700 transition-colors"
            >
              Add Item
            </button>
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Create List
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateListForm;
