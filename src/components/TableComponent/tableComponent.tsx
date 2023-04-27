import { PodcastTypes } from "../../types/componentsTypes";
import { millisecondsToTime } from "../../utils/timeConverter";
import { formatDate } from "../../utils/dateConverter";
import styles from "./tableComponent.module.css";

interface TableComponentProps {
  podcast: PodcastTypes;
  viewEpisodeDetails: (id: string, trackId: string) => void;
}

const TableComponent = ({
  podcast,
  viewEpisodeDetails,
}: TableComponentProps) => {
  return (
    <>
      <div className={styles.table}>
        <div className={styles.tableRow}>
          <div className={styles.tableColumnTitle}>Title</div>
          <div className={styles.tableColumn}>Date</div>
          <div className={styles.tableColumn}>Duration</div>
        </div>

        {podcast.map((episode) => (
          <div className={styles.tableRow} key={episode.trackId}>
            <div
              className={styles.tableColumnTrack}
              style={{ color: "#4182c7" }}
              onClick={() =>
                viewEpisodeDetails(episode.collectionId, episode.trackId)
              }
            >
              {episode.trackName}
            </div>

            <div className={styles.tableColumn}>
              {formatDate(episode.releaseDate)}
            </div>
            <div className={styles.tableColumn}>
              {millisecondsToTime(episode.trackTimeMillis)}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TableComponent;
