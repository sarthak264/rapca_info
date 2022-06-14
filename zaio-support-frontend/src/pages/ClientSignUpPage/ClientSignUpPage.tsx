import React, { useContext, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { ClientNavbar } from "../../components/ClientNavbar/ClientNavbar";
import { UserContext } from "../../context/UserContext";
import { AxiosClient } from "../../services/baseApi";
import { ClientService } from "../../services/client.service";
import { RouteDefinitions } from "../../utils/RouteDefinitions";
import "./ClientSignUpPage.css";
interface Props {}

export const ClientSignUpPage = (props: Props) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    websiteUrl: "",
    userName: "",
    redirectUrl: "",
  });
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  return (
    <div className="w-100 h-100">
      <ToastContainer />
      <ClientNavbar />
      <div className="login-main pb-5">
        <div className="login-header">Client Signup</div>
        <Form
          className="p-3"
          onSubmit={(e: any) => {
            const toastObj = toast("Signing Up...", {
              autoClose: false,
            });
            e.preventDefault();
            console.log(values);
            ClientService.createClient(values)
              .then((res) => {
                history.push(RouteDefinitions.ROUTE_CLIENT_LOGIN);
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
            <Form.Label className="login-label">Website URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your website URl"
              value={values.websiteUrl}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, websiteUrl: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-label">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={values.userName}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, userName: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="login-label">Redirect URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your Redirect URL"
              value={values.redirectUrl}
              required
              onChange={(e) =>
                setValues((prev) => ({ ...prev, redirectUrl: e.target.value }))
              }
            />
          </Form.Group>

          <Form.Group className="mb-4">
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
            Sign Up
          </Button>
        </Form>
      </div>
    </div>
  );
};
