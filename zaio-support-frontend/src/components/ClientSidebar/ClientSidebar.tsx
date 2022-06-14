import React from "react";
import { NavLink } from "react-router-dom";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import styles from "./ClientSidebar.module.css";
export const ClientSidebar = () => {
  return (
    <div
      className={`${styles.sidebarmain} w-100 d-flex flex-column align-items-center`}
    >
      <NavLink
        to={RouteDefinitions.ROUTE_CLIENT_DASHBOARD}
        className={styles.navlink}
        activeClassName={styles.navlink_active}
        exact
      >
        Dashboard
      </NavLink>
      <NavLink
        to={RouteDefinitions.ROUTE_CLIENT_MEETINGS}
        className={styles.navlink}
        activeClassName={styles.navlink_active}
        exact
      >
        Meetings
      </NavLink>
      <NavLink
        to={RouteDefinitions.ROUTE_CLIENT_PAYMENT_LIST}
        className={styles.navlink}
        activeClassName={styles.navlink_active}
        exact
      >
        Payments List
      </NavLink>
    </div>
  );
};
