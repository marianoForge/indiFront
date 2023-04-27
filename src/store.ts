// src/app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import podcastsReducer from "./features/podcasts/podcastsSlice";

export const store = configureStore({
  reducer: {
    podcasts: podcastsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
