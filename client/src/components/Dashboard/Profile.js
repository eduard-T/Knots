import React from "react";
import { useDispatch, useSelector } from "react-redux";

//components
import Button from "../StyledComponents/Button";

const Profile = () => {
  const { activeUser } = useSelector((state) => state.user);

  const toggleEdit = () => {
    console.log("Edit");
  };

  const handleSave = () => {
    console.log("Saved");
  };

  return (
    <div className="dashboard__profile">
      <header className="profile__header">
        <h1 className="profile__title">Profile</h1>
        <p className="profile__subtitle">Customize your info</p>
        <Button title="Edit Info" onClick={toggleEdit} />
      </header>
      {!!activeUser && (
        <section className="profile__details">
          <p className="profile__text">{activeUser.first_name}</p>
          <p className="profile__text">{activeUser.last_name}</p>
          <p className="profile__text">{activeUser.email}</p>
        </section>
      )}
      <div className="buttonContainer">
        <Button title="Save" onClick={handleSave} />
        <Button title="Cancel" onClick={console.log("Cancel")} />
      </div>
    </div>
  );
};

export default Profile;
