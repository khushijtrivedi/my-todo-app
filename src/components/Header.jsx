import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import LoginForm from "./LoginForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCreateListOption, setShowCreateListOption] = useState(false); 
  const { user, login, logout } = useTodoContext();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowCreateListOption(false);
  };

  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  const handleSaveListClick = () => {
    if (!user) {
      setShowLoginForm(true);
      setShowCreateListOption(true);
    } else {
      navigate("/create-list"); // Navigate to Create List page
    }
  };

  const handleCreateListWithoutLogin = () => {
    setShowLoginForm(false);
    navigate("/create-list"); // Navigate to Create List page
  };

  const handleLogoutClick = () => {
    logout(); // Log out the user
    navigate("/"); // Redirect to home page after logout
  };

  return (
    <header className="bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-600 text-white py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-3xl font-bold">My To-Do List</h1>
        <div className="space-x-4">
          <button
            className="bg-white text-blue-600 font-medium px-4 py-2 rounded-md shadow hover:bg-blue-50 transition duration-300"
            onClick={handleSaveListClick}
          >
            Save the List
          </button>
          {user ? (
            <button
              className="bg-white text-red-600 font-medium px-4 py-2 rounded-md shadow hover:bg-red-50 transition duration-300"
              onClick={handleLogoutClick} // Use handleLogoutClick for logout
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

      {/* Show the login form when login button is clicked */}
      {showLoginForm && (
        <LoginForm onClose={handleCloseLoginForm} onLogin={login}>
          {/* Show "Create List Without Login" option only when Save List is clicked and user is not logged in */}
          {showCreateListOption && (
            <div className="text-center mt-4">
              <button
                onClick={handleCreateListWithoutLogin}
                className="text-blue-600 hover:underline"
              >
                Create List Without Login
              </button>
            </div>
          )}
        </LoginForm>
      )}
    </header>
  );
};

export default Header;
