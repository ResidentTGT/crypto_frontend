import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3001";

export const getPoh = createAsyncThunk(
  "linea/getPoh",
  async (wallet: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/linea/poh/${wallet}`);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export interface LineaState {
  pohStatus: string;
  poh: any;
}

const initialState: LineaState = {
  pohStatus: "idle",
  poh: undefined,
};

const blastSlice = createSlice({
  name: "linea",
  initialState,
  reducers: {
    clearPohState: (state) => {
      state.poh = undefined;
      state.pohStatus = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPoh.pending, (state) => {
        state.pohStatus = "loading";
      })
      .addCase(getPoh.fulfilled, (state, action) => {
        state.poh = action.payload;
        state.pohStatus = "succeeded";
      })
      .addCase(getPoh.rejected, (state, action) => {
        state.pohStatus = "failed";
      });
  },
});
export const { clearPohState } = blastSlice.actions;
export default blastSlice.reducer;
