import styles from "./App.module.css";

import { Header } from "../header/header";
import { Main } from "../main/main";

const App = () => {
  return (
    <div className={styles.layout}>
      <Header />
      <Main />
    </div>
  );
};

export default App;
