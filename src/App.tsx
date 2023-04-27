import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PodcastList from "./components/PodcastList/PodcastList";
import PodcastDetails from "./components/PodcastDetails/PodcastDetails";
import EpisodeDetails from "./components/EpisodeDetails/EpisodeDetails";
import { NavBar } from "./components/Layout/Navbar";
import styles from "./App.module.css";

function App() {
  return (
    <Router>
      <NavBar />
      <div className={styles.app__container}>
        <Routes>
          <Route path="/" element={<PodcastList />} />
          <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
          <Route
            path="/podcast/:podcastId/episode/:episodeId"
            element={<EpisodeDetails />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
