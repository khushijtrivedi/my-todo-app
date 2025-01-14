import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext"; // Import context to manage login state
import LoginForm from "./LoginForm";

const Header = ({ onSaveList }) => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const { user, login, logout } = useTodoContext(); // Access login state and methods from context

  const handleLoginClick = () => {
    setShowLoginForm(true); // Show login form when login button is clicked
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false); // Close login form
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">My To-Do List</h1>
        <div className="space-x-4">
          <button
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md shadow hover:bg-blue-50 transition duration-300"
            onClick={onSaveList}
          >
            Save the List
          </button>
          {user ? (
            <button
              className="bg-white text-red-600 font-medium px-4 py-2 rounded-md shadow hover:bg-red-50 transition duration-300"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <button
              className="bg-white text-indigo-600 font-medium px-4 py-2 rounded-md shadow hover:bg-indigo-50 transition duration-300"
              onClick={handleLoginClick}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Show the login form if the login button is clicked */}
      {showLoginForm && <LoginForm onClose={handleCloseLoginForm} onLogin={login} />}
    </header>
  );
};

export default Header;
