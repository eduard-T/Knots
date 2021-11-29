import React from "react";

const Card = ({
  children,
  minWidth,
  minHeight,
  maxWidth,
  maxHeight,
  className,
  removeShadow,
  style,
}) => {
  return (
    <div
      className={className}
      style={{
        minWidth: minWidth || "auto",
        maxWidth: maxWidth || "auto",
        minHeight: minHeight || "auto",
        maxHeight: maxHeight || "auto",
        borderRadius: "5px",
        backgroundColor: "rgb(232, 232, 232)",
        wordBreak: "break-word",
        boxShadow: removeShadow
          ? "none"
          : "0px 30px 85px -40px rgba(0,0,0,0.75)",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;
