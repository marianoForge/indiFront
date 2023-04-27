import { FC } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./Navbar.module.css";

export const NavBar: FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.NavbarContainer}>
      <div className={styles.Logo} onClick={() => navigate(`/`)}>
        Podcaster
      </div>
    </div>
  );
};
