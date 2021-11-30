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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //store
  const { activeUser, registerState } = useSelector((state) => state.user);

  //initialize states
  const [userInfo, setUserInfo] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    //if there is already an active user, navigate to the dashboard
    if (activeUser) {
      navigate("/dashboard");
    }
  }, [activeUser, navigate]);

  //listen for an enter key press to register
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleRegister();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  //array of input fields
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
      type: showPassword ? "text" : "password",
      name: "password",
      id: "password",
      placeHolder: "Password",
      inputIcon: showPassword ? "/assets/eye.png" : "/assets/closed-eye.png",
      onIconClick: () => setShowPassword(!showPassword),
    },
    {
      type: showConfirmPassword ? "text" : "password",
      name: "confirm",
      id: "confirm",
      placeHolder: "Confirm Password",
      inputIcon: showConfirmPassword
        ? "/assets/eye.png"
        : "/assets/closed-eye.png",
      onIconClick: () => setShowConfirmPassword(!showConfirmPassword),
    },
  ];

  // dynamically add key value pairs to the input object
  const updateInput = (key, value) => {
    let tempInput = { ...userInfo };
    tempInput[key] = value;
    setUserInfo(tempInput);
  };

  //registration handler
  const handleRegister = () => {
    dispatch(registerUser(userInfo));
  };

  //handler to reset the registerState
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
                  inputIcon={field.inputIcon}
                  onIconClick={field.onIconClick}
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
