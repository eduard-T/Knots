import React, { useEffect } from "react";

//components
import Goal from "../StyledComponents/Goal";
import Button from "../StyledComponents/Button";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getGoals } from "../../features/goals/goalsSlice";

const Goals = () => {
  const dispatch = useDispatch();

  const { activeUser } = useSelector((state) => state.user);
  const { goalsList, status, error } = useSelector((state) => state.goals);

  useEffect(() => {
    dispatch(getGoals());
  }, [dispatch]);

  const addGoal = () => {
    console.log("Add");
  };

  return (
    <div className="dashboard__goals">
      <header className="goals__header">
        <div>
          <h1 className="goals__title">
            Welcome, {!!activeUser && activeUser.first_name}
          </h1>
          <p className="goals__subtitle">Let's mark off some goals today!</p>
        </div>
        <Button title="Add Goal" onClick={addGoal} />
      </header>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {goalsList && !!goalsList.length ? (
            goalsList
              .filter((goal) => goal.completed === false)
              .map((goal) => {
                return (
                  <Goal
                    key={goal.gid}
                    description={goal.description}
                    type={goal.type}
                  />
                );
              })
          ) : (
            <p>No goals to complete...</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Goals;
