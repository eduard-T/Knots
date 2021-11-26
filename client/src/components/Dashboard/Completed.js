import React, { useEffect } from "react";

//components
import Goal from "../StyledComponents/Goal";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "../../features/goals/goalsSlice";

const Completed = () => {
  const dispatch = useDispatch();
  const { goalsList, status, error } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  return (
    <div className="dashboard__completed">
      <header className="completed__header">
        <h1 className="completed__title">Completed Goals</h1>
        <p className="completed__subtitle">Way to Go!</p>
      </header>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {goalsList && !!goalsList.length ? (
            goalsList
              .filter((goal) => goal.completed === true)
              .map((goal) => {
                return (
                  <Goal
                    key={goal.gid}
                    description={goal.description}
                    type={goal.type}
                    completed
                  />
                );
              })
          ) : (
            <p>No completed goals...</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Completed;
