import { Input, Form } from "antd";
import React from "react";
import Button from "../../components/common/Button/Button";
import DashboardWrapper from "./AddRemark.style";

export default function AddRemark(props) {
  const onFinish = (values) => {
    sessionStorage.setItem("remark", values.remark);
    props.onClick();
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
          name="remark"
          rules={[
            {
              required: true,
              message: "Please input your remark!",
            },
          ]}
        >
          <Input.TextArea placeholder="Type here" rows="6" />
        </Form.Item>

        <div className="pt-20 text-center">
          <Button text="Submit" width="300"></Button>
        </div>
      </Form>
    </DashboardWrapper>
  );
}
