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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //user state
  const { activeUser, loginState } = useSelector((state) => state.user);

  useEffect(() => {
    if (activeUser) {
      navigate("/dashboard");
    }
  }, [activeUser, navigate]);

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

  const handleLogin = () => {
    dispatch(loginUser({ email, password }));
  };

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
            type="password"
            name="password"
            placeholder="Password"
            borderType="none"
            value={password}
            width={"100%"}
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
