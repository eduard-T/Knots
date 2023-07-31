import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

//components
import Card from "../StyledComponents/Card"
import Goals from "./Screens/Goals"
import Completed from "./Screens/Completed"
import Profile from "./Screens/Profile"
import Navigation from "./Navigation"

const Dashboard = () => {
  const navigate = useNavigate()

  //store
  const { activeUser } = useSelector((state) => state.user)

  //initialize states
  const [tab, setTab] = useState("home")

  useEffect(() => {
    //if there is no active user, navigate to the login page
    if (!activeUser) {
      navigate("/login")
    }
  }, [activeUser, navigate])

  //handler to switch between tabs
  const handleChange = (tab) => {
    setTab(tab)
  }

  return (
    <div className="dashboard">
      {activeUser && (
        <Card className="dashboard__card" minHeight="550px">
          <nav className="dashboard__nav">
            <Navigation handleChange={handleChange} activeTab={tab} />
          </nav>
          {tab === "home" ? (
            <Goals />
          ) : tab === "completed" ? (
            <Completed />
          ) : (
            tab === "profile" && <Profile activeUser={activeUser} />
          )}
        </Card>
      )}
    </div>
  )
}

export default Dashboard
