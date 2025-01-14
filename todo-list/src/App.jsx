import React from "react";
import Header from "./components/Header";
import { TodoProvider } from "./context/TodoContext";

const App = () => {
  const handleSaveList = () => {
    alert("Save List button clicked!");
  };

  return (
    <TodoProvider>
      <div>
        <Header onSaveList={handleSaveList} />
      </div>
    </TodoProvider>
  );
};

export default App;
