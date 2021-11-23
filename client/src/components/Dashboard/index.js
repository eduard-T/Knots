import React from "react";

//components
import Goals from "./Goals";
import Completed from "./Completed";
import Navigation from "./Navigation";

const Dashboard = () => {
  return (
    <div className="dashboard wrapper">
      <div className="dashboard__nav">
        <Navigation />
      </div>
      <Goals />
      <Completed />
    </div>
  );
};

export default Dashboard;
