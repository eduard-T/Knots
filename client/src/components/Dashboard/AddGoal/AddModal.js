import React, { useState, useEffect, useCallback } from "react"

//redux
import { useDispatch, useSelector } from "react-redux"
import { createGoal } from "../../../features/goals/goalsSlice"

//components
import Modal from "../../StyledComponents/Modal"
import Button from "../../StyledComponents/Button"
import TextInput from "../../StyledComponents/TextInput"

const AddModal = ({ toggleAdd, isVisible }) => {
  const dispatch = useDispatch()

  //store
  const { activeUser } = useSelector((state) => state.user)
  const { status } = useSelector((state) => state.goals)

  //initialize states
  const [showInput, setShowInput] = useState(false)
  const [error, setError] = useState(false)
  const [description, setDescription] = useState("")
  const [goalTimeline, setGoalTimeline] = useState("")
  const [goalDate, setGoalDate] = useState("")

  //save the current date to a variable
  const currentDate = new Date().toISOString().substring(0, 10)

  //function to clear and close modal
  const clear = useCallback(() => {
    toggleAdd("close")
    setError(false)
    setDescription("")
    setGoalTimeline("")
    setGoalDate("")
    setShowInput(false)
  }, [toggleAdd])

  //option selection handler
  const handleOption = (option) => {
    //if the option is to select a date, show the date input
    if (option === "setDate") {
      setShowInput(true)
      setGoalTimeline(undefined)
    } else {
      setShowInput(false)
      setGoalTimeline(option)
    }
  }

  //handler to dispatch the action based on the data and create a goal
  const handleCreate = () => {
    if (!description && (!goalTimeline || !goalDate)) {
      setError(true)
      return
    } else if (goalDate) {
      dispatch(
        createGoal({
          token: activeUser.token,
          description,
          timeline: goalDate
        })
      )
    } else {
      dispatch(
        createGoal({
          token: activeUser.token,
          description,
          timeline: goalTimeline
        })
      )
    }
  }

  //clear the modal when the action changes the status to "pending"
  useEffect(() => {
    if (status === "pending") {
      clear()
    }
  }, [status, clear])

  return (
    <Modal isVisible={isVisible}>
      <h1 className="modal__title">Create a New Goal</h1>

      {error && (
        <p className="error">Please provide a description and timeline!</p>
      )}
      <TextInput
        style={{ marginTop: "8px" }}
        type="text"
        name="description"
        placeholder="Describe your goal..."
        borderType="none"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <label className="srOnly" htmlFor="goalTimeline">
        Goal Timeline Selector
      </label>
      <select
        className="modal__timelineSelector"
        name="goalTimeline"
        id="goalTimeline"
        value={goalTimeline}
        onChange={(event) => handleOption(event.target.value)}
      >
        <option disabled value="">
          What is the timeline...
        </option>
        <option value="Urgent">Urgent</option>
        <option value="Short Term">Short Term</option>
        <option value="Long Term">Long Term</option>
        <option value="setDate">Set a Date</option>
      </select>

      {showInput && (
        <>
          <input
            className="modal__dateSelector"
            type="date"
            name="goalDate"
            id="goalDate"
            min={currentDate}
            value={goalDate}
            onChange={(event) => setGoalDate(event.target.value)}
          />
        </>
      )}

      <div className="modal__buttonContainer">
        <Button title="Add" onClick={handleCreate} />
        <Button title="Cancel" onClick={clear} />
      </div>
    </Modal>
  )
}

export default AddModal
