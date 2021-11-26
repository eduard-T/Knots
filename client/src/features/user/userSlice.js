import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const currentUser = JSON.parse(localStorage.getItem("user_info"));

console.log(`currentUser`, currentUser);

const initialState = {
  activeUser: currentUser || null,
  registerState: {
    loading: "idle",
    error: null,
    currentReqID: undefined,
  },
  loginState: {
    loading: "idle",
    error: null,
    currentReqID: undefined,
  },
};

export const registerUser = createAsyncThunk(
  "user/register",
  async (userInfo, { rejectWithValue, getState, requestId }) => {
    const { loading, currentReqID } = getState().user.registerState;

    if (loading !== "pending" || requestId !== currentReqID) return;

    //call api
    try {
      console.log("POST REQUEST");
      const response = await axios.post("/user/register", userInfo);
      localStorage.setItem("user_info", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async (userInfo, { rejectWithValue, getState, requestId }) => {
    const { loading, currentReqID } = getState().user.loginState;

    if (loading !== "pending" || requestId !== currentReqID) return;

    //call api
    try {
      console.log("POST REQUEST");
      const response = await axios.post("/user/login", userInfo);
      localStorage.setItem("user_info", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.activeUser = null;
      localStorage.removeItem("user_info");
    },
    resetRegisterState: (state) => {
      state.registerState = initialState.registerState;
    },
    resetLoginState: (state) => {
      state.loginState = initialState.loginState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, ({ registerState }, action) => {
        if (registerState.loading === "idle") {
          registerState.loading = "pending";
          registerState.currentReqID = action.meta.requestId;
        }
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        const { registerState } = state;
        if (registerState.loading === "pending") {
          registerState.loading = "idle";
          registerState.currentReqID = undefined;
          registerState.error = null;
          state.activeUser = action.payload;
        }
      })
      .addCase(registerUser.rejected, ({ registerState }, action) => {
        if (registerState.loading === "pending") {
          registerState.loading = "idle";
          registerState.currentReqID = undefined;
          registerState.error = action.payload;
        }
      })

      //logon reducers
      .addCase(loginUser.pending, ({ loginState }, action) => {
        if (loginState.loading === "idle") {
          loginState.loading = "pending";
          loginState.currentReqID = action.meta.requestId;
        }
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { loginState } = state;
        if (loginState.loading === "pending") {
          loginState.loading = "idle";
          loginState.currentReqID = undefined;
          loginState.error = null;
          state.activeUser = action.payload;
        }
      })
      .addCase(loginUser.rejected, ({ loginState }, action) => {
        if (loginState.loading === "pending") {
          loginState.loading = "idle";
          loginState.currentReqID = undefined;
          loginState.error = action.payload;
        }
      });
  },
});

export const { logoutUser, resetRegisterState, resetLoginState } =
  userSlice.actions;
export default userSlice.reducer;
