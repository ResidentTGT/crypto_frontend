import { Divider, Menu, MenuProps } from "antd";
import styles from "./projects.module.css";
import { Routes, Route, Navigate, Outlet } from "react-router";
import { About } from "../about/about";
import { Home } from "../home/home";
import { Blast } from "./blast/blast";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

const PROJECTS = [
  {
    name: "Blast",
    path: "blast",
    children: [
      {
        name: "Leaderboard",
        path: "leaderboard",
      },
      {
        name: "Calculate GOLD price",
        path: "gold",
      },
    ],
  },
  {
    name: "Linea",
    path: "linea",
  },
];

export const Projects = () => {
  let location = useLocation();

  const getLinkClassName = (isActive: boolean) =>
    isActive ? `${styles.navElem} + ${styles.active}` : styles.navElem;

  const getUrlBoxClassName = (path: string) => {
    return location.pathname.includes(path)
      ? `${styles.urlBox} + ${styles.active}`
      : styles.urlBox;
  };

  return (
    <>
      <aside>
        {PROJECTS.map((p, index) => (
          <>
            <NavLink
              to={p.path}
              className={({ isActive }) => getLinkClassName(isActive)}
              children={({ isActive }) => {
                return (
                  <>
                    {p.name}
                    {p.children &&
                      p.children.length > 0 &&
                      (isActive ? (
                        <UpOutlined className={styles.arrow} />
                      ) : (
                        <DownOutlined className={styles.arrow} />
                      ))}
                  </>
                );
              }}
            ></NavLink>
            {p.children && p.children.length > 0 ? (
              <div className={getUrlBoxClassName(p.path)}>
                {p.children.map((pr) => (
                  <NavLink
                    to={`${p.path}/${pr.path}`}
                    className={({ isActive }) => getLinkClassName(isActive)}
                  >
                    {pr.name}
                  </NavLink>
                ))}
              </div>
            ) : (
              <></>
            )}
            {index !== PROJECTS.length - 1 && <Divider style={{ margin: 0 }} />}
          </>
        ))}
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </>
  );
};
