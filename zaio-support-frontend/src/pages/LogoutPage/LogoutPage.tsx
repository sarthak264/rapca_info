import React, { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../../context/UserContext";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import { useHistory } from "react-router";

export const LogoutPage = () => {
  const history = useHistory();
  const query = new URLSearchParams(history.location.search);
  const meetingId = query.get("src");
  console.log(meetingId);
  const { setUser } = useContext(UserContext);
  localStorage.removeItem("ZSObject");
  setUser(null);
  if (meetingId === "user") {
    return <Redirect to={RouteDefinitions.ROUTE_LOGIN} />;
  } else if (meetingId === "client") {
    return <Redirect to={RouteDefinitions.ROUTE_CLIENT_LOGIN} />;
  }
  return <Redirect to="/" />;
};
