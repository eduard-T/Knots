import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoals = createAsyncThunk(
  "goals/get",
  async (_, { rejectWithValue }) => {
    //call api
    try {
      const response = await axios.get("/goals");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  goalsList: [],
  status: "idle",
  error: null,
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        if (state.status === "idle") {
          state.status = "loading";
        }
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.goalsList = action.payload;
        }
      })
      .addCase(getGoals.rejected, (state, action) => {
        if (state.status === "loading") {
          state.status = "idle";
          state.error = action.error;
        }
      });
  },
});

export default goalsSlice.reducer;
