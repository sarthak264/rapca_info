import TeacherServices from "api/TeacherServices";
import React, { useEffect, useState } from "react";
import { matchPath, NavLink, useHistory } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";
import { activeNavLinkStyle } from "../DashboardLayout";

export const TeacherSubSidebar = () => {
  const [loading, setloading] = useState(false);
  const [classes, setClasses] = useState([]);
  const history = useHistory();
  useEffect(() => {
    setloading(true);
    TeacherServices.getClasses()
      .then((res) => {
        setClasses(res.data.data.classList);
      })
      .finally(() => setloading(false));
  }, []);
  console.log(history.location.pathname);
  return (
    <>
      <NavLink
        to={RouteDefinitons.ROUTE_TEACHER_DASHBOARD}
        className="d-block Monts-Bold fs-17 pa-15 ml-25"
        style={{ color: "#ffffff" }}
        activeStyle={activeNavLinkStyle}
      >
        Dashboard
      </NavLink>
      <NavLink
        to={RouteDefinitons.ROUTE_TEACHER_MANAGE_CLASS}
        className="d-block Monts-Bold fs-17 pa-15 ml-25"
        style={{ color: "#ffffff" }}
        activeStyle={activeNavLinkStyle}
      >
        Manage Classes
      </NavLink>
      {matchPath(history.location.pathname, {
        path: RouteDefinitons.ROUTE_TEACHER_MANAGE_CLASS,
      }) &&
        classes.map((cl) => (
          <NavLink
            activeStyle={activeNavLinkStyle}
            key={cl.class_id}
            to={RouteDefinitons.ROUTE_TEACHER_CLASS_DETAILS.replace(
              ":id",
              cl.class_id
            )}
            className="d-block Monts-Bold fs-14 pa-10 ml-45 mt-10"
            style={{ color: "#ffffff" }}
          >
            {cl.class_name}
          </NavLink>
        ))}

      <NavLink
        to={RouteDefinitons.ROUTE_STUDENT_LIST}
        isActive={() =>
          matchPath(history.location.pathname, {
            path: RouteDefinitons.ROUTE_STUDENT_LIST,
          })
        }
        className="d-block Monts-Bold fs-17 pa-15 ml-25"
        style={{ color: "#ffffff" }}
        activeStyle={activeNavLinkStyle}
      >
        Class Practice
      </NavLink>
      {matchPath(history.location.pathname, {
        path: RouteDefinitons.ROUTE_STUDENT_LIST,
      }) &&
        classes.map((cl) => (
          <NavLink
            activeStyle={activeNavLinkStyle}
            key={cl.class_id}
            to={RouteDefinitons.ROUTE_STUDENT_PRACTICE.replace(
              ":id",
              cl.class_id
            )}
            className="d-block Monts-Bold fs-14 pa-10 ml-45 mt-10"
            style={{ color: "#ffffff" }}
          >
            {cl.class_name}
          </NavLink>
        ))}
      <NavLink
        to={RouteDefinitons.ROUTE_TEACHER_ANSWER_KEYS}
        className="d-block Monts-Bold fs-17 pa-15 ml-25"
        style={{ color: "#ffffff" }}
        activeStyle={activeNavLinkStyle}
      >
        Answer Keys
      </NavLink>
    </>
  );
};
