import { useDispatch, useSelector } from "react-redux";
import styles from "./leaderboard.module.css";
import { AppDispatch, RootState } from "../../../../stores/app";
import { UIEvent, useEffect, useRef, useState } from "react";
import { getLeaderboard } from "../../../../reducers/blast";
import { LEADERBOARD_COLUMNS } from "./leaderboardColumns";
import Error from "../../../error/error";
import { Loading } from "../../../loading/loading";
import React from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";

type SortBy = { column: string; ascending: boolean };
export const Leaderboard = () => {
  const [sortBy, setSortBy] = useState<SortBy>({
    column: "goldAccrued",
    ascending: true,
  });
  const [tableLeaderboard, setTableLeaderboard] = useState<any[]>([]);
  const status = useSelector<RootState, string>((s) => s.blast.status);
  const leaderboard = useSelector<RootState, any[]>((s) => s.blast.leaderboard);

  const sortLeaderboard = (_leaderboard: any[], _sortBy: SortBy) => {
    switch (_sortBy.column) {
      case "goldAccrued":
      case "goldDistributed":
      case "goldLeft":
      case "pointsAccrued":
      case "pointsDistributed":
      case "pointsLeft":
        _sortBy.ascending
          ? _leaderboard.sort((a, b) => +b[_sortBy.column] - +a[_sortBy.column])
          : _leaderboard.sort(
              (a, b) => +a[_sortBy.column] - +b[_sortBy.column]
            );
        break;
      case "category":
      case "name":
        _sortBy.ascending
          ? _leaderboard.sort((a, b) =>
              a[_sortBy.column].localeCompare(b[_sortBy.column])
            )
          : _leaderboard.sort((a, b) =>
              b[_sortBy.column].localeCompare(a[_sortBy.column])
            );
        break;
    }
  };

  useEffect(() => {
    const _leaderboard = leaderboard.map((a) => Object.assign({}, a));

    for (let i = 0; i < _leaderboard.length; i++) {
      const pointsAccrued = _leaderboard[i].pointsAccrued;
      const pointsDistributed = _leaderboard[i].pointsDistributed;
      const pointsLeft = pointsAccrued - pointsDistributed;
      const goldAccrued = _leaderboard[i].goldAccrued;
      const goldDistributed = _leaderboard[i].goldDistributed;
      const goldLeft = goldAccrued - goldDistributed;
      _leaderboard[i].pointsLeft = pointsLeft;
      _leaderboard[i].goldLeft = goldLeft;
    }

    sortLeaderboard(_leaderboard, sortBy);

    for (let i = 0; i < _leaderboard.length; i++) {
      const pointsAccrued = _leaderboard[i].pointsAccrued;
      const pointsDistributed = _leaderboard[i].pointsDistributed;
      const pointsLeft =
        _leaderboard[i].pointsAccrued - _leaderboard[i].pointsDistributed;
      const goldAccrued = _leaderboard[i].goldAccrued;
      const goldDistributed = _leaderboard[i].goldDistributed;
      const goldLeft = goldAccrued - goldDistributed;
      _leaderboard[i].pointsAccrued =
        Math.round(pointsAccrued).toLocaleString("ru-RU");
      _leaderboard[i].pointsDistributed =
        Math.round(pointsDistributed).toLocaleString("ru-RU");
      _leaderboard[i].goldAccrued =
        Math.round(goldAccrued).toLocaleString("ru-RU");
      _leaderboard[i].goldDistributed =
        Math.round(goldDistributed).toLocaleString("ru-RU");

      _leaderboard[i].pointsLeft = `${Math.round(pointsLeft).toLocaleString(
        "ru-RU"
      )} ${
        pointsAccrued
          ? `(${((pointsLeft / pointsAccrued) * 100).toFixed(2)}%)`
          : ""
      }`;
      _leaderboard[i].goldLeft = `${Math.round(goldLeft).toLocaleString(
        "ru-RU"
      )} ${
        goldAccrued ? `(${((goldLeft / goldAccrued) * 100).toFixed(2)}%)` : ""
      }`;
    }

    setTableLeaderboard(_leaderboard);
  }, [leaderboard, sortBy]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (leaderboard.length === 0) dispatch(getLeaderboard());
  }, [dispatch, leaderboard.length]);

  const tableHeaderRef = useRef<HTMLDivElement | null>(null);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "failed") {
    return <Error />;
  }

  const handleScrollTable = (event: UIEvent) => {
    tableHeaderRef.current?.scrollTo({ left: event.currentTarget.scrollLeft });
  };

  const handleClickSort = (key: string) => {
    setSortBy({
      column: key,
      ascending: sortBy.column === key ? !sortBy.ascending : true,
    });
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
              <div
                key={c.key}
                style={{ minWidth: c.width }}
                onClick={() => handleClickSort(c.key)}
              >
                <React.Fragment>
                  {c.title}
                  {c.key !== "imageUrl" && c.key === sortBy.column ? (
                    sortBy.ascending ? (
                      <UpOutlined className={styles.arrow} />
                    ) : (
                      <DownOutlined className={styles.arrow} />
                    )
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}
                </React.Fragment>
              </div>
            );
          })}
          <div style={{ minWidth: "20px" }}></div> {/* for scrollbar */}
        </div>
        <div className={styles.tableBody} onScroll={handleScrollTable}>
          {tableLeaderboard.map((l, index) => {
            return (
              <div key={index} className={styles.tableRow}>
                {LEADERBOARD_COLUMNS.map((c) => {
                  return (
                    <div
                      key={index + c.key}
                      style={{ minWidth: c.width, width: c.width }}
                    >
                      {c.key === "imageUrl" ? (
                        <img src={l[c.key]} alt={l.name} />
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
