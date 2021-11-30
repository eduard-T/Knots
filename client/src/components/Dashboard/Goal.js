import React, { useState, useEffect, useRef } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { completeGoal, deleteGoal } from "../../features/goals/goalsSlice";

//components
import IconButton from "../StyledComponents/IconButton";
import EditModal from "./EditModal";

const Goal = ({ goalID, description, timeline, completed }) => {
  const dispatch = useDispatch();
  const itemRef = useRef(null);

  //store
  const { activeUser } = useSelector((state) => state.user);

  //initialize states
  const [showMenu, setShowMenu] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  //menu handler
  const handleMenu = () => {
    setShowMenu(true);
  };

  // toggle function to open and close the modal
  const toggleEdit = (state) => {
    if (state === "open") {
      setIsVisible(true);
    }

    if (state === "close") {
      setIsVisible(false);
    }
  };

  // handler for the menu actions
  const handleAction = (action) => {
    if (action === "complete" && !completed) {
      dispatch(
        completeGoal({ token: activeUser.token, goalID, completed: true })
      );
    }

    if (action === "delete") {
      dispatch(deleteGoal({ token: activeUser.token, goalID }));
    }
  };

  //click event listener
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  //hide the menu on any click outside of the element
  const handleClickOutside = (event) => {
    if (itemRef.current && !itemRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  return (
    <>
      <li
        className="goalItem"
        ref={itemRef}
        style={{ paddingLeft: completed ? "40px" : "0" }}
        onDoubleClick={() => handleAction("complete")}
      >
        {completed && (
          <img
            className="completeIcon"
            src="/assets/done.png"
            alt="Check mark"
          />
        )}
        <p style={{ width: completed ? "100%" : "60%" }}>{description}</p>
        {!completed && (
          <p
            className="goalItem__timeline"
            style={{
              backgroundColor:
                timeline === "Urgent"
                  ? "rgb(255, 80, 80)"
                  : timeline === "Long Term"
                  ? "rgb(102, 102, 255)"
                  : timeline === "Short Term"
                  ? "limegreen"
                  : "rgb(166, 166, 166)",
            }}
          >
            {timeline}
          </p>
        )}
        <IconButton
          source="/assets/menu.png"
          alt="Menu icon"
          onClick={handleMenu}
          width="30px"
          height="30px"
          position="static"
        />
        <ul
          className="floatingMenu"
          style={{ display: showMenu ? "flex" : "none" }}
          onMouseLeave={() => setShowMenu(false)}
        >
          {!completed && (
            <>
              <li
                className="floatingMenu__item"
                onClick={() => handleAction("complete")}
              >
                Mark as Complete
              </li>
              <li
                className="floatingMenu__item"
                onClick={() => toggleEdit("open")}
              >
                Edit
              </li>
            </>
          )}
          <li
            className="floatingMenu__item"
            onClick={() => handleAction("delete")}
          >
            Delete
          </li>
        </ul>
      </li>
      <EditModal
        toggleEdit={toggleEdit}
        isVisible={isVisible}
        goalID={goalID}
        currentDescription={description}
        currentTimeline={timeline}
      />
    </>
  );
};

export default Goal;
