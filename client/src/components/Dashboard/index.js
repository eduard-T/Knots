import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//components
import Card from "../StyledComponents/Card";
import Goals from "./Goals";
import Completed from "./Completed";
import Profile from "./Profile";
import Navigation from "./Navigation";

const Dashboard = () => {
  const [tab, setTab] = useState("home");
  const navigate = useNavigate();

  //user state
  const { activeUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!activeUser) {
      navigate("/login");
    }
  }, [activeUser, navigate]);

  const handleChange = (tab) => {
    setTab(tab);
  };

  return (
    <div className="dashboard">
      <Card minHeight="550px" minWidth="80%" style={{ display: "flex" }}>
        <nav className="dashboard__nav">
          <Navigation handleChange={handleChange} activeTab={tab} />
        </nav>
        {tab === "home" ? (
          <Goals />
        ) : tab === "completed" ? (
          <Completed />
        ) : (
          tab === "profile" && <Profile />
        )}
      </Card>
    </div>
  );
};

export default Dashboard;
