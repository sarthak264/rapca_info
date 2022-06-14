import { Input, Form, message } from "antd";
import AuthServices from "api/AuthServices";
import React from "react";
import Button from "../../components/common/Button/Button";
import DashboardWrapper from "./ChangePasswordForm.style";

export default function ChangePasswordForm(props) {
  const onFinish = (values) => {
    const params = {
      current_password: values.oldpass,
      new_password: values.confirm,
    };

    AuthServices.changepassword(params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        props.onClick();
      }
    });
  };

  return (
    <DashboardWrapper>
      <Form
        scrollToFirstError
        requiredMark="optional"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
      >
        <Form.Item
          name="oldpass"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input placeholder="Old Password" size="large" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your New password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password placeholder="New Password" size="large" />
        </Form.Item>

        <Form.Item
          name="confirm"
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
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" placeholder="Confirm Password" />
        </Form.Item>
        <div className="pt-10">
          <Button text="Done"></Button>
        </div>
      </Form>
    </DashboardWrapper>
  );
}
