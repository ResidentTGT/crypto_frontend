import { Outlet } from "react-router";
import styles from "./linea.module.css";
export const Linea = () => {
  return (
    <div className={styles.linea}>
      <Outlet />
    </div>
  );
};
