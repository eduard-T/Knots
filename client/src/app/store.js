import { configureStore } from "@reduxjs/toolkit";
import goalsReducer from "../features/goals/goalsSlice";
import userReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    goals: goalsReducer,
    user: userReducer,
  },
});
