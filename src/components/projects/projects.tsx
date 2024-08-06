import { Divider } from "antd";
import styles from "./projects.module.css";
import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { DownOutlined, UpOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

interface MenuItem {
  name: string;
  path: string;
  highlighted: boolean;
  openedMenu: boolean;
  children?: MenuItem[];
}

export const Projects = () => {
  let location = useLocation();

  const [projects, setProjects] = useState<MenuItem[]>([
    {
      name: "Blast",
      path: "blast",
      highlighted: false,
      openedMenu: false,
      children: [
        {
          name: "Leaderboard",
          path: "leaderboard",
          highlighted: false,
          openedMenu: false,
        },
        {
          name: "Calculate GOLD price",
          path: "gold",
          highlighted: false,
          openedMenu: false,
        },
      ],
    },
    {
      name: "Linea",
      path: "linea",
      highlighted: false,
      openedMenu: false,
      children: [
        {
          name: "Check POH",
          path: "poh",
          highlighted: false,
          openedMenu: false,
        },
      ],
    },
  ]);

  const handleItemClick = (project: MenuItem) => {
    const p = projects.find((p) => p.path === project.path);
    if (p) {
      p.openedMenu = !p.openedMenu;
    }
    setProjects(projects.slice());
  };

  useEffect(() => {
    setProjects((projects) => {
      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const active = project.path === location.pathname.split("/")[2];
        project.highlighted = active;
        if (active) project.openedMenu = active;

        if (project.children) {
          for (let j = 0; j < project.children.length; j++) {
            const pr = project.children[j];
            const active = pr.path === location.pathname.split("/")[3];
            project.children[j].highlighted = active;
            if (active) project.children[j].openedMenu = active;
          }
        }
      }
      return projects.slice();
    });
    return () => {};
  }, [location]);

  return (
    <>
      <aside>
        {projects.map((p, index) => (
          <React.Fragment key={index}>
            {p.children ? (
              <React.Fragment>
                <button
                  className={`${styles.navElem} ${
                    p.highlighted && styles.highlighted
                  }`}
                  onClick={() => handleItemClick(p)}
                >
                  <React.Fragment>
                    {p.name}
                    {p.openedMenu ? (
                      <UpOutlined className={styles.arrow} />
                    ) : (
                      <DownOutlined className={styles.arrow} />
                    )}
                  </React.Fragment>
                </button>
                <div
                  className={`${styles.urlBox} ${
                    p.openedMenu && styles.opened
                  }`}
                >
                  {p.children.map((pr) => (
                    <NavLink
                      key={pr.path}
                      to={`${p.path}/${pr.path}`}
                      className={`${styles.navElem} ${styles.tree} ${
                        pr.highlighted && styles.highlighted
                      }`}
                    >
                      {pr.name}
                    </NavLink>
                  ))}
                </div>
              </React.Fragment>
            ) : (
              <NavLink
                to={p.path}
                className={`${styles.navElem} ${
                  p.highlighted && styles.highlighted
                }`}
              ></NavLink>
            )}

            {index !== projects.length - 1 && <Divider style={{ margin: 0 }} />}
          </React.Fragment>
        ))}
      </aside>
      <section className={styles.content}>
        <Outlet />
      </section>
    </>
  );
};
