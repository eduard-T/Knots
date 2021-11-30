import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

//redux
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLoginState } from "../../../features/user/userSlice";

//components
import Card from "../../StyledComponents/Card";
import TextInput from "../../StyledComponents/TextInput";
import Button from "../../StyledComponents/Button";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //store
  const { activeUser, loginState } = useSelector((state) => state.user);

  //initialize states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    //if there is already an active user, navigate to the dashboard
    if (activeUser) {
      navigate("/dashboard");
    }
  }, [activeUser, navigate]);

  //listen for an enter key press to login
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleLogin();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  });

  //login handler
  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

  //handler to reset the loginState
  const handleStateReset = () => {
    dispatch(resetLoginState());
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
      <Card className="login__card">
        <h1 className="login__title">Login</h1>
        <div className="login__inputs">
          {loginState.error && !!loginState.error.loginError && (
            <p className="error">{loginState.error.loginError.msg}</p>
          )}

          {loginState.error && !!loginState.error.email && (
            <p className="inputError">{loginState.error.email.msg}</p>
          )}
          <TextInput
            style={{ margin: "8px 0" }}
            type="email"
            name="email"
            placeholder="Email"
            borderType="none"
            value={email}
            width={"100%"}
            onChange={(event) => setEmail(event.target.value)}
          />

          {loginState.error && !!loginState.error.password && (
            <p className="inputError">{loginState.error.password.msg}</p>
          )}
          <TextInput
            style={{ margin: "8px 0" }}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            borderType="none"
            value={password}
            width={"100%"}
            inputIcon={
              showPassword ? "/assets/eye.png" : "/assets/closed-eye.png"
            }
            onIconClick={() => setShowPassword(!showPassword)}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button title="Enter" onClick={handleLogin} />
        <p className="login__link">
          Don't have an account?
          <Link
            style={{ marginLeft: "5px", color: "royalblue" }}
            to="/register"
            onClick={handleStateReset}
          >
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
};

export default Login;
