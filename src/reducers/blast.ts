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

export const getPredictfunLeaderboard = createAsyncThunk(
  "blast/getPredictfunLeaderboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        API_URL + "blast/predictfun/leaderboard"
      );

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface BlastState {
  leaderboardStatus: string;
  leaderboard: any[];
  predictfunLeaderboardStatus: string;
  predictfunLeaderboard: any[];
}

const initialState: BlastState = {
  leaderboardStatus: "idle",
  leaderboard: [],
  predictfunLeaderboard: [],
  predictfunLeaderboardStatus: "idle",
};

const blastSlice = createSlice({
  name: "blast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLeaderboard.pending, (state) => {
        state.leaderboardStatus = "loading";
      })
      .addCase(getLeaderboard.fulfilled, (state, action) => {
        state.leaderboard = action.payload;
        state.leaderboardStatus = "succeeded";
      })
      .addCase(getLeaderboard.rejected, (state, action) => {
        state.leaderboardStatus = "failed";
      })
      .addCase(getPredictfunLeaderboard.pending, (state) => {
        state.predictfunLeaderboardStatus = "loading";
      })
      .addCase(getPredictfunLeaderboard.fulfilled, (state, action) => {
        state.predictfunLeaderboard = action.payload;
        state.predictfunLeaderboardStatus = "succeeded";
      })
      .addCase(getPredictfunLeaderboard.rejected, (state, action) => {
        state.predictfunLeaderboardStatus = "failed";
      });
  },
});
export const {} = blastSlice.actions;
export default blastSlice.reducer;
