import React, { useState, useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "../../../features/goals/goalsSlice";
import { logoutUser } from "../../../features/user/userSlice";

//components
import Goal from "../Goal";

const Completed = () => {
  const dispatch = useDispatch();

  //store
  const { activeUser } = useSelector((state) => state.user);
  const { goalsList, status, error } = useSelector((state) => state.goals);

  //initialize states
  const [completedList, setCompletedList] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    //once the user is active, fetch the goals based on their token
    if (activeUser) {
      const { token } = activeUser;
      dispatch(getGoals(token));
    }

    //log the user out if the token fails on any action
    if (error && !!error.authError) {
      dispatch(logoutUser());
    }
  }, [activeUser, error, dispatch]);

  useEffect(() => {
    //initialize an empty array
    setCompletedList([]);

    //fill the array with completed goals
    if (goalsList && !!goalsList.length) {
      setCompletedList(goalsList.filter((goal) => goal.completed === true));
    }
  }, [goalsList]);

  useEffect(() => {
    //set the error message based on the active error
    if (!!error && Object.values(error)[0].msg) {
      setErrorMsg(Object.values(error)[0].msg);
    }
  }, [error]);

  return (
    <div className="dashboard__completed">
      <header className="completed__header">
        <h1 className="completed__title">Completed Goals</h1>
        <p className="completed__subtitle">Way to Go!</p>
      </header>
      {!!errorMsg && <p className="error">{errorMsg}</p>}
      {status === "pending" ? (
        <div className="loader">
          <PuffLoader color="orangered" />
        </div>
      ) : (
        <ul>
          {completedList && !!completedList.length ? (
            completedList.map((goal) => {
              return (
                <Goal
                  key={goal.gid}
                  goalID={goal.gid}
                  description={goal.description}
                  timeline={goal.timeline}
                  completed
                />
              );
            })
          ) : (
            <p className="dashboard__emptyMsg">No completed goals...</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Completed;
