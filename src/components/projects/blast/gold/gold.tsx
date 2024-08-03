import { useState } from "react";
import { Empty } from "../../../empty/empty";
import styles from "./gold.module.css";
import { Input } from "antd";
export const Gold = () => {
  const ALLOCATION_OF_BLAST = 5000000000;
  const [goldSupply, setGoldSupply] = useState("150000000");
  const [blastPrice, setBlastPrice] = useState("0.012");

  return (
    <div className={styles.gold}>
      <div className={styles.description}>
        On this page you can calculate the current price of GOLD with suggested
        final total supply of GOLD.
      </div>
      <div className={styles.calculation}>
        <div>Allocation of $BLAST for GOLD: {ALLOCATION_OF_BLAST} (5%)</div>
        <div>
          Suggested total supply of GOLD:
          <Input
            className={styles.input}
            placeholder="Enter number"
            value={goldSupply}
            onChange={(e) => setGoldSupply(e.target.value)}
          />
        </div>
        <div>
          Price of $BLAST:
          <Input
            className={styles.input}
            placeholder="Enter number"
            value={blastPrice}
            onChange={(e) => setBlastPrice(e.target.value)}
          />
        </div>
        <div>
          Price of gold:{" "}
          {((ALLOCATION_OF_BLAST / +goldSupply) * +blastPrice).toFixed(2)}$
        </div>
      </div>
    </div>
  );
};
