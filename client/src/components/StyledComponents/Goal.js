import React from "react";

//components
import IconButton from "./IconButton";

const Goal = ({ type, description, style, completed }) => {
  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid lightgrey",
        minHeight: "60px",
        position: "relative",
        filter: completed ? "invert(100%)" : null,
        ...style,
      }}
    >
      {completed && (
        <img className="completeIcon" src="/done.png" alt="Check mark" />
      )}
      <p>{description}</p>
      <p>{type}</p>
      <IconButton
        source="/assets/menu.png"
        alt="Menu icon"
        // onClick={handleClose}
        width="30px"
        height="30px"
        position="static"
      />
    </li>
  );
};

export default Goal;
