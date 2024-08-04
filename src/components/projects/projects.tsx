import { Divider } from "antd";
import styles from "./projects.module.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React from "react";

interface MenuItem {
  name: string;
  path: string;
  children?: MenuItem[];
}

const PROJECTS: MenuItem[] = [
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
    children: [
      {
        name: "Check POH",
        path: "poh",
      },
    ],
  },
];

export const Projects = () => {
  let location = useLocation();

  const getUrlBoxClassName = (path: string) => {
    return location.pathname.includes(path)
      ? `${styles.urlBox} + ${styles.active}`
      : styles.urlBox;
  };

  return (
    <>
      <aside>
        {PROJECTS.map((p, index) => (
          <React.Fragment key={index}>
            <NavLink
              to={p.path}
              className={({ isActive }) =>
                `${styles.navElem} ${isActive && styles.active}`
              }
              children={({ isActive }) => {
                return (
                  <React.Fragment>
                    {p.name}
                    {p.children &&
                      (isActive ? (
                        <UpOutlined className={styles.arrow} />
                      ) : (
                        <DownOutlined className={styles.arrow} />
                      ))}
                  </React.Fragment>
                );
              }}
            ></NavLink>
            {p.children ? (
              <div className={getUrlBoxClassName(p.path)}>
                {p.children.map((pr) => (
                  <NavLink
                    key={pr.path}
                    to={`${p.path}/${pr.path}`}
                    className={({ isActive }) =>
                      `${styles.navElem} ${styles.tree} ${
                        isActive && styles.active
                      }`
                    }
                  >
                    {pr.name}
                  </NavLink>
                ))}
              </div>
            ) : (
              <React.Fragment></React.Fragment>
            )}
            {index !== PROJECTS.length - 1 && <Divider style={{ margin: 0 }} />}
          </React.Fragment>
        ))}
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </>
  );
};
