import React, { useState } from "react"

//components
import IconButton from "../../StyledComponents/IconButton"
import Modal from "../../StyledComponents/Modal"
import Button from "../../StyledComponents/Button"

//redux
import { useDispatch } from "react-redux"
import { logoutUser } from "../../../features/user/userSlice"

const Navigation = ({ handleChange, activeTab }) => {
  const dispatch = useDispatch()

  //initialize state
  const [isVisible, setIsVisible] = useState(false)

  //handler to log the user out
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  //array of navigation buttons
  const navButtons = [
    {
      source: "/assets/home.png",
      alt: "Home icon",
      handler: () => handleChange("home"),
      active: activeTab === "home" ? true : false
    },
    {
      source: "/assets/history.png",
      alt: "History icon",
      handler: () => handleChange("completed"),
      active: activeTab === "completed" ? true : false
    },
    {
      source: "/assets/user.png",
      alt: "User icon",
      handler: () => handleChange("profile"),
      active: activeTab === "profile" ? true : false
    },
    {
      source: "/assets/logout.png",
      alt: "Logout icon",
      handler: () => setIsVisible(true),
      active: false
    },
  ]

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
        )
      })}
      <Modal isVisible={isVisible}>
        <h1 className="modal__title">Confirm Logout</h1>
        <div className="modal__buttonContainer">
          <Button
            title="Logout"
            backgroundColor="black"
            onClick={handleLogout}
          />
          <Button title="Cancel" onClick={() => setIsVisible(false)} />
        </div>
      </Modal>
    </div>
  )
}

export default Navigation
