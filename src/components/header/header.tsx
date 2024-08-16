import styles from "./header.module.css";
import { NavLink } from "react-router-dom";

export const Header: React.FC = () => {
  const getClassName = (isActive: boolean) =>
    isActive ? `${styles.link} + ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <div className={styles.menu}>
        {/* <NavLink to={`/`} className={({ isActive }) => getClassName(isActive)}>
          Home
        </NavLink> */}
        <NavLink
          to={`projects`}
          className={({ isActive }) => getClassName(isActive)}
        >
          Projects
        </NavLink>
        <NavLink
          to={`about`}
          className={({ isActive }) => getClassName(isActive)}
        >
          About
        </NavLink>
      </div>
    </header>
  );
};
