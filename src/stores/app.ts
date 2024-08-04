import { configureStore } from "@reduxjs/toolkit";
import blastReducer from "../reducers/blast";
import lineaReducer from "../reducers/linea";

export const appStore = configureStore({
  reducer: {
    linea: lineaReducer,
    blast: blastReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export type AppStore = typeof appStore;
