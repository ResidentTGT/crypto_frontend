import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getLeaderboard = createAsyncThunk(
  "blast/getLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL + "blast/leaderboard");

      return response.data.dapps;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface BlastState {
  status: string;
  leaderboard: any[];
}

const initialState: BlastState = {
  status: "idle",
  leaderboard: [],
};

const blastSlice = createSlice({
  name: "blast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.status = "succeeded";
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});
export const {} = blastSlice.actions;
export default blastSlice.reducer;
