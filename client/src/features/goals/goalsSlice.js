import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getGoals = createAsyncThunk(
  "goals/get",
  async (token, { rejectWithValue }) => {
    //call api
    try {
      const response = await axios.get("/goals", {
        headers: { Authorization: token },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createGoal = createAsyncThunk(
  "goals/create",
  async (payload, { rejectWithValue, dispatch }) => {
    //call api
    try {
      const { token, description, timeline } = payload;
      await axios.post(
        "/goals/create",
        { description, timeline },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(getGoals(token));
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateGoal = createAsyncThunk(
  "goals/update",
  async (payload, { rejectWithValue, dispatch }) => {
    //call api
    try {
      const { token, goalID, description, timeline } = payload;
      await axios.put(
        `/goals/update/${goalID}`,
        { description, timeline },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(getGoals(token));
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const completeGoal = createAsyncThunk(
  "goals/complete",
  async (payload, { rejectWithValue, dispatch }) => {
    //call api
    try {
      const { token, goalID, completed } = payload;
      await axios.put(
        `/goals/complete/${goalID}`,
        { completed },
        {
          headers: { Authorization: token },
        }
      );
      dispatch(getGoals(token));
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (payload, { rejectWithValue, dispatch }) => {
    //call api
    try {
      const { token, goalID } = payload;
      await axios.delete(`/goals/delete/${goalID}`, {
        headers: { Authorization: token },
      });
      dispatch(getGoals(token));
      return;
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
  reducers: {
    resetGoalsState: (state) => {
      state.goalsList = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        if (state.status === "idle") {
          state.status = "pending";
        }
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        if (state.status === "pending") {
          state.status = "idle";
          state.goalsList = action.payload;
        }
      })
      .addCase(getGoals.rejected, (state, action) => {
        if (state.status === "pending") {
          state.status = "idle";
          state.error = action.payload;
        }
      })

      .addCase(createGoal.pending, (state) => {
        if (state.status === "idle") {
          state.status = "pending";
        }
      })
      .addCase(createGoal.rejected, (state, action) => {
        if (state.status === "pending") {
          state.status = "idle";
          state.error = action.payload;
        }
      })

      .addCase(updateGoal.pending, (state) => {
        if (state.status === "idle") {
          state.status = "pending";
        }
      })
      .addCase(updateGoal.rejected, (state, action) => {
        if (state.status === "pending") {
          state.status = "idle";
          state.error = action.payload;
        }
      })

      .addCase(completeGoal.pending, (state) => {
        if (state.status === "idle") {
          state.status = "pending";
        }
      })
      .addCase(completeGoal.rejected, (state, action) => {
        if (state.status === "pending") {
          state.status = "idle";
          state.error = action.payload;
        }
      })

      .addCase(deleteGoal.pending, (state) => {
        if (state.status === "idle") {
          state.status = "pending";
        }
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        if (state.status === "pending") {
          state.status = "idle";
          state.error = action.payload;
        }
      });
  },
});

export const { resetGoalsState } = goalsSlice.actions;
export default goalsSlice.reducer;
