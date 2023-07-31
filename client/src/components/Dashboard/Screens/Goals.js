import React, { useState, useEffect } from "react"
import PuffLoader from "react-spinners/PuffLoader"

//redux
import { useDispatch, useSelector } from "react-redux"
import { getGoals } from "../../../features/goals/goalsSlice"
import { logoutUser } from "../../../features/user/userSlice"

//components
import Goal from "../Goal"
import AddGoal from "../AddGoal"

const Goals = () => {
  const dispatch = useDispatch()

  //store
  const { activeUser } = useSelector((state) => state.user)
  const { goalsList, status, error } = useSelector((state) => state.goals)

  //initialize states
  const [activeList, setActiveList] = useState([])
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    //once the user is active, fetch the goals based on their token
    if (activeUser) {
      const { token } = activeUser
      dispatch(getGoals(token))
    }

    //log the user out if the token fails on any action
    if (error && !!error.authError) {
      dispatch(logoutUser())
    }
  }, [activeUser, error, dispatch])

  useEffect(() => {
    //initialize an empty array
    setActiveList([])

    //fill the array with active goals
    if (goalsList && !!goalsList.length) {
      setActiveList(goalsList.filter((goal) => goal.completed === false))
    }
  }, [goalsList])

  useEffect(() => {
    //set the error message based on the active error
    if (!!error && Object.values(error)[0].msg) {
      setErrorMsg(Object.values(error)[0].msg)
    }
  }, [error])

  return (
    <div className="dashboard__goals">
      <header className="goals__header">
        <div>
          <h1 className="goals__title">
            Welcome, {!!activeUser && activeUser.first_name}
          </h1>
          <p className="goals__subtitle">Let's mark off some goals today!</p>
        </div>
        <AddGoal />
      </header>
      {!!errorMsg && <p className="error">{errorMsg}</p>}
      {status === "pending" ? (
        <div className="loader">
          <PuffLoader color="orangered" />
        </div>
      ) : (
        <ul>
          {activeList && !!activeList.length ? (
            activeList.map((goal) => {
              return (
                <Goal
                  key={goal.gid}
                  goalID={goal.gid}
                  description={goal.description}
                  timeline={goal.timeline}
                />
              )
            })
          ) : (
            <p className="dashboard__emptyMsg">No goals to complete...</p>
          )}
        </ul>
      )}
    </div>
  )
}

export default Goals
