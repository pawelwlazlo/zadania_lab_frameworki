import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import DetailsPage from "./DetailsPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={HomePage} />
        <Route path="/details/:id" element={DetailsPage} />
      </Routes>
    </Router>
  );
}

export default App;
