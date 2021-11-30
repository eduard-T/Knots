// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// //redux
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser, resetLoginState } from "../../../features/user/userSlice";

// //components
// import Card from "../../StyledComponents/Card";
// import TextInput from "../../StyledComponents/TextInput";
// import Button from "../../StyledComponents/Button";

// const ResetRequest = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   //store
//   const { activeUser, loginState } = useSelector((state) => state.user);

//   //initialize states
//   const [email, setEmail] = useState("");

//   useEffect(() => {
//     //if there is already an active user, navigate to the dashboard
//     if (activeUser) {
//       navigate("/dashboard");
//     }
//   }, [activeUser, navigate]);

//   //listen for an enter key press to login
//   useEffect(() => {
//     const listener = (event) => {
//       if (event.code === "Enter" || event.code === "NumpadEnter") {
//         handleLogin();
//       }
//     };
//     document.addEventListener("keydown", listener);
//     return () => {
//       document.removeEventListener("keydown", listener);
//     };
//   });

//   //login handler
//   const handleLogin = () => {
//     // dispatch(loginUser({ email }));
//   };

//   //handler to reset the loginState
//   const handleStateReset = () => {
//     dispatch(resetLoginState());
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         minHeight: "100vh",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <Card className="login__card">
//         <h1 className="login__title">Verify Email</h1>
//         <div className="login__inputs">
//           {loginState.error && !!loginState.error.loginError && (
//             <p className="error">{loginState.error.loginError.msg}</p>
//           )}

//           {loginState.error && !!loginState.error.email && (
//             <p className="inputError">{loginState.error.email.msg}</p>
//           )}
//           <TextInput
//             style={{ margin: "8px 0" }}
//             type="email"
//             name="email"
//             placeholder="Email"
//             borderType="none"
//             value={email}
//             width={"100%"}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//         </div>
//         <Button title="Send" onClick={handleLogin} />
//         <Button title="Go Back" onClick={navigate("/login")} />
//       </Card>
//     </div>
//   );
// };

// export default ResetRequest;
