import { useEffect, useState } from "react";
import styles from "./poh.module.css";
import { Button, Divider, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../stores/app";
import { clearPohState, getPoh } from "../../../../reducers/linea";
import Error from "../../../error/error";
import { Loading } from "../../../loading/loading";
export const Poh = () => {
  const status = useSelector<RootState, string>(
    (state) => state.linea.pohStatus
  );
  const poh = useSelector<RootState, any>((state) => state.linea.poh);
  const [wallet, setWallet] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    return () => {
      dispatch(clearPohState());
    };
  }, []);

  const handleCheckButtonClick = () => {
    dispatch(getPoh(wallet));
  };

  return (
    <div className={styles.poh}>
      <div className={styles.description}>
        On this page you can check Linea POH status of your wallet.
      </div>
      <div className={styles.checkPoh}>
        <div className={styles.form}>
          <Input
            className={styles.input}
            placeholder="Enter wallet address"
            value={wallet}
            onChange={(e) => setWallet(e.target.value)}
          />
          <Button
            className={styles.checkButton}
            onClick={handleCheckButtonClick}
          >
            Check POH
          </Button>
        </div>
        {status === "loading" && <Loading />}
        {status === "failed" && <Error />}
        {status === "succeeded" && poh && (
          <div className={styles.pohStatus}>
            <div className={styles.statuses}>
              POH completed: {poh.poh ? "✅" : "⛔"}
            </div>
            <div className={styles.statuses}>
              Not Sybil: {poh.isFlagged ? "⛔" : "✅"}
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <div className={styles.attestations}>
              <div className={styles.group}>
                {poh.attestations
                  .filter((a: any) => a.group === 1)
                  .map((a: any, index: number) => (
                    <div className={styles.issuer} key={a.group + index}>
                      <span>{a.issuerName}</span>
                      <span>{a.validated ? "✅" : "⛔"}</span>
                    </div>
                  ))}
              </div>
              <Divider type="vertical" />
              <div className={styles.group}>
                {" "}
                {poh.attestations
                  .filter((a: any) => a.group === 2)
                  .map((a: any, index: number) => (
                    <div className={styles.issuer} key={a.group + index}>
                      <span>{a.issuerName}</span>
                      <span>{a.validated ? "✅" : "⛔"}</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
