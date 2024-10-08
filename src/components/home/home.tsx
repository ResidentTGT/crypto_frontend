import { CryptoCurrencyMarket } from "react-ts-tradingview-widgets";
import styles from "./home.module.css";

export const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.layout}>
        <div className={styles.widgets}>
          <div className={styles.widget}>хз, что сюда пихнуть</div>
          <div className={styles.widget}>индекс жадности, как везде</div>
          <div className={styles.widget}>еще один бесполезный график</div>
        </div>

        <div className={styles.graph}>
          <CryptoCurrencyMarket
            colorTheme="light"
            width="100%"
            height="100%"
          ></CryptoCurrencyMarket>
        </div>
      </div>
    </div>
  );
};
