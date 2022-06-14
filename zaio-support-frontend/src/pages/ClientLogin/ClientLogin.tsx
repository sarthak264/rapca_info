import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { ClientNavbar } from "../../components/ClientNavbar/ClientNavbar";
import { UserContext } from "../../context/UserContext";
import { AxiosClient } from "../../services/baseApi";
import { ClientService } from "../../services/client.service";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import "./ClientLogin.css";
interface Props {}

export const ClientLogin = (props: Props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  return (
    <div className="w-100 h-100">
      <ToastContainer />
      <ClientNavbar />
      <div className="login-main pb-5">
        <div className="login-header">Client login</div>
        <Form
          className="p-3"
          onSubmit={(e: any) => {
            const toastObj = toast("Loggin in...", {
              autoClose: false,
            });
            e.preventDefault();
            ClientService.loginClient(values)
              .then((res) => {
                const LSOject = {
                  user: "client",
                  token: res.data.token,
                };

                localStorage.setItem("ZSObject", JSON.stringify(LSOject));
                AxiosClient.interceptors.request.use(
                  (config) => {
                    const token = res.data.token;
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
                setUser({
                  token: res.data.token,
                  userId: res.data.client.clientId,
                  email: res.data.client.email,
                  type: "client",
                });
                if (!res.data.client.cards.length) {
                  history.push(RouteDefinitions.ROUTE_CLIENT_PAYMENT);
                } else {
                  history.push(RouteDefinitions.ROUTE_CLIENT_DASHBOARD);
                }
              })
              .catch((err) => {
                if (
                  err.response.status === 403 ||
                  err.response.status === 401
                ) {
                  toast.update(toastObj, {
                    render: err.response.data.message,
                    autoClose: 4000,
                  });
                } else {
                  toast.update(toastObj, {
                    render: "Something went wrong",
                    autoClose: 4000,
                  });
                }
              });
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label className="login-label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={values.email}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={values.password}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};
