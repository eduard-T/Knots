import React from "react";

const Header = ({ user }) => {
  return (
    <div>
      <h1 className="goals__title">Welcome, {user}</h1>
      <p>Let's mark off some goals today!</p>
    </div>
  );
};

export default Header;
