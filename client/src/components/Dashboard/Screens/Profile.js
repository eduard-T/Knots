import React, { useState, useEffect } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";
import { updateUser, deleteUser } from "../../../features/user/userSlice";

//components
import Modal from "../../StyledComponents/Modal";
import Button from "../../StyledComponents/Button";
import TextInput from "../../StyledComponents/TextInput";

//helpers
import useWindowDimensions from "../../../helpers/ScreenDimensions";

const Profile = ({ activeUser }) => {
  const dispatch = useDispatch();

  //get the width of the current window
  const { width } = useWindowDimensions();

  //store
  const { userState } = useSelector((state) => state.user);
  const { goalsList } = useSelector((state) => state.goals);

  //initialize states
  const [firstName, setFirstName] = useState(activeUser.first_name);
  const [lastName, setLastName] = useState(activeUser.last_name);
  const [isEditing, setIsEditing] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  //initialize goal amounts
  const [activeGoals, setActiveGoals] = useState(0);
  const [completedGoals, setCompletedGoals] = useState(0);

  //exit editing state when the action changes the loading state to "pending"
  useEffect(() => {
    if (userState.loading === "pending") {
      setIsEditing(false);
    }
  }, [userState]);

  //set the goal amounts from the user's goal list
  useEffect(() => {
    if (goalsList && !!goalsList.length) {
      setActiveGoals(
        goalsList.filter((goal) => goal.completed === false).length
      );
      setCompletedGoals(
        goalsList.filter((goal) => goal.completed === true).length
      );
    }
  }, [goalsList]);

  //toggle function for the editing state
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  //handler to dispatch the action to update the user
  const handleSave = () => {
    dispatch(
      updateUser({
        token: activeUser.token,
        firstName,
        lastName,
      })
    );
  };

  //handler to delete the user's account
  const handleDelete = () => {
    dispatch(deleteUser({ token: activeUser.token }));
  };

  return (
    <div className="dashboard__profile">
      <header className="profile__header">
        <div>
          <h1 className="profile__title">Profile</h1>
          <p className="profile__subtitle">Personal information & statistics</p>
        </div>
        {!isEditing ? (
          <Button
            title="Edit Info"
            width={width > 525 ? "120px" : "100%"}
            onClick={toggleEdit}
            style={{ alignSelf: "flex-start" }}
          />
        ) : (
          <div className="profile__buttons">
            <div className="profile__buttonContainer">
              <Button
                title="Save"
                width={width > 525 ? "100px" : "100%"}
                onClick={handleSave}
              />
              <Button
                title="Cancel"
                width={width > 525 ? "100px" : "100%"}
                onClick={() => setIsEditing(false)}
              />
            </div>
            <Button
              title="Delete Account"
              backgroundColor="black"
              style={{ marginTop: "8px" }}
              onClick={() => setIsVisible(true)}
            />
          </div>
        )}
      </header>

      {userState.error && !!userState.error.updateUserError && (
        <p className="error">{userState.error.updateUserError.msg}</p>
      )}

      <main className="profile__container">
        <section className="profile__tracker">
          <div className="tracker__activeGoals">
            <p>Active Goals</p>
            <p className="activeGoals__amount">{activeGoals}</p>
          </div>
          <div className="tracker__completedGoals">
            <p>Completed Goals</p>
            <p className="completedGoals__amount">{completedGoals}</p>
          </div>
        </section>

        <div className="divider" />

        <section className="profile__details">
          {!isEditing ? (
            <>
              <label className="label" htmlFor="profileFirstName">
                First Name
              </label>
              <p className="profile__text" id="profileFirstName">
                {activeUser.first_name}
              </p>

              <label className="label" htmlFor="profileLastName">
                Last Name
              </label>
              <p className="profile__text" id="profileLastName">
                {activeUser.last_name}
              </p>

              <label className="label" htmlFor="profileEmail">
                Email
              </label>
              <p className="profile__text" id="profileEmail">
                {activeUser.email}
              </p>
            </>
          ) : (
            <>
              {userState.error && !!userState.error.firstName && (
                <p className="inputError">{userState.error.firstName.msg}</p>
              )}
              <TextInput
                style={{ marginBottom: "8px" }}
                type="text"
                name="firstName"
                placeholder="First Name"
                borderType="none"
                showLabel
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />

              {userState.error && !!userState.error.lastName && (
                <p className="inputError">{userState.error.lastName.msg}</p>
              )}
              <TextInput
                style={{ marginBottom: "25px" }}
                type="text"
                name="lastName"
                placeholder="Last Name"
                borderType="none"
                showLabel
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </>
          )}
        </section>
      </main>

      <Modal isVisible={isVisible}>
        <h1 className="modal__title">Delete Account</h1>

        <p className="modal__description">
          This action is <span className="highlight">Permanent!</span> All data,
          including goals, will be destroyed with this user. Do you want to
          proceed?
        </p>

        <div className="modal__buttonContainer">
          <Button
            title="Confirm"
            backgroundColor="red"
            onClick={handleDelete}
          />
          <Button
            title="Cancel"
            backgroundColor="royalblue"
            onClick={() => setIsVisible(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
