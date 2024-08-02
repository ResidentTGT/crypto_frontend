import { Outlet } from "react-router";
import styles from "./blast.module.css";
export const Blast = () => {
  return (
    <div className={styles.blast}>
      <h1>Blast</h1>
      <Outlet />
    </div>
  );
};
