import React from "react";

const Header = ({ onLogin, onSaveList }) => {
  return (
    <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Title */}
        <h1 className="text-3xl font-bold">My To-Do List</h1>

        {/* Buttons */}
        <div className="space-x-4">
          <button
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md shadow hover:bg-blue-50 transition duration-300"
            onClick={onSaveList}
          >
            Save the List
          </button>
          <button
            className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-md shadow hover:bg-indigo-50 transition duration-300"
            onClick={onLogin}
          >
            Login
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
