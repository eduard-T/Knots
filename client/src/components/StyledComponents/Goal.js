import React from "react";

//components
import IconButton from "./IconButton";

const Goal = ({ type, description, style, completed }) => {
  const handleMenu = () => {
    console.log("Open Menu");
  };

  return (
    <li
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "1px solid lightgrey",
        minHeight: "60px",
        position: "relative",
        paddingLeft: completed ? "40px" : "0",
        fontSize: "16px",
        ...style,
      }}
    >
      {completed && (
        <img className="completeIcon" src="/assets/done.png" alt="Check mark" />
      )}
      <p style={{ width: completed ? "100%" : "60%" }}>{description}</p>
      {!completed && (
        <p
          style={{
            width: "150px",
            textAlign: "center",
            fontWeight: "600",
            color: "white",
            textShadow: "0 0 2px #444",
            padding: "10px 5px",
            borderRadius: "25px",
            backgroundColor:
              type === "Urgent"
                ? "rgb(255, 80, 80)"
                : type === "Long Term"
                ? "rgb(102, 102, 255)"
                : type === "Short Term"
                ? "limegreen"
                : "rgb(166, 166, 166)",
          }}
        >
          {type}
        </p>
      )}
      <IconButton
        source="/assets/menu.png"
        alt="Menu icon"
        onClick={handleMenu}
        width="30px"
        height="30px"
        position="static"
      />
    </li>
  );
};

export default Goal;
