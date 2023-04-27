import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { fetchPodcasts } from "../../features/podcasts/podcastsSlice";

import styles from "./PodcastDetails.module.css";

interface PodcastProps {
  id: string | undefined;
}

const PodcastDetailsArtistCard = ({ id }: PodcastProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const podcasts = useSelector((state: RootState) => state.podcasts.items);
  const podcastsStatus = useSelector(
    (state: RootState) => state.podcasts.status
  );

  useEffect(() => {
    if (podcastsStatus === "idle") {
      dispatch(fetchPodcasts());
    }
  }, [podcastsStatus, dispatch]);

  // eslint-disable-next-line array-callback-return
  const podcastDataMapped = podcasts.map((podcast) => {
    if (id === podcast.id.attributes["im:id"]) {
      return podcast;
    }
  });

  const podcastMapped = podcastDataMapped.find(
    (podcast) => podcast !== undefined
  );
  return (
    <>
      <div className={styles.detailsArtistCardName}>
        <h4>{podcastMapped?.title.label}</h4>
        <span>by {podcastMapped?.["im:artist"].label}</span>
      </div>

      <div className={styles.detailsArtistCardDescription}>
        <h4>Description:</h4>
        <span>{podcastMapped?.summary.label}</span>
      </div>
    </>
  );
};

export default PodcastDetailsArtistCard;
