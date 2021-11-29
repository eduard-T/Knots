import React, { useState, useEffect, useCallback } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateGoal } from "../../features/goals/goalsSlice";

//components
import Modal from "../StyledComponents/Modal";
import Button from "../StyledComponents/Button";
import TextInput from "../StyledComponents/TextInput";

const EditModal = ({
  toggleEdit,
  isVisible,
  goalID,
  currentDescription,
  currentTimeline,
}) => {
  const dispatch = useDispatch();

  const { activeUser } = useSelector((state) => state.user);
  const { status } = useSelector((state) => state.goals);

  const [showInput, setShowInput] = useState(false);
  const [error, setError] = useState(false);

  const [description, setDescription] = useState(currentDescription);
  const [goalTimeline, setGoalTimeline] = useState("");
  const [goalDate, setGoalDate] = useState("");

  const currentDate = new Date().toISOString().substring(0, 10);

  useEffect(() => {
    if (currentTimeline.includes("-")) {
      setGoalTimeline("setDate");
      setShowInput(true);
      setGoalDate(currentTimeline);
    } else {
      setGoalTimeline(currentTimeline);
      setGoalDate("");
    }
  }, [currentTimeline, isVisible]);

  const clear = useCallback(() => {
    toggleEdit("close");
    setError(false);
    setDescription(currentDescription);
    setShowInput(false);
  }, [toggleEdit, currentDescription]);

  const handleOption = (option) => {
    if (option === "setDate") {
      setShowInput(true);
      setGoalTimeline(undefined);
    } else {
      setShowInput(false);
      setGoalTimeline(option);
    }
  };

  const handleUpdate = () => {
    if (!description && (!goalTimeline || !goalDate)) {
      setError(true);
      return;
    } else if (goalDate) {
      dispatch(
        updateGoal({
          token: activeUser.token,
          goalID,
          description,
          timeline: goalDate,
        })
      );
    } else {
      dispatch(
        updateGoal({
          token: activeUser.token,
          goalID,
          description,
          timeline: goalTimeline,
        })
      );
    }
  };

  useEffect(() => {
    if (status === "pending") {
      clear();
    }
  }, [status, clear]);

  return (
    <Modal isVisible={isVisible}>
      <h1 className="modal__title">Edit Goal</h1>

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
        <Button title="Update" onClick={handleUpdate} />
        <Button title="Cancel" onClick={clear} />
      </div>
    </Modal>
  );
};

export default EditModal;
