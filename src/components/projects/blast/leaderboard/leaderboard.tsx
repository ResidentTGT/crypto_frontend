import { useDispatch, useSelector } from "react-redux";
import styles from "./leaderboard.module.css";
import { AppDispatch, RootState } from "../../../../stores/app";
import { UIEvent, useEffect, useRef } from "react";
import { BlastState, getLeaderboard } from "../../../../reducers/blast";
import { Divider, Table } from "antd";
import React from "react";
import { LEADERBOARD_COLUMNS } from "./leaderboardColumns";
export const Leaderboard = () => {
  const status = useSelector<RootState, string>((state) => state.blast.status);
  const leaderboard = useSelector<RootState, any[]>((state) => {
    const leaderboard = state.blast.leaderboard.map((a) =>
      Object.assign({}, a)
    );
    leaderboard.sort((a, b) => +b.goldAccrued - +a.goldAccrued);
    for (let i = 0; i < leaderboard.length; i++) {
      leaderboard[i].pointsAccrued = Math.round(leaderboard[i].pointsAccrued);
      leaderboard[i].pointsDistributed = Math.round(
        leaderboard[i].pointsDistributed
      );
      leaderboard[i].goldAccrued = Math.round(leaderboard[i].goldAccrued);
      leaderboard[i].goldDistributed = Math.round(
        leaderboard[i].goldDistributed
      );
      const pointsLeft = Math.round(
        leaderboard[i].pointsAccrued - leaderboard[i].pointsDistributed
      );
      leaderboard[i].pointsLeft = `${pointsLeft} ${
        leaderboard[i].pointsAccrued
          ? `(${((pointsLeft / leaderboard[i].pointsAccrued) * 100).toFixed(
              2
            )}%)`
          : ""
      }`;
      const goldLeft = Math.round(
        leaderboard[i].goldAccrued - leaderboard[i].goldDistributed
      );
      leaderboard[i].goldLeft = `${goldLeft} ${
        leaderboard[i].goldAccrued
          ? `(${((goldLeft / leaderboard[i].goldAccrued) * 100).toFixed(2)}%)`
          : ""
      }`;
    }
    return leaderboard;
  });

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (leaderboard.length === 0) dispatch(getLeaderboard());
  }, [dispatch]);

  const tableHeaderRef = useRef<HTMLDivElement | null>(null);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: </div>;
  }

  const handleScrollTable = (event: UIEvent) => {
    tableHeaderRef.current?.scrollTo({ left: event.currentTarget.scrollLeft });
  };

  return (
    <div className={styles.leaderboard}>
      <div className={styles.description}>
        This leaderboard is the parsed data from{" "}
        <a href="https://blast.io/en/airdrop">Offical Blast Leaderboard</a>
      </div>
      <div className={styles.table}>
        <div ref={tableHeaderRef} className={styles.tableHeader}>
          {LEADERBOARD_COLUMNS.map((c) => {
            return (
              <div key={c.key} style={{ minWidth: c.width }}>
                {c.title}
              </div>
            );
          })}
          <div style={{ minWidth: "20px" }}></div> {/* for scrollbar */}
        </div>
        <div className={styles.tableBody} onScroll={handleScrollTable}>
          {leaderboard.map((l, index) => {
            return (
              <div key={index} className={styles.tableRow}>
                {LEADERBOARD_COLUMNS.map((c) => {
                  return (
                    <div
                      key={index + c.key}
                      style={{ minWidth: c.width, width: c.width }}
                    >
                      {c.key === "imageUrl" ? (
                        <img src={l[c.key]} />
                      ) : c.key === "name" ? (
                        <a href={`https://x.com/${l.twitter}`}>{l[c.key]}</a>
                      ) : (
                        l[c.key]
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
