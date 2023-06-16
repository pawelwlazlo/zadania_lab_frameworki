import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskList from "./TaskList";
import TaskForm from "./TaskForm";
import "./App.css"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList/>} />
        <Route path="/create" element={<TaskForm/>} />
        <Route path="/edit/:id" element={<TaskForm/>} />
      </Routes>
    </Router>
  );
}

export default App;
