import React from "react";
import { Divider, Tabs, Form, Input, Select } from "antd";
import Button from "components/common/Button/Button";
import { RouteDefinitons } from "routes/RouteDefinitions";
import { withRouter } from "react-router-dom";

const StudentScreen = (props) => {
  const { TabPane } = Tabs;
  const { Option } = Select;

  const path = props.location.pathname;
  const [form] = Form.useForm();

  function callback(key) {
    if (key === "2") {
      props.history.push(RouteDefinitons.ROUTE_STUDENT_LOGIN);
    } else {
      props.history.push(RouteDefinitons.ROUTE_STUDENT_SIGNUP);
    }
  }
  return (
    <>
      <div className="pt-10">
        <Tabs
          defaultActiveKey={
            path === RouteDefinitons.ROUTE_STUDENT_LOGIN ? "2" : "1"
          }
          onChange={callback}
          className="fs-18 Monts-Bold"
        >
          <TabPane tab="First Time Student" key="1">
            {/* Sign up form */}
            <div className="fs-24 Monts-Bold header-login">Sign up</div>
            <div className="Monts-Medium fs-16" style={{ color: "#BABEC3" }}>
              Please register by providing the following details.
            </div>
            <Divider />
            <div>
              <Form
                layout="vertical"
                form={form}
                name="register"
                onFinish={props.onFinishSignUp}
                initialValues={{
                  prefix: props.prefix,
                }}
                scrollToFirstError
                requiredMark="optional"
              >
                <Form.Item
                  name="firstname"
                  label="First Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your first name!",
                    },
                  ]}
                >
                  <Input placeholder="First Name" size="large" />
                </Form.Item>

                <Form.Item
                  name="lastname"
                  label="Last Name"
                  rules={[
                    {
                      required: true,
                      message: "Please input your last name!",
                    },
                  ]}
                >
                  <Input placeholder="Last Name" size="large" />
                </Form.Item>

                <Form.Item
                  type="email"
                  name="email"
                  label="Email"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone number!",
                    },
                  ]}
                >
                  <Input
                    addonBefore={props.prefixSelector}
                    style={{ width: "100%" }}
                    size="large"
                    placeholder="Phone Number"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your password!",
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password placeholder="Password" size="large" />
                </Form.Item>

                <Form.Item
                  name="confirm"
                  label="Confirm Password"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password size="large" placeholder="Confirm Password" />
                </Form.Item>
                <div className="terms-font">
                  By Creating an account you agree{" "}
                  <a
                    href="/landing-page/terms"
                    className="text-center fs-12  Monts-SemiBold"
                    style={{ color: "#4d6898" }}
                  >
                    Our Terms
                  </a>{" "}
                  and{" "}
                  <a
                    href="/landing-page/privacy-policy"
                    className="text-center fs-12  Monts-SemiBold"
                    style={{ color: "#4d6898" }}
                  >
                    Privacy Policy
                  </a>
                  .
                </div>
                <Button
                  text="Register"
                  id="recaptcha-container"
                  loading={props.loading}
                ></Button>
              </Form>
              <div className="text-center fs-14 pt-10 Monts-Medium">
                Already have an account?{" "}
                <a
                  href={RouteDefinitons.ROUTE_STUDENT_LOGIN}
                  className="text-center fs-14 pt-10 Monts-Bold"
                  style={{ color: "#4d6898" }}
                >
                  Login
                </a>{" "}
              </div>
            </div>
          </TabPane>
          <TabPane tab="Login" key="2">
            <div>
              <div className="fs-24 Monts-Bold header-login pt-40">
                Welcome Back!
              </div>
              <div className="Monts-Medium fs-16" style={{ color: "#BABEC3" }}>
                Please sign in using your registered mobile number and the
                password.
              </div>

              <Divider />
              {/* Login form st */}
              <Form
                scrollToFirstError
                requiredMark="optional"
                initialValues={{ remember: true, prefix: props.prefix }}
                onFinish={(values) => props.onFinish(values, "student")}
                layout="vertical"
              >
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[
                    {
                      required: true,
                      message: "Please input your phone  number!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Phone Number"
                    size="large"
                    addonBefore={props.prefixSelector}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    {
                      required: true,
                      message: "Please input your Password!",
                    },
                  ]}
                >
                  <Input type="password" placeholder="Password" size="large" />
                </Form.Item>
                <div style={{ float: "right" }} className="pb-40">
                  <a
                    href="/forgot-password"
                    className="fs-16 Monts-Bold"
                    style={{ color: "black" }}
                  >
                    Forgot Password
                  </a>
                </div>
                <div>
                  <Button text="Login"></Button>
                </div>
                <div className="text-center fs-14 pt-10 Monts-Medium">
                  Don’t have an account?{" "}
                  <a
                    href={RouteDefinitons.ROUTE_STUDENT_SIGNUP}
                    className="text-center fs-14 pt-10 Monts-Bold"
                    style={{ color: "#4d6898" }}
                  >
                    Register Now
                  </a>{" "}
                </div>
              </Form>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default withRouter(StudentScreen);
