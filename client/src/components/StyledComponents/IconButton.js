import React from "react"

const IconButton = ({
  source,
  alt,
  width,
  height,
  position,
  top,
  bottom,
  left,
  right,
  onClick,
  isActive,
  style
}) => {
  return (
    <>
      <img
        className="iconButton"
        style={{
          width: width || "18px",
          height: height || "18px",
          display: "flex",
          alignSelf: "center",
          position: position || "absolute",
          top: top || null,
          bottom: bottom || null,
          left: left || null,
          right: right || null,
          boxSizing: "content-box",
          borderBottom: `2px solid ${isActive ? "orangered" : "transparent"}`,
          ...style
        }}
        src={source}
        alt={alt}
        onClick={onClick}
      />
    </>
  )
}

export default IconButton
