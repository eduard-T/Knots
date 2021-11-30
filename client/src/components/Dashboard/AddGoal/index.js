import React, { useState } from "react";

//components
import Button from "../../StyledComponents/Button";
import AddModal from "./AddModal";

//helpers
import useWindowDimensions from "../../../helpers/ScreenDimensions";

const AddGoal = () => {
  //initialize state
  const [isVisible, setIsVisible] = useState(false);

  //get the width of the current window
  const { width } = useWindowDimensions();

  // toggle function to open and close the modal
  const toggleAdd = (state) => {
    if (state === "open") {
      setIsVisible(true);
    }

    if (state === "close") {
      setIsVisible(false);
    }
  };

  return (
    <>
      <Button
        title="Add Goal"
        width={width > 525 ? "120px" : "100%"}
        onClick={() => toggleAdd("open")}
        style={{ alignSelf: "flex-start" }}
      />
      <AddModal toggleAdd={toggleAdd} isVisible={isVisible} />
    </>
  );
};

export default AddGoal;
