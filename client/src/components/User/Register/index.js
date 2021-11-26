import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  resetRegisterState,
} from "../../../features/user/userSlice";

//components
import Card from "../../StyledComponents/Card";
import TextInput from "../../StyledComponents/TextInput";
import Button from "../../StyledComponents/Button";

const Register = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //user state
  const { activeUser, registerState } = useSelector((state) => state.user);

  useEffect(() => {
    if (activeUser) {
      navigate("/dashboard");
    }
  }, [activeUser, navigate]);

  const fields = [
    {
      type: "text",
      name: "firstName",
      id: "firstName",
      placeHolder: "First Name",
    },
    {
      type: "text",
      name: "lastName",
      id: "lastName",
      placeHolder: "Last Name",
    },
    {
      type: "email",
      name: "email",
      id: "email",
      placeHolder: "Email",
    },
    {
      type: "password",
      name: "password",
      id: "password",
      placeHolder: "Password",
    },
    {
      type: "password",
      name: "confirm",
      id: "confirm",
      placeHolder: "Confirm Password",
    },
  ];

  // dynamically add key value pairs to the input object
  const updateInput = (key, value) => {
    //include the generated id
    let tempInput = { ...userInfo };
    tempInput[key] = value;
    setUserInfo(tempInput);
  };

  const handleRegister = () => {
    dispatch(registerUser(userInfo));
  };

  const handleStateReset = () => {
    dispatch(resetRegisterState());
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card className="register__card" minHeight="400px">
        <h1 className="register__title">Register</h1>
        <div className="register__inputs">
          {registerState.error && !!registerState.error.registrationError && (
            <p className="error">{registerState.error.registrationError.msg}</p>
          )}

          {fields.map((field, index) => {
            return (
              <div key={index}>
                {registerState.error && !!registerState.error[field.name] && (
                  <p className="inputError">
                    {registerState.error[field.name].msg}
                  </p>
                )}
                <TextInput
                  style={{ margin: "8px 0" }}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeHolder}
                  borderType="none"
                  width={"100%"}
                  onChange={(event) =>
                    updateInput(event.target.id, event.target.value)
                  }
                />
              </div>
            );
          })}
        </div>
        <Button title="Create Account" onClick={handleRegister} />
        <p className="register__link">
          Already have an account?
          <Link
            style={{ marginLeft: "5px", color: "royalblue" }}
            to="/login"
            onClick={handleStateReset}
          >
            Login
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Register;
