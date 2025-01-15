import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext";
import Header from "./components/Header";
import CreateListPage from "./components/CreateListPage";
import MyListsPage from "./components/MyListsPage";

const App = () => {
  return (
    <TodoProvider>
      <Router>
        <Header />
        <Routes>
  <Route path="/" element={<div />} />
  <Route path="/create-list" element={<CreateListPage />} />
  <Route path="/create-list/:listId" element={<CreateListPage />} /> {/* Make sure this path exists */}
  <Route path="/my-lists" element={<MyListsPage />} />
</Routes>

      </Router>
    </TodoProvider>
  );
};

export default App;
