import React, { useEffect, useState } from "react";
import BasicLoginWrapper from "./BasicLogin.style";
import loginImage from "../../assets/images/loginImage.svg";
import signupImage from "../../assets/images/signupImage.svg";
import { withRouter } from "react-router-dom";
import LoginIcon from "../../assets/images/loginIcon.png";
import { Divider, Tabs, Form, Input, message, Select } from "antd";
import Button from ".././common/Button/Button";
import AuthServices from "api/AuthServices";
import { useDispatch } from "react-redux";
import AuthActions from "redux/auth/actions";
import { auth } from "firebase.js";
import firebase from "firebase/app";
import BasicForgotPassword from "components/BasicForgotPassword/BasicForgotPassword";
import { useMediaQuery } from "react-responsive";
import { RouteDefinitons } from "routes/RouteDefinitions";
import EvaluatorScreen from "./components/EvaluatorScreen";
import TeacherScreen from "./components/TeacherScreen";
import StudentScreen from "./components/StudentScreen";
const { login, userData } = AuthActions;

const { TabPane } = Tabs;

const { Option } = Select;

function BasicLogin(props) {
  const path = props.location.pathname;
  const dispatch = useDispatch();
  const [confirmResult, setConfirmResult] = useState(undefined);
  const [otp, setOtp] = useState(false);
  const [userId, setUserId] = useState(null);
  const [phoneNo, setPhoneNo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [prefix, setPrefix] = useState("91");
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });

  useEffect(() => {
    if (
      path === "/login" ||
      path === "/signup" ||
      path === RouteDefinitons.ROUTE_TEACHER_SIGNUP ||
      path === RouteDefinitons.ROUTE_TEACHER_LOGIN
    ) {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function (response) {
            // handleSignup();
          },
        }
      );
    }
  }, []);

  const onFinish = (values, type) => {
    const params = {
      phone_number: values.phone,
      password: values.password,
      country_code: values.prefix,
      user_type: type,
    };
    setPhoneNo(values.phone);
    setPrefix(values.prefix);
    AuthServices.login(params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        dispatch(
          login({
            token: res.data.data.token,
            userId: res.data.data.user_id,
          })
        );
        if (!res.data.data.is_phone_verified) {
          setLoading(true);
          const appVerifier = window.recaptchaVerifier;
          setUserId(res.data.data.user_id);
          auth
            .signInWithPhoneNumber(
              `+${values.prefix}${values.phone}`,
              appVerifier
            )
            .then((confirmationResult) => {
              message.success("OTP has been sent on your number");
              setConfirmResult(confirmationResult);
              setLoading(true);
              setOtp(true);
              // setTimeout(() => {
              //   props.history.push("/otp", confirmResult && confirmResult);
              // }, 2000);
            })
            .catch((error) => {
              message.error("Invalid Phone number");
              setLoading(false);
            });
        } else if (!res.data.data.is_profile_created) {
          message.success("your profile creation is pending");
          props.history.push("/profile");
        } else {
          AuthServices.view().then((res) => {
            dispatch(
              userData({
                firstName: res.data.data.first_name,
                lastName: res.data.data.last_name,
                image: res.data.data.profile_photo,
                data: res.data.data,
              })
            );
          });
          message.success(res.data.message);
          switch (res.data.data.user_type) {
            case "evaluator":
              props.history.push(RouteDefinitons.ROUTE_EVALUATOR_DASHBOARD);
              break;
            case "teacher":
              props.history.push(RouteDefinitons.ROUTE_TEACHER_DASHBOARD);
              break;
            case "student":
              props.history.push(RouteDefinitons.ROUTE_STUDENT_DASHBOARD);
              break;
            default:
              props.history.push("/subscription");
              break;
          }
        }
      }
    });
  };

  const onFinishSignUp = (values) => {
    const params = {
      first_name: values.firstname,
      last_name: values.lastname,
      email: values.email,
      password: values.password,
      country_code: values.prefix,
      phone_number: values.phone,
      user_type:
        path === RouteDefinitons.ROUTE_TEACHER_SIGNUP
          ? "teacher"
          : RouteDefinitons.ROUTE_STUDENT_SIGNUP
          ? "student"
          : "evaluator",
    };

    setPhoneNo(values.phone);
    setPrefix(values.prefix);
    const appVerifier = window.recaptchaVerifier;
    setLoading(true);
    AuthServices.signup(params).then((res) => {
      if (res.data.status === 0) {
        setLoading(false);
        message.error(res.data.message);
      } else {
        if (res.data.data.is_phone_verified) {
        } else {
          setUserId(res.data.data.user_id);
          auth
            .signInWithPhoneNumber(
              `+${values.prefix}${values.phone}`,
              appVerifier
            )
            .then((confirmationResult) => {
              message.success("OTP has been sent on your number");
              setConfirmResult(confirmationResult);
              setLoading(true);
              setOtp(true);
              // setTimeout(() => {
              //   props.history.push("/otp", confirmResult && confirmResult);
              // }, 2000);
            })
            .catch((error) => {
              message.error("Invalid Phone number");
              setLoading(false);
            });
        }
        dispatch(
          login({
            token: res.data.data.token,
            userId: res.data.data.user_id,
          })
        );
      }
    });
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70, fontFamily: "Monts-SemiBold" }}>
        <Option className="Monts-SemiBold" value="91">
          +91
        </Option>
        <Option className="Monts-SemiBold" value="1">
          +1
        </Option>
      </Select>
      {/* <div value="91" className="Monts-SemiBold">
        +91
      </div> */}
    </Form.Item>
  );

  function callback(key) {
    if (key === "2") {
      props.history.push("/login");
    } else {
      props.history.push("/signup");
    }
  }

  auth.onAuthStateChanged(function (user) {
    if (user) {
      console.log("USER LOGGED IN");
    } else {
      // No user is signed in.
      console.log("USER NOT LOGGED IN");
    }
  });

  return !otp ? (
    <BasicLoginWrapper>
      <div className="flex-100" style={{ backgroundColor: "#213861" }}>
        <div className={Tablet ? "divider-1-100-t" : "divider-1-100"}>
          {path === "/login" ||
          path === "/student-login" ||
          path === RouteDefinitons.ROUTE_TEACHER_LOGIN ||
          path === RouteDefinitons.ROUTE_STUDENT_LOGIN ? (
            <img src={loginImage} alt="loading..." height="567" />
          ) : (
            <img
              src={signupImage}
              alt="loading..."
              height="567"
              style={{ position: "fixed" }}
            />
          )}
        </div>
        <div className={Tablet ? "divider-2-t" : "divider-2"}>
          <div>
            <img alt="loading..." src={LoginIcon} height="50" />

            {path === "/login" || path === "/signup" ? (
              <EvaluatorScreen
                onFinishSignUp={onFinishSignUp}
                onFinish={onFinish}
                loading={loading}
                prefixSelector={prefixSelector}
                prefix={prefix}
              />
            ) : path === RouteDefinitons.ROUTE_TEACHER_LOGIN ||
              path === RouteDefinitons.ROUTE_TEACHER_SIGNUP ? (
              <TeacherScreen
                onFinishSignUp={onFinishSignUp}
                onFinish={onFinish}
                loading={loading}
                prefixSelector={prefixSelector}
                prefix={prefix}
              />
            ) : path === RouteDefinitons.ROUTE_STUDENT_LOGIN ||
              path === RouteDefinitons.ROUTE_STUDENT_SIGNUP ? (
              <StudentScreen
                onFinishSignUp={onFinishSignUp}
                onFinish={onFinish}
                loading={loading}
                prefixSelector={prefixSelector}
                prefix={prefix}
              />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </BasicLoginWrapper>
  ) : (
    <BasicForgotPassword
      confirmationResult={confirmResult}
      otp="/otp"
      userId={userId}
      prefix={prefix}
      phone={phoneNo}
    />
  );
}

export default withRouter(BasicLogin);
