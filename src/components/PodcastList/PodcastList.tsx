// src/components/PodcastList.tsx
import { useEffect, useState } from "react";
import { fetchTopPodcasts } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { getItemFromLocalStorage } from "../../utils/localStorage";
import { splitText } from "../../utils/textSplit";
import styles from "./PodcastList.module.css";

const PodcastList = () => {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Fetches the top podcasts from the iTunes API and stores them in local storage
  useEffect(() => {
    setIsLoading(true);
    if (getItemFromLocalStorage("podcastData") !== null) {
      setPodcasts(getItemFromLocalStorage("podcastData"));
      setIsLoading(false);
    } else {
      fetchTopPodcasts().then((data) => {
        setPodcasts(data);
        setIsLoading(false);
      });
    }
  }, []);

  // Filters the podcasts based on the search term
  useEffect(() => {
    const filtered = podcasts.filter((podcast: any) =>
      podcast.title.label.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPodcasts(filtered);
  }, [searchTerm, podcasts]);

  return (
    <div className={styles.podcastListContainer}>
      <input
        className={styles.podcastListSearchBar}
        type="text"
        placeholder="Search for your favorite podcast here!"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isLoading ? (
        <>
          <div className={styles.spinner} />
          <h4 className={styles.spinnerMessage}>Loading Track...</h4>
        </>
      ) : (
        <ul className={styles.podcastList}>
          {filteredPodcasts.map((podcast: any) => (
            <li
              className={styles.podcastListItem}
              key={podcast.id.attributes["im:id"]}
              onClick={() =>
                navigate(`/podcast/${podcast.id.attributes["im:id"]}`)
              }
              style={{ cursor: "pointer" }}
            >
              <img
                className={styles.podcastListItemImage}
                src={podcast["im:image"][2].label}
                alt="podcast"
              />
              {splitText(podcast.title.label)} <br></br>
              {podcast["im:artist"].label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PodcastList;
