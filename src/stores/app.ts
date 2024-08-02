import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../reducers/counter";

export const appStore = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export type AppStore = typeof appStore;
