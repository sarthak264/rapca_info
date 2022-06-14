import React from "react";
import { Form, Input, Select, message } from "antd";
import Button from "../../components/common/Button/Button";
import LandingPageWrapper from "./CreateClass";
import { useEffect } from "react";
import TeacherServices from "../../api/TeacherServices";
import { useState } from "react";

function CreateClass() {
  const [data, setData] = useState({ grade: [], subject: [], stream: [] });
  const { Option } = Select;
  useEffect(() => {
    TeacherServices.getSyllabus().then((res) => {
      let obj = {
        grade: [],
        subject: [],
        stream: [],
      };
      const data = res.data.data.syllabusList;
      for (let i = 0; i < data.length; i++) {
        obj.grade.push(data[i].grade);
        obj.subject.push(data[i].subject);
        obj.stream.push(data[i].stream);
      }
      obj.grade = [...new Set(obj.grade)];
      obj.subject = [...new Set(obj.subject)];
      obj.stream = [...new Set(obj.stream)];
      setData(obj);
    });
  }, []);

  const onFinish = (values) => {
    const params = {
      class_name: values.classname,
      description: values.description,
      class_grade: values.grade,
      class_subject: values.subject,
      class_stream: values.stream,
    };
    console.log(params);

    TeacherServices.createClass(params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        // props.onClick();
      }
    });
  };

  return (
    <LandingPageWrapper>
      <Form
        scrollToFirstError
        requiredMark="optional"
        initialValues={{ remember: true }}
        layout="horizontal"
        onFinish={onFinish}
      >
        <Form.Item
          name="classname"
          label="CLASSNAME"
          rules={[
            {
              required: true,
              message: "Please input class name!",
            },
          ]}
        >
          <Input placeholder="" size="large" />
        </Form.Item>
        <Form.Item
          name="description"
          label="DESCRIPTION"
          rules={[
            {
              required: true,
              message: "Please input description!",
            },
          ]}
        >
          <Input placeholder="" size="large" />
        </Form.Item>
        <Form.Item
          name="grade"
          label="GRADE"
          rules={[
            {
              required: true,
              message: "Please input grade!",
            },
          ]}
        >
          <Select>
            {data.grade.map((item, id) => {
              return <Option value={item}>{item}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="subject"
          label="SUBJECT"
          rules={[
            {
              required: true,
              message: "Please input subject!",
            },
          ]}
        >
          <Select>
            {data.subject.map((item, id) => {
              return <Option value={item}>{item}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="stream"
          label="STREAM"
          rules={[
            {
              required: true,
              message: "Please input stream!",
            },
          ]}
        >
          <Select>
            {data.stream.map((item, id) => {
              return <Option value={item}>{item}</Option>;
            })}
          </Select>
        </Form.Item>
        <div className="text-center">
          <Button text="CREATE" width="140"></Button>
        </div>
      </Form>
    </LandingPageWrapper>
  );
}

export default CreateClass;
