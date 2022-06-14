import React, { useState, useEffect } from "react";
import { Form, Input, message, Select } from "antd";
import Button from "components/common/Button/Button";
import AuthServices from "api/AuthServices";
import { auth } from "firebase.js";
import firebase from "firebase/app";
import { withRouter } from "react-router-dom";
import ForgotPasswordWrapper from "./ForgotPassword.style";
const { Option } = Select;

function ForgotPasswordForm(props) {
  const [loading, setloading] = useState(false);

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

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {},
      }
    );
  }, []);

  const onFinishFP = (values) => {
    const Data = {
      phone_number: values.phone,
      country_code: values.prefix,
    };
    AuthServices.forgotPassword(Data).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        setloading(true);
        const appVerifier = window.recaptchaVerifier;
        auth
          .signInWithPhoneNumber(
            `+${values.prefix}${values.phone}`,
            appVerifier
          )
          .then((confirmationResult) => {
            message.success("OTP has been sent on your number");
            setTimeout(() => {
              props.history.push("/otp", { from: "fp" });
              props.getCode(
                confirmationResult,
                values.phone,
                true,
                values.prefix
              );
            }, 2000);

            sessionStorage.setItem("otp_token", res.data.data.otp_token);
            sessionStorage.setItem("phone", values.phone);
          })
          .catch((error) => {
            setloading(false);
            message.error("Invalid Phone number");
          });
      }
    });
  };
  return (
    <ForgotPasswordWrapper className="pt-40">
      <Form
        scrollToFirstError
        requiredMark="optional"
        initialValues={{
          prefix: "91",
        }}
        onFinish={onFinishFP}
        layout="vertical"
      >
        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: "Please input your Phone No.!",
            },
          ]}
        >
          <Input
            addonBefore={prefixSelector}
            style={{ width: "100%" }}
            size="large"
            placeholder="Phone Number"
          />
        </Form.Item>
        <div>
          <Button
            text="Submit"
            id="recaptcha-container"
            loading={loading}
          ></Button>
        </div>
      </Form>
    </ForgotPasswordWrapper>
  );
}

export default withRouter(ForgotPasswordForm);
