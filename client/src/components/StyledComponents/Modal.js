import React from "react"

//components
import Card from "./Card"

const Modal = ({ children, isVisible }) => {
  return (
    <div className="modal" style={{ display: isVisible ? "flex" : "none" }}>
      <Card className="modal__card" removeShadow>
        {children}
      </Card>
    </div>
  )
}

export default Modal
