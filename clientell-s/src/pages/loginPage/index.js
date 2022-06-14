import React, { useRef, useState, useEffect } from "react";
import ReactLoader from "react-loading";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.less";
import { login } from "../../redux/authLogin";
// import {  } from "react-redux"

import loginPageDesign from "../../assets/designs/loginpage.svg";
import clientelllogin from "../../assets/clientell logo/clientelllogin.svg";
import googleLogo from "../../assets/clientell logo/google.svg";
export const Login = () => {
  const [loadingState, setLoadingState] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const onFinish = () => {
    setLoadingState((state) => !state);
    let loginData = new FormData();
    loginData.append("email", emailValue.current.value);
    loginData.append("password", passValue.current.value);
    axios
      .post("/api/user/login", loginData)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Token ${response.data.token}`;
        dispatch(login(response.data));
        if (remeberMeState.current.checked) {
          localStorage.setItem("clientellemail", emailValue.current.value);
          localStorage.setItem("clientellpassword", passValue.current.value);
        }
        setLoadingState((state) => !state);
        history.push("/dashboardview/main");
      })
      .catch((err) => {
        toast.error(err.response.data.detail || "Something went wrong");
      });
  };
  useEffect(() => {
    dispatch(login(null))
  }, [])
  const emailValue = useRef(null);
  const passValue = useRef(null);
  const remeberMeState = useRef(null);
  return (
    <div className="login">
      <div className="loginform">
        <div className="logindisplay">
          <div className="loginlogo">
            <img src={clientelllogin} alt="" />
          </div>
          <div className="loginformheader">
            <p className="header">Log in</p>
            <p>Login to your account by entering right details below</p>
          </div>
          <div className="loginform">
            <div className="emailhandle">
              <label htmlFor="emailinput" className="emaillabel">
                Email
              </label>
              <input
                ref={emailValue}
                type="email"
                name="email"
                id="emailinput"
                className="emailinput"
                defaultValue={
                  localStorage.getItem("clientellemail")
                    ? localStorage.getItem("clientellemail")
                    : ""
                }
              />
            </div>
            <div className="passhandle">
              <label htmlFor="passinput" className="passlabel">
                Password
              </label>
              <input
                ref={passValue}
                type="password"
                name="password"
                id="passinput"
                className="passinput"
                defaultValue={
                  localStorage.getItem("clientellpassword")
                    ? localStorage.getItem("clientellpassword")
                    : ""
                }
              />
            </div>
            <div className="remberForgetpass">
              <div className="rememberme">
                <input
                  type="checkbox"
                  name="rememberme"
                  id="reminput"
                  className="reminput"
                  ref={remeberMeState}
                />
                &nbsp;
                <label htmlFor="reminput">Remember me</label>
              </div>
              <div className="forgetpass">
                <p>Forgot Password?</p>
              </div>
            </div>
            <div className="loginbuttonDiv">
              <button className="loginbutton" onClick={onFinish}>
                {loadingState ? (
                  <ReactLoader
                    className="loader"
                    type="bars"
                    color="#3982f6"
                    height={667 / 10}
                    width={375 / 10}
                  />
                ) : (
                  <p>Log In</p>
                )}
              </button>
            </div>
            <div className="ordiv">
              <div className="linediv"></div>
              <p>or</p>
              <div className="linediv"></div>
            </div>
            <button className="googlelogin">
              <img src={googleLogo} alt="" />
              <p>Login with Google</p>
            </button>
          </div>
        </div>
      </div>
      <div className="logindesign">
        <div className="pagedetails">
          <div className="page">
            <p>Unlock your</p>
            <p>Revenue potential</p>
          </div>
          <div className="additionalinfo">
            <p>
              Predict your business performance, Unlock your Org’s true Revenue
              Potential, outperform your competitors who do not leverage on
              RevOps.
            </p>
          </div>
        </div>
        <div className="pageart">
          <img src={loginPageDesign} alt="" />
        </div>
      </div>
    </div>
  );
};
