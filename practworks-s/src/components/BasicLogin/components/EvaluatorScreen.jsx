import React from "react";
import { withRouter } from "react-router-dom";
import { Divider, Tabs, Form, Input } from "antd";
import Button from "../.././common/Button/Button";

const { TabPane } = Tabs;
const EvaluatorScreen = (props) => {
  const path = props.location.pathname;
  const [form] = Form.useForm();

  function callback(key) {
    if (key === "2") {
      props.history.push("/login");
    } else {
      props.history.push("/signup");
    }
  }
  return (
    <div className="pt-10">
      <Tabs
        defaultActiveKey={path === "/login" ? "2" : "1"}
        onChange={callback}
        className="fs-18 Monts-Bold"
      >
        <TabPane tab="First Time Evaluator" key="1">
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
                href="/login"
                className="text-center fs-14 pt-10 Monts-Bold"
                style={{ color: "#4d6898" }}
              >
                Login
              </a>{" "}
            </div>
          </div>
        </TabPane>
        <TabPane tab="Login" key="2">
          <div className="fs-24 Monts-Bold header-login">Welcome Back!</div>
          <div className="Monts-Medium fs-16" style={{ color: "#BABEC3" }}>
            Please sign in using your registered mobile number and the password.
          </div>

          <Divider />
          {/* Login form Es */}
          <Form
            scrollToFirstError
            requiredMark="optional"
            // initialValues={{ remember: true }}
            initialValues={{
              prefix: props.prefix,
              remember: true,
            }}
            onFinish={(values) => props.onFinish(values, "evaluator")}
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
            <div className="pb-30 flex flex-end ">
              <a
                href="/forgot-password"
                className="fs-16 Monts-Bold"
                style={{ color: "black" }}
              >
                Forgot Password
              </a>
            </div>
            <div>
              <Button
                text="Login"
                id="recaptcha-container"
                loading={props.loading}
              ></Button>
            </div>
          </Form>
          <div className="text-center fs-14 pt-10 Monts-Medium">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-center fs-14 pt-10 Monts-Bold"
              style={{ color: "#4d6898" }}
            >
              Register Now
            </a>{" "}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default withRouter(EvaluatorScreen);
