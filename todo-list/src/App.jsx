// src/App.js
import React from "react";
import Header from "./component/Header";

const App = () => {
  const handleLogin = () => {
    alert("Login button clicked!");
  };

  return (
    <div>
      <Header onLogin={handleLogin} />
    </div>
  );
};

export default App;
