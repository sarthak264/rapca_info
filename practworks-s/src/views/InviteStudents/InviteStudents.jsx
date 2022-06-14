import { Input, Form, message, Tag } from "antd";
import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button/Button";
import DashboardWrapper from "./InviteStudents.style";
import TeacherServices from "api/TeacherServices";
import { useParams } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isMobilePhone from "validator/lib/isMobilePhone";

export default function InviteStudents(props) {
  const [form] = Form.useForm();
  const [list, setList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const [newSubmission, setNewSubmission] = useState(false);
  const { id } = useParams();

  const onFinish = (values) => {
    form.resetFields();
    let data = values.message.replace(/ /g, "").split(",");
    if (!list.length) {
      setTempList(data);
    } else {
      const newList = [...list, ...data];
      setTempList(newList);
    }
    validateArray();
  };

  useEffect(() => {
    validateArray();
  }, [tempList]);

  const validateArray = () => {
    // Array of indeces where string is not a number or email
    let indeces = [];
    for (let i = 0; i < tempList.length; i++) {
      if (!isEmail(tempList[i]) && !isMobilePhone(tempList[i])) {
        indeces.push(i);
      } else if (isMobilePhone(tempList[i])) {
        if (tempList[i].length != 10) {
          indeces.push(i);
        }
      }
    }
    console.log(indeces);
    console.log(`Without validation: ${tempList}`);
    let newList = [...tempList];
    let wasteArray = [];
    for (let j = indeces.length - 1; j >= 0; j--) {
      wasteArray = newList.splice(indeces[j], 1);
    }
    console.log(`After validation: ${newList}`);
    if (newList.length) {
      setList(newList);
      setNewSubmission(true);
    }
  };

  const clearList = (e) => {
    e.preventDefault();
    setList([]);
    setNewSubmission(false);
  };

  const removeItem = (e, index) => {
    e.preventDefault();
    let newArray = [...list];
    newArray.splice(index, 1);
    if (newArray.length == 0) {
      setNewSubmission(false);
    }
    setList(newArray);
  };

  const SendData = (e, list) => {
    const params = {
      user_list: list,
    };
    e.preventDefault();
    TeacherServices.inviteStudents(id, params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        form.resetFields();
        message.success(res.data.message);
        props.onClick();
      }
    });
    setList([]);
    setNewSubmission(false);
  };

  return (
    <DashboardWrapper>
      <Form
        form={form}
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
              message: "Please input student's email address!",
            },
          ]}
        >
          <Input.TextArea
            placeholder="Enter , seperated Email / Phone number"
            className="mtb-10"
            rows="6"
            allowClear
          />
        </Form.Item>
        <p className="mb-10">Enter , seperated Email / Phone number</p>
        {newSubmission && (
          <div className="pb-10" style={{ display: "flex", flexWrap: "wrap" }}>
            {list.map((item, index) => {
              return (
                <div className="mb-7" key={index}>
                  <Tag
                    color="orange"
                    style={{
                      padding: "5px 10px",
                      userSelect: "none",
                      borderRadius: "12px",
                      fontSize: 13,
                      fontFamily: "Montserrat-Bold",
                    }}
                    closable
                    onClose={(e) => {
                      removeItem(e, index);
                    }}
                  >
                    {item}
                  </Tag>
                </div>
              );
            })}
          </div>
        )}
        <div className="pt-10 flex-x" style={{ columnGap: "1rem" }}>
          <Button text="Add Students"></Button>
          {newSubmission && (
            <Button
              text="Clear All"
              onClick={(e) => {
                clearList(e);
              }}
            ></Button>
          )}
        </div>
        <div className="pt-10">
          {newSubmission && (
            <Button
              text="Send"
              onClick={(e) => {
                SendData(e, list);
              }}
            ></Button>
          )}
        </div>
      </Form>
    </DashboardWrapper>
  );
}
