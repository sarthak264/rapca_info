import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { DashboardNavbar } from "../../components/DashboardNavbar/DashboardNavbar";
import { UserContext } from "../../context/UserContext";
import { AxiosClient } from "../../services/baseApi";
import { TutorService } from "../../services/tutor.service";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import "./LoginPage.css";
interface Props {}

export const LoginPage = (props: Props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  return (
    <div className="w-100 h-100">
      <ToastContainer />
      <DashboardNavbar />
      <div className="login-main pb-5">
        <div className="login-header">Tutor login</div>
        <Form
          className="p-3"
          onSubmit={(e: any) => {
            const toastObj = toast("Loggin in...", {
              autoClose: false,
            });
            e.preventDefault();
            TutorService.loginTutor(values)
              .then((res) => {
                const LSOject = {
                  user: "tutor",
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
                  userId: res.data.tutor._id,
                  email: res.data.tutor.email,
                  type: "tutor",
                });
                history.push(RouteDefinitions.ROUTE_DASHBOARD);
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
