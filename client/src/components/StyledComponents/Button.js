import React from "react";

const Button = ({
  onClick,
  type,
  title,
  id,
  backgroundColor,
  textColor,
  width,
  style,
}) => {
  return (
    <button
      style={{
        backgroundColor: backgroundColor || "orangered",
        border: "none",
        color: textColor || "white",
        fontSize: "18px",
        fontWeight: "600",
        padding: "10px",
        borderRadius: "2px",
        width: width,
        ...style,
      }}
      className="button"
      type={type}
      onClick={onClick}
      id={id}
    >
      {title}
    </button>
  );
};

export default Button;
