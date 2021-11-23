import React from "react";
import "./style.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components
import Welcome from "./components/Welcome";
import Dashboard from "./components/Dashboard";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
