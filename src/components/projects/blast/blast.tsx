import { Outlet } from "react-router";
import styles from "./blast.module.css";
export const Blast = () => {
  return (
    <div className={styles.blast}>
      <Outlet />
    </div>
  );
};
