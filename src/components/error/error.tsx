import { useRouteError } from "react-router-dom";
import styles from "./error.module.css";

export default function Error() {
  return (
    <div className={styles.error}>Sorry, an unexpected error has occurred.</div>
  );
}
