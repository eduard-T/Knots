import React from "react"
import "./style.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

//components
import Welcome from "./components/Welcome"
import Dashboard from "./components/Dashboard"
import Register from "./components/User/Register"
import Login from "./components/User/Login"

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
