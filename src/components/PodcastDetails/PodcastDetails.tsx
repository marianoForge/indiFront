import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchDetails } from "../../utils/api";
import { PodcastTypes } from "../../types/componentsTypes";
import Table from "../TableComponent/tableComponent";
import styles from "./PodcastDetails.module.css";
import PodcastDetailsArtistCard from "./PodcastDetailsArtistCard";

const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const PodcastDetails = () => {
  const [podcast, setPodcast] = useState<PodcastTypes | null | undefined>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { podcastId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!podcastId) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      fetchDetails(String(podcastId))
        .then((data) => {
          const cachedData = localStorage.getItem(`podcast_${podcastId}`);
          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const currentTime = new Date().getTime();

            if (currentTime - parsedData.timestamp < CACHE_DURATION) {
              setPodcast(parsedData.data);
            }
          }
          localStorage.setItem(
            `podcast_${podcastId}`,
            JSON.stringify({ timestamp: new Date().getTime(), data })
          );
          setPodcast(data);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, [podcastId]);

  const viewEpisodeDetails = (id: string, trackId: string) => {
    navigate(`/podcast/${id}/episode/${trackId}`);
  };

  const episodes = podcast?.length;

  return (
    <>
      {isLoading ? (
        <>
          <div className={styles.spinner} />
          <h4 className={styles.spinnerMessage}>Loading Track...</h4>
        </>
      ) : (
        podcast && (
          <div className={styles.podcastDetailsContainer}>
            <div className={styles.detailsArtistCard}>
              <img
                className={styles.podcastDetailsArtwork}
                src={podcast && podcast[0].artworkUrl160}
                alt="podcast"
              />

              <PodcastDetailsArtistCard id={podcastId} />
            </div>

            <div>
              <div className={styles.titleCard}>Episodes: {episodes} </div>
              <Table
                podcast={podcast}
                viewEpisodeDetails={viewEpisodeDetails}
              />
            </div>
          </div>
        )
      )}
    </>
  );
};

export default PodcastDetails;
