import styles from "./about.module.css";
import avatar from "../../assets/avatar.jpg";

export const About = () => {
  return (
    <div className={styles.about}>
      <div className={styles.image}>
        <img alt="avatar" src={avatar} />
      </div>
      <div className={styles.name}>Resident</div>
      <div className={styles.description}>Crypto Tools for Degens</div>
      <div className={styles.links}>
        <a
          href="https://t.me/crypto_resident_notes"
          rel="noreferrer"
          target="_blank"
        >
          Crypto Resident Telegram Channel
        </a>
        <a
          href="https://github.com/ResidentTGT/crypto_frontend"
          rel="noreferrer"
          target="_blank"
        >
          Github Crypto Tools Frontend
        </a>
        <a
          href="https://github.com/ResidentTGT/crypto_backend"
          rel="noreferrer"
          target="_blank"
        >
          Github Crypto Tools Backend
        </a>
      </div>
    </div>
  );
};
