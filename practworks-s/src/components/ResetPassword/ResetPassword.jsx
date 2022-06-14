import React from "react";
import BasicForgotPasswordWrapper from "./ResetPassword.style";
import forgotPasswordImage from "../../assets/images/forgotpasswordimage.svg";
import { withRouter } from "react-router-dom";
import { Form, Input, message } from "antd";
import Button from ".././common/Button/Button";
import Footer from "../common/Footer/Footer";
import AuthServices from "api/AuthServices";
import { useMediaQuery } from "react-responsive";

function ResetPassword(props) {
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });

  const onFinishFP = (values) => {
    const otp_token = sessionStorage.getItem("otp_token");
    const phone = sessionStorage.getItem("phone");

    const data = {
      otp_token: otp_token,
      phone_number: phone,
      new_password: values.confirm,
    };

    AuthServices.resetpassword(data).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        props.history.push("/login");
      }
    });
  };

  return (
    <BasicForgotPasswordWrapper>
      <div className="flex-100" style={{ backgroundColor: "#213861" }}>
        <div className={Tablet ? "divider-1-100-t" : "divider-1-100"}>
          <img
            src={forgotPasswordImage}
            alt="loading..."
            width="567"
            height="567"
          />
        </div>
        <div className={Tablet ? "divider-2-t" : "divider-2"}>
          <div className={Tablet ? "plr-50" : ""}>
            <div>
              <div className="fs-24 Monts-Bold header-login">
                Reset Password
              </div>
              <div className="Monts-Medium fs-16" style={{ color: "#BABEC3" }}>
                <>Reset Your Password , By Entering New Password</>
              </div>
              <div className="pt-40">
                <Form
                  scrollToFirstError
                  requiredMark="optional"
                  initialValues={{ remember: true }}
                  onFinish={onFinishFP}
                  layout="vertical"
                >
                  <Form.Item
                    name="password"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                    hasFeedback
                  >
                    <Input.Password placeholder="New Password" size="large" />
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
                    <Input.Password
                      size="large"
                      placeholder="Confirm Password"
                    />
                  </Form.Item>
                  <div>
                    <Button text="Submit"></Button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
          {/* footer */}
          <Footer width={Tablet ? 100 : 50} />
        </div>
      </div>
    </BasicForgotPasswordWrapper>
  );
}

export default withRouter(ResetPassword);
