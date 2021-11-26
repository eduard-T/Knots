import React from "react";
import { useDispatch } from "react-redux";

//components
import IconButton from "../StyledComponents/IconButton";

//reducers
import { logoutUser } from "../../features/user/userSlice";

const Navigation = ({ handleChange, activeTab }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navButtons = [
    {
      source: "/assets/home.png",
      alt: "Home icon",
      handler: () => handleChange("home"),
      active: activeTab === "home" ? true : false,
    },
    {
      source: "/assets/history.png",
      alt: "History icon",
      handler: () => handleChange("completed"),
      active: activeTab === "completed" ? true : false,
    },
    {
      source: "/assets/user.png",
      alt: "User icon",
      handler: () => handleChange("profile"),
      active: activeTab === "profile" ? true : false,
    },
    {
      source: "/assets/logout.png",
      alt: "Logout icon",
      handler: handleLogout,
      active: false,
    },
  ];

  return (
    <div className="navigation">
      {navButtons.map((button, index) => {
        return (
          <IconButton
            key={index}
            source={button.source}
            alt={button.alt}
            onClick={button.handler}
            width="25px"
            height="25px"
            position="static"
            isActive={button.active}
          />
        );
      })}
    </div>
  );
};

export default Navigation;
