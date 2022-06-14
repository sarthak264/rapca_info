import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { Redirect, Route, RouteProps, useHistory } from "react-router";
import { UserContext } from "../context/UserContext";
import { AxiosClient } from "../services/baseApi";
import { ClientService } from "../services/client.service";
import { TutorService } from "../services/tutor.service";
import { RouteDefinitions } from "../utils/RouteDefinitions";
import { ZSObjectI } from "../utils/types";

export const PrivateRoute = (props: RouteProps) => {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const ZSObj: ZSObjectI = localStorage.getItem("ZSObject")
    ? JSON.parse(localStorage.getItem("ZSObject")!)
    : null;

  console.log({ props });
  useEffect(() => {
    if (!user) {
      if (ZSObj) {
        AxiosClient.interceptors.request.use(
          (config) => {
            const token = ZSObj.token;
            if (config.headers && token) {
              config.headers["Authorization"] = "Bearer " + token;
            }
            // config.headers['Content-Type'] = 'application/json';
            return config;
          },
          (error) => {
            Promise.reject(error);
          }
        );
        if (
          props.location?.pathname.split("-")[0] === "/client" &&
          ZSObj.user === "client"
        ) {
          ClientService.authenticateUser()
            .then((res) => {
              if (res.data.client) {
                setUser({
                  email: res.data.client.email,
                  userId: res.data.client.clientId,
                  token: ZSObj.token,
                  type: "client",
                });
                if (!res.data.client.cards.length) {
                  history.push(
                    RouteDefinitions.ROUTE_CLIENT_PAYMENT +
                      history.location.search
                  );
                } else {
                  setSuccess(true);
                }
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => setLoading(false));
        } else {
          TutorService.authenticateUser()
            .then((res) => {
              if (res.data.tutor) {
                setUser({
                  email: res.data.tutor.email,
                  userId: res.data.tutor._id,
                  token: ZSObj.token,
                  type: "tutor",
                });
                setSuccess(true);
              }
            })
            .catch((err) => {
              console.log(err);
            })
            .finally(() => setLoading(false));
        }
      } else {
        setSuccess(false);
        setLoading(false);
      }
    } else {
      setSuccess(true);
      setLoading(false);
    }
  }, [user]);

  if (!success) {
    return loading ? (
      <div className="d-flex justify-content-center pt-4">
        <Spinner animation={"border"} />
      </div>
    ) : props.location?.pathname.split("-")[0] === "/client" ? (
      <Redirect to={RouteDefinitions.ROUTE_CLIENT_LOGIN} />
    ) : (
      <Redirect to={RouteDefinitions.ROUTE_LOGIN} />
    );
  }
  return <Route {...props} />;
};
