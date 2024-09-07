import { useDispatch, useSelector } from "react-redux";
import styles from "./predictfun.module.css";
import { AppDispatch, RootState } from "../../../../stores/app";
import { UIEvent, useEffect, useRef, useState } from "react";
import { getPredictfunLeaderboard } from "../../../../reducers/blast";
import { PREDICTFUN_LEADERBOARD_COLUMNS } from "./predictfunLeaderboardColumns";
import Error from "../../../error/error";
import { Loading } from "../../../loading/loading";
import React from "react";
import { UpOutlined, DownOutlined } from "@ant-design/icons";
import favicon from "../../../../assets/blast_favicon.png";
import Input from "antd/es/input";

type SortBy = { column: string; ascending: boolean };

const ALLOWED_COLUMNS = [
  "name",
  "dailyRank",
  "dailyPoints",
  "seasonPoints",
  "multiplier",
];

const GOLD = 879765;
export const Predictfun = () => {
  const [sortBy, setSortBy] = useState<SortBy>({
    column: "seasonPoints",
    ascending: true,
  });
  const [tableLeaderboard, setTableLeaderboard] = useState<any[]>([]);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [dailyPoints, setDailyPoints] = useState<number>(0);
  const [yourPoints, setYourPoints] = useState("0");
  const status = useSelector<RootState, string>(
    (s) => s.blast.predictfunLeaderboardStatus
  );
  const leaderboard = useSelector<RootState, any[]>(
    (s) => s.blast.predictfunLeaderboard
  );

  const sortLeaderboard = (_leaderboard: any[], _sortBy: SortBy) => {
    switch (_sortBy.column) {
      case "dailyRank":
      case "dailyPoints":
      case "seasonPoints":
      case "multiplier":
        _sortBy.ascending
          ? _leaderboard.sort((a, b) => +b[_sortBy.column] - +a[_sortBy.column])
          : _leaderboard.sort(
              (a, b) => +a[_sortBy.column] - +b[_sortBy.column]
            );
        break;
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
    const _leaderboard = leaderboard.map((a) =>
      Object.assign({}, a.node, a.node.account)
    );

    sortLeaderboard(_leaderboard, sortBy);

    for (let i = 0; i < _leaderboard.length; i++) {
      const dailyPoints = _leaderboard[i].dailyPoints;
      const seasonPoints = _leaderboard[i].seasonPoints;

      _leaderboard[i].dailyPoints =
        Math.round(dailyPoints).toLocaleString("ru-RU");
      _leaderboard[i].seasonPoints =
        Math.round(seasonPoints).toLocaleString("ru-RU");
      _leaderboard[i].index = i + 1;
    }

    setTableLeaderboard(_leaderboard);
    setTotalPoints(
      Math.round(
        leaderboard.map((a) => +a.node.seasonPoints).reduce((x, y) => x + y, 0)
      )
    );
    setDailyPoints(
      Math.round(
        leaderboard.map((a) => +a.node.dailyPoints).reduce((x, y) => x + y, 0)
      )
    );
  }, [leaderboard, sortBy]);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (leaderboard.length === 0) dispatch(getPredictfunLeaderboard());
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
    if (ALLOWED_COLUMNS.includes(key))
      setSortBy({
        column: key,
        ascending: sortBy.column === key ? !sortBy.ascending : true,
      });
  };

  return (
    <div className={styles.leaderboard}>
      <div className={styles.description}>
        <div>
          This leaderboard is the parsed data from{" "}
          <a href="https://predict.fun/rewards">https://predict.fun/rewards</a>
        </div>
        <div className={styles.points}>
          <span>Total points: {totalPoints.toLocaleString("ru-RU")}</span>
          <span>Daily points: {dailyPoints.toLocaleString("ru-RU")}</span>
          <span>Gold: {GOLD.toLocaleString("ru-RU")}</span>
          <span>Point/Gold: {(totalPoints / GOLD).toFixed(2)} (linear)</span>
        </div>
        <div className={styles.calculation}>
          Your points:
          <Input
            className={styles.input}
            placeholder="Enter number"
            value={yourPoints}
            onChange={(e) => setYourPoints(e.target.value)}
          />
          <span>
            Percent from total: {((+yourPoints / totalPoints) * 100).toFixed(4)}
            %
          </span>
          <span>
            Your gold: {((+yourPoints / totalPoints) * GOLD).toFixed(2)}{" "}
          </span>
        </div>
      </div>
      <div className={styles.table}>
        <div ref={tableHeaderRef} className={styles.tableHeader}>
          {PREDICTFUN_LEADERBOARD_COLUMNS.map((c) => {
            return (
              <div
                key={c.key}
                style={{ minWidth: c.width, width: c.width }}
                onClick={() => handleClickSort(c.key)}
              >
                <React.Fragment>
                  {c.title}
                  {ALLOWED_COLUMNS.includes(c.key) &&
                  c.key === sortBy.column ? (
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
                {PREDICTFUN_LEADERBOARD_COLUMNS.map((c) => {
                  return (
                    <div
                      key={index + c.key}
                      style={{ minWidth: c.width, width: c.width }}
                    >
                      {c.key === "name" ? (
                        <>
                          <a href={`https://blastscan.io/address/${l.address}`}>
                            <img src={favicon} alt="logo" />
                          </a>
                          {l[c.key]}
                        </>
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
