import axios from "axios";

const API_URL =
  "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json";

export const fetchTopPodcasts = async () => {
  const storedData = localStorage.getItem("podcastData");
  const storedTimestamp = localStorage.getItem("podcastTimestamp");

  if (storedData && storedTimestamp) {
    const currentTime = new Date().getTime();
    const difference = currentTime - Number(storedTimestamp);

    if (difference < 86400000) {
      return JSON.parse(storedData);
    }
  }

  const response = await axios.get(API_URL);
  const podcasts = response.data.feed.entry;

  localStorage.setItem("podcastData", JSON.stringify(podcasts));
  localStorage.setItem("podcastTimestamp", new Date().getTime().toString());

  return podcasts;
};

export const fetchDetails = async (podcastId: string) => {
  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(
        `https://itunes.apple.com/lookup?id=${podcastId}&entity=podcastEpisode&limit=15`
      )}`
    );
    const data = await response.json();
    const parsedData = JSON.parse(data.contents).results.slice(1);
    return parsedData;
  } catch (error) {
    console.error(error);
  }
};
