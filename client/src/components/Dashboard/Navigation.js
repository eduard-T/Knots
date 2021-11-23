import React from "react";

//components
import IconButton from "../StyledComponents/IconButton";

const Navigation = () => {
  const handleOpen = () => {
    document.getElementById("sidebar").style.width = "800px";
  };

  const iconSize = "25px";

  return (
    <div className="navigation">
      <IconButton
        source="/assets/home.png"
        alt="Home icon"
        // onClick={handleOpen}
        width={iconSize}
        height={iconSize}
        position="static"
      />

      <IconButton
        source="/assets/history.png"
        alt="History icon"
        onClick={handleOpen}
        width={iconSize}
        height={iconSize}
        position="static"
      />

      <IconButton
        source="/assets/user.png"
        alt="User icon"
        // onClick={handleOpen}
        width={iconSize}
        height={iconSize}
        position="static"
      />

      <IconButton
        source="/assets/logout.png"
        alt="Logout icon"
        // onClick={handleOpen}
        width={iconSize}
        height={iconSize}
        position="static"
      />
    </div>
  );
};

export default Navigation;
