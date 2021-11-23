import React from "react";

//components
import Goal from "../StyledComponents/Goal";
import Button from "../StyledComponents/Button";
import Header from "./Header";

const Goals = () => {
  const addGoal = () => {
    document.getElementById("sidebar").style.width = "800px";
  };

  return (
    <div className="dashboard__goals">
      <div className="goals__header">
        <Header user="Eduard" />
        <Button title="Add Goal" onClick={addGoal} />
      </div>
      <ul>
        <Goal type={"Urgent"} description={"Design UI"} />
      </ul>
    </div>
  );
};

export default Goals;
