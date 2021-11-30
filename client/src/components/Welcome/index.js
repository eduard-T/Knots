import React from "react";
import { useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

//components
import Button from "../StyledComponents/Button";

//helpers
import useWindowDimensions from "../../helpers/ScreenDimensions";

const Welcome = () => {
  const navigate = useNavigate();

  //get the width of the current window
  const { width } = useWindowDimensions();

  return (
    <div className="welcome">
      <header className="welcome__header">
        <p className="welcome__title">Knots</p>
        <p className="welcome__filler">:::</p>
        <p className="welcome__description">Goal Management</p>
      </header>
      <div className="welcome__logoContainer">
        <GridLoader
          size={20}
          margin={width > 920 ? 50 : 25}
          speedMultiplier={0.3}
          color="orangered"
        />
        <GridLoader
          size={20}
          margin={width > 920 ? 50 : 25}
          speedMultiplier={0.3}
        />
      </div>
      <Button title="Enter" width="250px" onClick={() => navigate("/login")} />
    </div>
  );
};

export default Welcome;
