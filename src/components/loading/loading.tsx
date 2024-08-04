import { Spin } from "antd";
import styles from "./loading.module.css";

export const Loading = () => {
  return (
    <div className={styles.loading}>
      <Spin size="large" />
    </div>
  );
};
