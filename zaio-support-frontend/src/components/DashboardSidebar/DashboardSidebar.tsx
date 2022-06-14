import React from "react";
import { NavLink } from "react-router-dom";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import styles from "./DashboardSidebar.module.css";
export const DashboardSidebar = () => {
  return (
    <div
      className={`${styles.sidebarmain} w-100 d-flex flex-column align-items-center`}
    >
      <NavLink
        to={RouteDefinitions.ROUTE_DASHBOARD}
        className={styles.navlink}
        activeClassName={styles.navlink_active}
        exact
      >
        Dashboard
      </NavLink>
      <NavLink
        to={RouteDefinitions.ROUTE_HISTORY}
        className={styles.navlink}
        activeClassName={styles.navlink_active}
        exact
      >
        History
      </NavLink>
      <NavLink
        to={RouteDefinitions.ROUTE_SETTINGS}
        className={styles.navlink}
        activeClassName={styles.navlink_active}
        exact
      >
        Settings
      </NavLink>
    </div>
  );
};
