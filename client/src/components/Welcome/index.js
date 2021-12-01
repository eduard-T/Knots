import React from "react";
import { useNavigate } from "react-router-dom";

//components
import Button from "../StyledComponents/Button";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="welcome">
      <header className="welcome__header">
        <p className="welcome__title">Knots</p>
        <p className="welcome__filler">:::</p>
        <p className="welcome__description">Goal Management App</p>
      </header>
      <Button title="Enter" width="250px" onClick={() => navigate("/login")} />
    </div>
  );
};

export default Welcome;
