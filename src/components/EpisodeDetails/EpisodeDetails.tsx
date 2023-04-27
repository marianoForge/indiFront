import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchDetails } from "../../utils/api";
import PodcastDetailsArtistCard from "../PodcastDetails/PodcastDetailsArtistCard";
import { Episode } from "../../types/componentsTypes";
import styles from "../PodcastDetails/PodcastDetails.module.css";
import stylesEpisode from "./EpisodeDetails.module.css";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const EpisodeDetails = () => {
  const { podcastId, episodeId } = useParams();
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // If there's no podcastId, reset the loading state and return
    if (!podcastId) {
      setIsLoading(false);
      return;
    }

    // Set the loading state to true when fetching episode details
    setIsLoading(true);

    // Fetch the episode details and update the state
    try {
      const cachedData = localStorage.getItem(`episode_${episodeId}`);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        if (currentTime - parsedData.timestamp < CACHE_DURATION) {
          setEpisode(parsedData.data);
        }
      }

      fetchDetails(String(podcastId))
        .then((data) => {
          setEpisode(data);
          localStorage.setItem(
            `episode_${episodeId}`,
            JSON.stringify({ timestamp: new Date().getTime(), data })
          );
        })
        .finally(() => {
          // Set the loading state to false after the fetch is completed
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [episodeId, podcastId]);

  // Find the episode that matches the episodeId
  const track = episode?.find(
    (episode: { trackId: number }) => episode.trackId === Number(episodeId)
  );

  const viewPodcastDetails = (podcastId: string) => {
    navigate(`/podcast/${podcastId}`);
  };

  return (
    <>
      {isLoading && (
        <>
          <div className={stylesEpisode.spinner} />
          <h4 className={stylesEpisode.spinnerMessage}>Loading Track...</h4>
        </>
      )}
      {track && (
        <div className={styles.podcastDetailsContainer}>
          <div className={styles.detailsArtistCard}>
            <img
              className={styles.podcastDetailsArtwork}
              src={track && track.artworkUrl600}
              alt="podcast"
              onClick={() => viewPodcastDetails(String(podcastId))}
            />
            <PodcastDetailsArtistCard id={podcastId} />
          </div>

          {track && (
            <div className={stylesEpisode.episodeDetailsPlayer}>
              <h3>{track.trackName}</h3>
              <p className={stylesEpisode.episodeTrackDescription}>
                {track.description}
              </p>
              <audio controls>
                <source src={track.previewUrl} type="audio/mpeg" />
              </audio>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default EpisodeDetails;
