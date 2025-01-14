import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import LoginForm from "./LoginForm";
import CreateListForm from "./CreateListForm";

const Header = () => {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showCreateListForm, setShowCreateListForm] = useState(false);
  const [showCreateListOption, setShowCreateListOption] = useState(false); // New state to handle Create List button visibility
  const { user, login, logout } = useTodoContext();

  // Show the login form when the Login button is clicked
  const handleLoginClick = () => {
    setShowLoginForm(true);
    setShowCreateListOption(false); // Ensure the "Create List" option is hidden when login button is clicked
  };

  // Close the login form
  const handleCloseLoginForm = () => {
    setShowLoginForm(false);
  };

  // Handle Save List button click
  const handleSaveListClick = () => {
    if (!user) {
      // If user is not logged in, show the login form with option to create list without login
      setShowLoginForm(true);
      setShowCreateListOption(true); // Show "Create List Without Login" option
    } else {
      // If logged in, show the create list form directly
      setShowCreateListForm(true);
    }
  };

  // Allow user to create list without login
  const handleCreateListWithoutLogin = () => {
    setShowLoginForm(false);
    setShowCreateListForm(true);
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

      {/* Show the create list form (after login or without login) */}
      {showCreateListForm && (
        <CreateListForm
          onClose={() => setShowCreateListForm(false)}
          onListCreated={(list) => {
            console.log(list);
            setShowCreateListForm(false); // Close form after list creation
          }}
        />
      )}
    </header>
  );
};

export default Header;
