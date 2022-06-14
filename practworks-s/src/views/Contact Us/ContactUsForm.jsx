import { Input, Form, message } from "antd";
import React from "react";
import Button from "../../components/common/Button/Button";
import DashboardWrapper from "./ContactUs.style";
import AuthServices from "api/AuthServices";

export default function ContactUs(props) {
  const onFinish = (values) => {
    const params = {
      message: values.message,
    };

    AuthServices.contactus(params).then((res) => {
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
          name="message"
          rules={[
            {
              required: true,
              message: "Please input your message!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Message"
            className="mtb-10"
            rows="6"
            style={{ height: "auto" }}
          />
        </Form.Item>

        <div className="pt-10">
          <Button text="Done"></Button>
        </div>
      </Form>
    </DashboardWrapper>
  );
}
