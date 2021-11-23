import React from "react";
import Goal from "../StyledComponents/Goal";

//components
import IconButton from "../StyledComponents/IconButton";

const Completed = () => {
  const handleClose = () => {
    document.getElementById("sidebar").style.width = "0";
  };

  return (
    <div className="completed" id="sidebar">
      <IconButton
        source="/assets/close.png"
        alt="Close icon"
        onClick={handleClose}
        width="30px"
        height="30px"
        left="20px"
        top="20px"
      />
      <p className="completed__title">Completed Goals</p>
      <ul className="completed__list">
        <Goal completed type="Long-Term" description="Test" />
      </ul>
    </div>
  );
};

export default Completed;
