import React from "react";
import DashboardLayout from "../components/DashboardLayout/DashboardLayout";
import SubmitAnswer from "views/SubmitAnswer/SubmitAnswer";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RouteDefinitons } from "./RouteDefinitions";

export default function ProtectedRoutes() {
  const isLogin = useSelector((state) => state.auth.isLogin);

  const custonRoutes = [
    {
      component: DashboardLayout,
      path: RouteDefinitons.ROUTE_TEACHER_DASHBOARD,
      exact: true,
    },
    {
      component: DashboardLayout,
      path: RouteDefinitons.ROUTE_TEACHER_CREATE_CLASS,
      exact: true,
    },
    {
      component: DashboardLayout,
      path: RouteDefinitons.ROUTE_EVALUATOR_DASHBOARD,
      exact: true,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_DASHBOARD,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_AWARDS,
    },
    {
      component: SubmitAnswer,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_SUBMIT_ANSWER,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_PRACTICE_DASHBOARD,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_PRACTICE_LIST,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_REVISE,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_CREATE_MISSION,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_CREATE_UNIT,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_COMPLETED_MISSIONS,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_CURRENT_MISSIONS,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_PRACTICE,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_LIST,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_STUDENT_PRACTICE_DETAILED_REPORT,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_TEACHER_ANSWER_KEYS,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_TEACHER_SUMMARY_REPORT,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_TEACHER_MANAGE_CLASS,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_TEACHER_CLASS_DETAILS,
    },
    {
      component: DashboardLayout,
      exact: true,
      path: RouteDefinitons.ROUTE_TEACHER_ACCEPT_INVITE,
    },
  ];

  return (
    <>
      {isLogin ? (
        <>
          {custonRoutes.map((route, i) => (
            <Route {...route} key={i} />
          ))}
          <Route exact path="/faq" component={DashboardLayout} />
          <Route exact path="/help" component={DashboardLayout} />
          <Route exact path="/privacy-policy" component={DashboardLayout} />
          <Route exact path="/terms" component={DashboardLayout} />
          <Route exact path="/under-evaluation" component={DashboardLayout} />
          <Route exact path="/my-earning" component={DashboardLayout} />
          <Route exact path="/subscription" component={DashboardLayout} />
          <Route exact path="/edit-profile" component={DashboardLayout} />
          <Route exact path="/assignment-details" component={DashboardLayout} />
          <Route exact path="/awards" component={DashboardLayout} />
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </>
  );
}
