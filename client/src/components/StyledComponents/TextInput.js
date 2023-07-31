import React from "react"

//components
import IconButton from "./IconButton"

const TextInput = ({
  onChange,
  showLabel,
  placeholder,
  inputIcon,
  onIconClick,
  type,
  name,
  value,
  id,
  width,
  borderWidth,
  borderType,
  style
}) => {
  return (
    <div style={{ width: width || "100%", position: "relative" }}>
      <label className={showLabel ? "label" : "srOnly"} htmlFor={name}>
        {placeholder}
      </label>
      {inputIcon && (
        <IconButton
          source={inputIcon}
          alt="Input icon"
          onClick={onIconClick}
          width="25px"
          height="25px"
          top="15px"
          right="10px"
        />
      )}
      <input
        className="textInput"
        style={{
          width: "100%",
          padding: "10px",
          paddingRight: inputIcon ? "45px" : "10px",
          fontSize: "16px",
          borderRadius: "3px",
          borderColor: "grey",
          borderStyle: borderType || "solid",
          borderWidth: borderWidth,
          ...style
        }}
        type={type}
        name={name}
        id={id || name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  )
}

export default TextInput
