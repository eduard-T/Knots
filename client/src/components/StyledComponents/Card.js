import React from "react";

const Card = ({
  children,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  style,
}) => {
  return (
    <div
      style={{
        minWidth: minWidth || "auto",
        maxWidth: maxWidth || "auto",
        minHeight: minHeight || "auto",
        maxHeight: maxHeight || "auto",
        borderRadius: "5px",
        backgroundColor: "white",
        wordBreak: "break-word",
        boxShadow: "0px 30px 85px -40px rgba(0,0,0,0.75)",
        padding: "10px",
        ...style,
      }}
    >
      <div>{children}</div>
    </div>
  );
};

export default Card;
