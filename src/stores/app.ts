import { configureStore } from "@reduxjs/toolkit";
import blastReducer from "../reducers/blast";
import counterReducer from "../reducers/counter";

export const appStore = configureStore({
  reducer: {
    counter: counterReducer,
    blast: blastReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export type AppStore = typeof appStore;
