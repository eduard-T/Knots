import React, { useState } from "react";

//components
import Button from "../../StyledComponents/Button";
import AddModal from "./AddModal";

//helpers
import useWindowDimensions from "../../../helpers/ScreenDimensions";

const AddGoal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { width } = useWindowDimensions();

  // toggle function to open nd close the module
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
