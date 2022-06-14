import { Divider, Input, Form, Select, Tag, message } from "antd";
import { Option } from "antd/lib/mentions";
import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button/Button";
import EditProfileWrapper from "./EditProfile.style";
// import userImage from "../../assets/images/userImage.svg";
import EditImage from "../../assets/images/EditImage.svg";
import CommonServices from "api/CommonServices";
import AuthServices from "api/AuthServices";
import AuthActions from "redux/auth/actions";
import { useDispatch } from "react-redux";
const { userData } = AuthActions;

export default function EditProfile() {
  const [uploadImage, setUploadImage] = useState(null);
  const [imageUrl, setimageUrl] = useState("");
  const [state, setState] = useState(null);
  const [stream, setStream] = useState(null);
  const [subject, setSubject] = useState(null);
  const [userDatas, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState(null);

  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    CommonServices.dropdown().then((res) => {
      setState(res.data.data.state);
      setStream(res.data.data.stream);
      setSubject(res.data.data.subject);
      setGrade(res.data.data.grade);
    });
    AuthServices.view().then((res) => {
      setUserData(res.data.data);
      form.setFieldsValue({ ["image"]: res.data.data.profile_photo });
      form.setFieldsValue({ ["firstname"]: res.data.data.first_name });
      form.setFieldsValue({ ["lastname"]: res.data.data.last_name });
      form.setFieldsValue({ ["email"]: res.data.data.email });
      form.setFieldsValue({ ["phone"]: res.data.data.phone_number });
      form.setFieldsValue({ ["city"]: res.data.data.city });
      form.setFieldsValue({ ["state"]: res.data.data.state.state_id });
      form.setFieldsValue({ ["school_name"]: res.data.data.school_name });
      form.setFieldsValue({ ["grade"]: res.data.data.grade.grade_id });
      form.setFieldsValue({ ["stream"]: res.data.data.stream.stream_id });

      form.setFieldsValue({
        ["Qualification"]: res.data.data.highest_qualification,
      });
      form.setFieldsValue({
        ["subjects"]: res.data.data.subjects[0].subject.subject_id,
      });
    });
  }, []);

  const onFinish = (values) => {
    const params = {
      first_name: values.firstname,
      last_name: values.lastname,
      image: imageUrl,
      state_id: values.state,
      city: values.city,
      school_name: values.school_name,
      grade_id: values.grade,
      stream_id: values.stream,
      user_subject: JSON.stringify(values.subjects),
      highest_qualification: values.Qualification,
    };
    if (userDatas && userDatas.user_type === "student") {
      delete params.user_subject;
      delete params.highest_qualification;
    }

    const formData = new FormData();
    for (let key in params) {
      formData.append(key, params[key]);
    }
    setLoading(true);

    AuthServices.updateProfile(userDatas.user_id, formData)
      .then((res) => {
        if (res.data.status === 0) {
          message.error(res.data.message);
          setLoading(false);
        } else {
          message.success(res.data.message);
          setLoading(false);
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
        }
      })
      .catch((error) => {
        message.error(error.response);
        setLoading(false);
      });
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      let fileObj = e.target.files[0];
      // setImageObj(fileObj);
      if (fileObj) {
        const img = new Image();

        img.src = window.URL.createObjectURL(fileObj);

        img.onload = function () {
          // form.setFieldsValue("Image", URL.createObjectURL(fileObj));

          setimageUrl(fileObj);
          setUploadImage(URL.createObjectURL(fileObj));
        };
      } else {
        //No file was input or browser doesn't support client side reading
        // form.submit();
      }
    } else {
      setUploadImage(null);
    }
  };

  function tagRender(props) {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color="#658bb1"
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  }
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      {/* <Select style={{ width: 70 }}>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select> */}
      <div value="91" className="Monts-SemiBold">
        +91
      </div>
    </Form.Item>
  );

  return (
    <EditProfileWrapper>
      <div className="Monts-Bold fs-24 dark-blue ">Edit Profile</div>
      <Form
        layout="vertical"
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          // image: userData ? userData.profile_photo : "",
          prefix: "+91",
          // firstname: userData ? userData.first_name : "",
          // phone: userData ? userData.phone_number : "",
          // city: userData ? userData.city : "",
          // state: userData ? userData.state_id : "",
          // stream: userData ? userData.stream_id : "",
          // Qualification: userData ? userData.highest_qualification : "",
        }}
        scrollToFirstError
        requiredMark="optional"
        className="grid"
      >
        <div>
          <div className="Monts-Bold fs-20 mb-20">Personal Information</div>
          <Form.Item
            name="image"
            rules={[
              {
                required: true,
                message: "Please add your image!",
              },
            ]}
          >
            <div className="mb-20 position-relative">
              <img
                src={
                  uploadImage
                    ? uploadImage
                    : userDatas && userDatas.profile_photo
                }
                alt="loading..."
                height="103"
                style={{ borderRadius: "50%" }}
              />
              <label>
                <input
                  type="file"
                  style={{ display: "none" }}
                  accept="png/jpg"
                  onChange={handleImage}
                />
                <img
                  src={EditImage}
                  alt="loading..."
                  height="32"
                  className="position-absolute"
                  style={{ bottom: 0, left: "70px" }}
                ></img>
              </label>
            </div>
          </Form.Item>
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
            name="email"
            label="Email Address"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input placeholder="Email Address" disabled size="large" />
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
              addonBefore={prefixSelector}
              style={{ width: "100%" }}
              size="large"
              disabled
              placeholder="Phone Number"
            />
          </Form.Item>
        </div>

        <div>
          <Divider type="vertical" style={{ height: "100%" }} />
        </div>
        <div>
          <div className="Monts-Bold fs-20 mb-20">Other Informations</div>

          {userDatas && userDatas.user_type === "student" && (
            <Form.Item
              name="school_name"
              label="Student's school name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="School name" size="large" />
            </Form.Item>
          )}

          {userDatas && userDatas.user_type === "student" && (
            <Form.Item
              name="grade"
              label="Select Grade"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Grade"
                size="large"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {grade &&
                  grade.map((grade) => {
                    return <Option value={grade.grade_id}>{grade.name}</Option>;
                  })}
              </Select>
            </Form.Item>
          )}
          {userDatas && userDatas.user_type === "student" && (
            <Form.Item
              name="stream"
              label="Select stream"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                showSearch
                placeholder="Stream"
                size="large"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                filterSort={(optionA, optionB) =>
                  optionA.children
                    .toLowerCase()
                    .localeCompare(optionB.children.toLowerCase())
                }
              >
                {stream &&
                  stream.map((stream) => {
                    return (
                      <Option value={stream.stream_id}>{stream.name}</Option>
                    );
                  })}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="city"
            label="Your City"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="City" size="large" />
          </Form.Item>
          <Form.Item
            name="state"
            label="Select State"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              showSearch
              placeholder="State"
              size="large"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
            >
              {state &&
                state.map((state) => {
                  return <Option value={state.state_id}>{state.name}</Option>;
                })}
            </Select>
          </Form.Item>
          {userDatas && userDatas.user_type !== "student" && (
            <Form.Item
              name="Qualification"
              label="Highest Qualification"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Your Qualification" size="large" />
            </Form.Item>
          )}
          {userDatas && userDatas.user_type !== "student" && (
            <Form.Item
              name="subjects"
              label="Subjects"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                mode="multiple"
                showArrow
                tagRender={tagRender}
                style={{ width: "100%" }}
                placeholder="Select Subjects"
              >
                {subject &&
                  subject.map((subject) => {
                    return (
                      <Option value={subject.subject_id}>{subject.name}</Option>
                    );
                  })}
              </Select>
            </Form.Item>
          )}
        </div>
      </Form>
      <div className="mt-30 text-center">
        <Button
          text={"Done"}
          width={300}
          loading={loading}
          onClick={() => {
            form.submit();
          }}
        />
      </div>
    </EditProfileWrapper>
  );
}
