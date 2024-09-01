import styles from "./main.module.css";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../home/home";
import { About } from "../about/about";
import { Projects } from "../projects/projects";
import { Blast } from "../projects/blast/blast";
import { Leaderboard } from "../projects/blast/leaderboard/leaderboard";
import { Gold } from "../projects/blast/gold/gold";
import { Linea } from "../projects/linea/linea";
import { Poh } from "../projects/linea/poh/poh";

export const Main: React.FC = () => {
  return (
    <div className={styles.main}>
      <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="about" element={<About />} />
        <Route path="projects" element={<Projects />}>
          <Route path="" element={<Navigate to="blast" replace />}></Route>
          <Route path="blast" element={<Blast />}>
            <Route
              path=""
              element={<Navigate to="leaderboard" replace />}
            ></Route>
            <Route path="leaderboard" element={<Leaderboard />}></Route>
            <Route path="gold" element={<Gold />}></Route>
          </Route>
          <Route path="linea" element={<Linea />}>
            <Route path="" element={<Navigate to="poh" replace />}></Route>
            <Route path="poh" element={<Poh />}></Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};
