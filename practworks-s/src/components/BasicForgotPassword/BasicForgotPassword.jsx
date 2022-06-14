import React, { useState, useEffect } from "react";
import BasicForgotPasswordWrapper from "./BasicForgotPassword.style";
import forgotPasswordImage from "../../assets/images/forgotpasswordimage.svg";
import profileImage from "../../assets/images/profileimage.svg";
import { withRouter } from "react-router-dom";
import { Divider, Form, Input, message, Select, Tag } from "antd";
import Button from ".././common/Button/Button";
import userImage from "../../assets/images/userImage.svg";
import { Option } from "antd/lib/mentions";
import Footer from "../common/Footer/Footer";
import { auth } from "firebase.js";
import firebase from "firebase/app";
import AuthServices from "api/AuthServices";
import CommonServices from "api/CommonServices";
import ForgotPasswordForm from "views/ForgotPasswordForm/ForgotPasswordForm";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AuthActions from "redux/auth/actions";
const { userData } = AuthActions;

function BasicForgotPassword(props) {
  const [imageUrl, setimageUrl] = useState("");
  const [confirmResult, setConfirmResult] = useState(undefined);
  const [uploadImage, setUploadImage] = useState(null);
  const [state, setState] = useState(null);
  const [stream, setStream] = useState(null);
  const [subject, setSubject] = useState(null);
  const [phone, setPhone] = useState(null);
  const [fp, setFp] = useState(false);
  const [prefix, setPrefix] = useState(null);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.userId);

  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });

  // const uploadButton = (
  //   <div>
  //     {loading ? <LoadingOutlined /> : <PlusOutlined />}
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );
  const path = props.location.pathname;

  useEffect(() => {
    if (path === "/profile") {
      CommonServices.dropdown().then((res) => {
        setState(res.data.data.state);
        setStream(res.data.data.stream);
        setSubject(res.data.data.subject);
      });
    }

    if (props.otp === "/otp") {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function (response) {},
        }
      );
    }
  }, []);

  useEffect(() => {
    if (path === "/otp") {
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: function (response) {},
        }
      );
    }
  }, [fp]);

  const getCode = (code, phone, fpcheck, prefix) => {
    setConfirmResult(code);
    setPhone(phone);
    setFp(fpcheck);
    setPrefix(prefix);
  };

  // function beforeUpload(file) {
  //   const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  //   if (!isJpgOrPng) {
  //     message.error("You can only upload JPG/PNG file!");
  //   }
  //   const isLt2M = file.size / 1024 / 1024 < 2;
  //   if (!isLt2M) {
  //     message.error("Image must smaller than 2MB!");
  //   }
  //   return isJpgOrPng && isLt2M;
  // }

  const onFinishOtp = (values) => {
    const OTP =
      values.Otp1 +
      values.Otp2 +
      values.Otp3 +
      values.Otp4 +
      values.Otp5 +
      values.Otp6;

    setloading(true);
    if (confirmResult) {
      confirmResult
        .confirm(OTP)
        .then((user) => {
          if (auth.currentUser.uid) {
            if (fp) {
              setloading(false);
              setTimeout(() => {
                props.history.push("/reset-password");
              }, 2000);
            } else {
              AuthServices.phoneVerify(props.userId).then((result1) => {
                if (result1.data.success === 0) {
                  setloading(false);
                  message.error(result1.data.message);
                } else {
                  setloading(false);
                  message.success(result1.data.message);
                  setTimeout(() => {
                    props.history.push("/profile");
                  }, 2000);
                }
              });
            }
          }
        })
        .catch((error) => {
          if (error === 400) {
            setloading(false);
            message.error(error.message);
          }
          setloading(false);
          message.error("Wrong Otp inserted");
        });
    } else if (props.confirmationResult) {
      props.confirmationResult
        .confirm(OTP)
        .then((user) => {
          if (auth.currentUser.uid) {
            AuthServices.phoneVerify(props.userId).then((result1) => {
              if (result1.data.success === 0) {
                setloading(false);
                message.error(result1.data.message);
              } else {
                setloading(false);
                message.success(result1.data.message);
                setTimeout(() => {
                  props.history.push("/profile");
                }, 2000);
              }
            });
          }
        })
        .catch((error) => {
          if (error === 400) {
            setloading(false);
            message.error(error.message);
          }
          setloading(false);
          message.error(error.message);
        });
    } else {
    }
  };

  const onFinishProfile = (values) => {
    const Data = {
      image: imageUrl,
      email: values.email,
      state_id: values.state,
      city: values.city,
      // stream_id: values.stream,
      user_subject: JSON.stringify(values.subjects),
      highest_qualification: values.Qualification,
    };

    setloading(true);
    const formData = new FormData();
    for (let key in Data) {
      formData.append(key, Data[key]);
    }
    AuthServices.updateProfile(userId, formData).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
        setloading(false);
      } else {
        // AuthServices.view().then((res) => {
        //   dispatch(
        //     userData({
        //       firstName: res.data.data.first_name,
        //       lastName: res.data.data.last_name,
        //       image: res.data.data.profile_photo,
        //       data: res.data.data,
        //     })
        //   );
        // });
        message.success(
          "your profile is sended for verification. please wait for sometime admin will contact you "
        );
        props.history.push("/login");
        setloading(false);
      }
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
          form.setFieldsValue({
            [Image]: fileObj,
          });
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

  const resendHandler = (e) => {
    // e.preventDefault();
    const appVerifier = window.recaptchaVerifier;
    auth
      .signInWithPhoneNumber(
        `+${props.prefix ? props.prefix : prefix}${
          props.phone ? props.phone : phone
        }`,
        appVerifier
      )
      .then((confirmationResult) => {
        setConfirmResult(confirmationResult);
        message.success("OTP has been sent on your number");
      })
      .catch((error) => {
        message.error("Invalid Phone number");
      });
  };

  const Otp = [1, 2, 3, 4, 5, 6];

  const [form] = Form.useForm();

  return (
    <BasicForgotPasswordWrapper>
      <div className="flex-100" style={{ backgroundColor: "#213861" }}>
        <div
          className={
            path === "/forgot-password" ||
            props.otp === "/otp" ||
            path === "/otp"
              ? Tablet
                ? "divider-1-100-t"
                : "divider-1-100"
              : "divider-1"
          }
        >
          {path === "/forgot-password" ||
          props.otp === "/otp" ||
          path === "/otp" ? (
            <img
              src={forgotPasswordImage}
              alt="loading..."
              width="567"
              height="567"
            />
          ) : (
            <img
              src={profileImage}
              alt="loading..."
              height="567"
              style={{ position: "fixed" }}
            />
          )}
        </div>
        <div className={Tablet ? "divider-2-t" : "divider-2"}>
          <div className={Tablet ? "plr-50" : ""}>
            {path === "/forgot-password" ||
            props.otp === "/otp" ||
            path === "/otp" ? (
              // forgot password & otp screen
              <div>
                <div className="fs-24 Monts-Bold header-login">
                  {path === "/forgot-password"
                    ? "Forgot Password"
                    : "Verification"}
                </div>
                <div
                  className="Monts-Medium fs-16"
                  style={{ color: "#BABEC3" }}
                >
                  {path === "/forgot-password" ? (
                    <>
                      Please enter your registered mobile number,
                      <br /> we will send you otp on your registered <br />
                      mobile number.
                    </>
                  ) : (
                    <>
                      Please enter your verification code to <br />
                      Verify your account
                    </>
                  )}
                </div>
                {path === "/forgot-password" ? (
                  <div>
                    <ForgotPasswordForm
                      getCode={(code, phone, fpcheck, prefix) =>
                        getCode(code, phone, fpcheck, prefix)
                      }
                    />
                  </div>
                ) : (
                  <div className="pt-40">
                    <Form
                      scrollToFirstError
                      requiredMark="optional"
                      initialValues={{ remember: true }}
                      onFinish={onFinishOtp}
                      layout="vertical"
                    >
                      <Form.Item
                        name="Otp"
                        label="Verification Code"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <div className="flex">
                          {Otp.map((res) => {
                            return (
                              <Form.Item name={`Otp${res}`}>
                                <Input
                                  size="large"
                                  className="otp-input"
                                  maxLength="1"
                                />
                              </Form.Item>
                            );
                          })}
                        </div>
                      </Form.Item>
                      <div>
                        <Button text="Submit" loading={loading}></Button>
                      </div>
                    </Form>
                    <div className="text-center fs-14 pt-30 Monts-Medium">
                      Didn’t receive a code?{" "}
                      <a
                        id="recaptcha-container"
                        onClick={(e) => {
                          resendHandler(e);
                        }}
                        className="text-center fs-14 pt-10 Monts-Bold"
                        style={{ color: "#4d6898" }}
                      >
                        Resend
                      </a>{" "}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <div className="fs-24 Monts-Bold header-login pt-20">
                  Profile Setup
                </div>
                <div
                  className="Monts-Medium fs-16"
                  style={{ color: "#BABEC3" }}
                >
                  Neque porro quisquam est qui dolorem ipsum quia dolor sit
                  amet, consectetur, adipisci velit.
                </div>

                <Divider />
                {/* Profile Form */}
                <Form
                  scrollToFirstError
                  requiredMark="optional"
                  form={form}
                  initialValues={{ remember: true }}
                  onFinish={onFinishProfile}
                  onFieldsChange={(fields) => {}}
                  layout="vertical"
                >
                  <Form.Item
                    name="Image"
                    rules={[
                      {
                        required: true,
                        message: "Please set your profile image!",
                      },
                    ]}
                  >
                    {/* <div
                      name="avatar"
                      listType="picture"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      // beforeUpload={beforeUpload}
                      onChange={handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%", height: "75px" }}
                        />
                      ) : (
                        <div>
                          <img src={userImage} alt="avatar" height="75px" />{" "}
                          &nbsp;
                          <span
                            className="Monts-Medium fs-16"
                            style={{ color: "#BABEC3" }}
                          >
                            Add Profile Picture
                          </span>
                        </div>
                      )}
                    </div> */}
                    <div>
                      <label>
                        <input
                          type="file"
                          style={{ display: "none" }}
                          accept="png/jpg"
                          onChange={handleImage}
                        />
                        <img
                          src={uploadImage ? uploadImage : userImage}
                          alt="avatar"
                          height="75"
                          width="75"
                          style={{ borderRadius: "50%" }}
                        />
                      </label>
                      &nbsp; &nbsp;
                      {uploadImage ? (
                        ""
                      ) : (
                        <span
                          className="Monts-Medium fs-16"
                          style={{ color: "#BABEC3" }}
                        >
                          Add Profile Picture
                        </span>
                      )}
                    </div>
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
                    <Input placeholder="Email Address" size="large" />
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
                      style={{ fontFamily: "Montserrat-SemiBold !important" }}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                    >
                      {/* <Option value="1">Gujarat</Option>
                      <Option value="2">Maharastra</Option> */}
                      {state &&
                        state.map((state) => {
                          return (
                            <Option value={state.state_id}>{state.name}</Option>
                          );
                        })}
                    </Select>
                  </Form.Item>
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

                  {/* <Form.Item
                    name="stream"
                    label="Stream"
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
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
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
                            <Option value={stream.stream_id}>
                              {stream.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item> */}
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
                            <Option value={subject.subject_id}>
                              {subject.name}
                            </Option>
                          );
                        })}
                    </Select>
                  </Form.Item>

                  <div className="pt-20">
                    <Button text="Submit" loading={loading}></Button>
                  </div>
                </Form>
              </div>
            )}
          </div>
          {/* footer */}
          <Footer width={Tablet ? 100 : 50} />
        </div>
      </div>
    </BasicForgotPasswordWrapper>
  );
}

export default withRouter(BasicForgotPassword);
