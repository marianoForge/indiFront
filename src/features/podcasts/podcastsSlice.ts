// src/features/podcasts/podcastsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTopPodcasts } from "../../utils/api";

export interface PodcastData {
  label: string;
  attributes: {
    "im:id": string;
  };
}

export interface Podcast {
  id: PodcastData;
  title: PodcastData;
  summary: PodcastData;
  "im:name": PodcastData;
  "im:artist": PodcastData;
  "im:id": PodcastData;
  [key: string]: PodcastData | string;
}

export interface PodcastsState {
  items: Podcast[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | undefined;
}

const initialState: PodcastsState = {
  items: [],
  status: "idle",
  error: undefined,
};

export const fetchPodcasts = createAsyncThunk(
  "podcasts/fetchPodcasts",
  async () => {
    const podcasts = await fetchTopPodcasts();
    return podcasts;
  }
);

const podcastsSlice = createSlice({
  name: "podcasts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPodcasts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchPodcasts.fulfilled,
        (state, action: PayloadAction<Podcast[]>) => {
          state.status = "succeeded";
          state.items = action.payload;
        }
      )
      .addCase(fetchPodcasts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default podcastsSlice.reducer;
