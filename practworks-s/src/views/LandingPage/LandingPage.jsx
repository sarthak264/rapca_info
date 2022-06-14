import LandingPageWrapper from "./LandingPage.style";
import React, { useState } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import appicon from "assets/images/appicon.png";
import landingPage1 from "../../assets/images/landingPage1.png";
// import sampleVideo from "../../../assets/videos/sample.mp4";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";
import CardBox from "../../components/LandingPage/CardBox/CardBox.jsx";
import assignment from "../../assets/images/assignment.png";
import leftImage from "assets/images/LandingPage.png";
import chartImage from "assets/images/DeliberatePractice.png";
import awards from "../../assets/images/awards.png";
import evaluation from "../../assets/images/evaluation.png";
import submit from "../../assets/images/submit.png";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Menu, message as Message } from "antd";
import { withRouter } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CommomServices from "api/CommonServices";
import { videos } from "helper/constants";
import { useEffect } from "react";
import { bubble as BurgerMenu } from "react-burger-menu";
import { RouteDefinitons } from "routes/RouteDefinitions";
// import MenuIcon from "../../assets/images/menu.png" ;

const pointsList = [
  {
    message: "A message from the founder's table ",
    clicked: false,
  },
  {
    message: "Deliberate Practice  at PractWorks ",
    clicked: false,
  },
  {
    message: "I practice a lot with workbooks. Do I need PractWorks?",
    clicked: false,
  },
  {
    message:
      "I am already enrolled on other learning platforms/tuitions. Do I need PractWorks? ",
    clicked: false,
  },
  {
    message:
      "I am already doing very well at my school work. Do I need PractWorks? ",
    clicked: false,
  },
];

const menu = (
  <Menu>
    <Menu.Item key='0'>
      <a
        href={RouteDefinitons.ROUTE_STUDENT_LOGIN}
        style={{ color: "white" }}
        className='Monts-Medium'
      >
        Student
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='1'>
      <a href='/login' style={{ color: "white" }} className='Monts-Medium'>
        Evaluator
      </a>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item key='2'>
      <a
        href={RouteDefinitons.ROUTE_TEACHER_LOGIN}
        style={{ color: "white" }}
        className='Monts-Medium'
      >
        Teacher
      </a>
    </Menu.Item>
  </Menu>
);

const LandingPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [video, setVideo] = useState(0);
  const [point, setpoint] = useState(pointsList);

  const [isOpen, setOpen] = useState(false);
  const handleIsOpen = () => {
    setOpen(!isOpen);
  };

  const closeSideBar = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = {
      name,
      email,
      message,
    };

    CommomServices.contactUs(params).then((res) => {
      if (res.data.status === 0) {
        Message.error(res.data.message);
      } else {
        Message.success(res.data.message);
      }
    });
  };

  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });
  const smallTablet = useMediaQuery({
    query: "(min-width: 427px) and (max-width:990px)",
  });

  return (
    <LandingPageWrapper>
      <div>
        {/* Header */}

        <div className='fixed-header'>
          <div className='container'>
            {MobileL || smallTablet ? (
              <div
                className={MobileL ? "row vw-100 pt-10" : "row wp-100 pt-10  "}
              >
                <div className='col-5 col-md-5 col-lg-5 top'>
                  <img
                    src={appicon}
                    alt='practworks'
                    className={
                      MobileL
                        ? "icon-heightL"
                        : smallTablet
                        ? "icon-heightL"
                        : "icon-heightL"
                    }
                  />
                </div>
                <div className='col-12 col-md-12 col-lg-12 top'>
                  <BurgerMenu
                    isOpen={isOpen}
                    onOpen={handleIsOpen}
                    onClose={handleIsOpen}
                    pageWrapId={"page-wrap"}
                    outerContainerId={"outer-container"}
                  >
                    <a
                      className='menuNavLink Monts-Bold '
                      onClick={closeSideBar}
                      href='#'
                    >
                      Home
                    </a>
                    <a
                      className='menuNavLink Monts-Bold '
                      onClick={() => {
                        window.scrollTo(0, 600);
                        closeSideBar();
                      }}
                    >
                      Why?
                    </a>
                    <a
                      className='menuNavLink Monts-Bold '
                      onClick={closeSideBar}
                      href='#howItWorks'
                    >
                      How?
                    </a>
                    <a
                      className='menuNavLink Monts-Bold'
                      onClick={() => {
                        props.history.push("/landing-page/blogs");
                      }}
                    >
                      Blogs
                    </a>

                    {/* <div class="dropdown">
                    <button class="dropbtn">
                      Sign In{" "}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="chevronDown"
                      />
                    </button>
                    <div class="dropdown-content">
                      <a  className="menuNavLink" href="#">Link 1</a>
                      <a href="#">Link 2</a>
                      <a href="#">Link 3</a>
                    </div>
                  </div> */}
                    <Dropdown
                      overlay={menu}
                      trigger={["click"]}
                      arrow
                      style={{ position: "relative" }}
                      placement='bottomRight'
                      isOpen='false'
                    >
                      <a
                        className='menuNavLink Monts-Bold'
                        onClick={(e) => e.preventDefault()}
                      >
                        Sign In <DownOutlined />
                      </a>
                    </Dropdown>
                  </BurgerMenu>
                </div>
              </div>
            ) : (
              <div
                className={MobileL ? "row vw-100 pt-10" : "row wp-100 pt-10  "}
              >
                <div className='col-4 col-md-4 col-lg-4 top'>
                  <img
                    src={appicon}
                    alt='practworks'
                    className={
                      MobileL
                        ? "icon-heightL"
                        : Tablet
                        ? "icon-height-t"
                        : "icon-height"
                    }
                  />
                </div>
                <div className='col-8 col-md-8 col-lg-8 '>
                  <nav>
                    <ul className='menuList '>
                      <li className='menuListItem '>
                        <a className='menuNavLink Monts-Bold active' href='#'>
                          Home
                        </a>
                      </li>
                      <li className='menuListItem'>
                        <a
                          className='menuNavLink Monts-Bold'
                          onClick={() => {
                            window.scrollTo(0, 600);
                          }}
                        >
                          Why?
                        </a>
                      </li>
                      <li className='menuListItem'>
                        <a
                          className='menuNavLink Monts-Bold'
                          href='#howItWorks'
                        >
                          How?
                        </a>
                      </li>
                      <li className='menuListItem'>
                        <a
                          className='menuNavLink Monts-Bold'
                          onClick={() => {
                            props.history.push("/landing-page/blogs");
                          }}
                        >
                          Blogs
                        </a>
                      </li>
                      <li className='menuListItem'>
                        {/* <div class="dropdown">
                    <button class="dropbtn">
                      Sign In{" "}
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="chevronDown"
                      />
                    </button>
                    <div class="dropdown-content">
                      <a  className="menuNavLink" href="#">Link 1</a>
                      <a href="#">Link 2</a>
                      <a href="#">Link 3</a>
                    </div>
                  </div> */}
                        <Dropdown
                          overlay={menu}
                          trigger={["click"]}
                          arrow
                          style={{ position: "fixed" }}
                          placement='bottomRight'
                        >
                          <a
                            className='menuNavLink Monts-Bold'
                            onClick={(e) => e.preventDefault()}
                          >
                            Sign In <DownOutlined />
                          </a>
                        </Dropdown>

                        {/* <a className="menuNavLink" href="#"></a> */}
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
          <hr
            className={
              MobileL ? " hrBorderL flex container" : "hrBorder flex container"
            }
          />
        </div>

        <div id='page-wrap'>
          {/* Home */}
          <div className='container'>
            <div
              className={
                MobileL
                  ? "row vw-100    home"
                  : Tablet
                  ? "row wp-100  home text-center"
                  : "row wp-100  home"
              }
              id='home'
            >
              <div className='col-12 col-lg-5 col-md-12'>
                <img
                  src={leftImage}
                  alt='landingPageIcon'
                  className='left-image'
                />
              </div>
              <div
                className={
                  MobileL
                    ? "col-12 col-lg-7 col-md-12  home-right"
                    : Tablet
                    ? "col-12 col-lg-7 col-md-12  home-right-t "
                    : "col-12 col-lg-7 col-md-12  home-right"
                }
              >
                <div
                  className={
                    MobileL
                      ? "blue--text Monts-Bold fs-24 "
                      : "blue--text Monts-Bold fs-30 "
                  }
                >
                  Practice differently with PractWorks
                  <br />
                  <div
                    className={
                      MobileL ? "fs-16  Monts-Medium" : "fs-20  Monts-Medium"
                    }
                  >
                    Practice that works.
                  </div>
                </div>
                <p
                  className={
                    MobileL
                      ? "fs-14 lightBlue--text Monts-Medium  mt-10"
                      : "fs-18 lightBlue--text Monts-Medium  mt-20"
                  }
                >
                  Cultivate lifelong habits of deliberate and effective practice
                  with PractWorks. Get the App now for free.
                </p>
                <div className={MobileL ? "row vw-100" : "row wp-100"}>
                  <div className='col-12 col-md-6 col-lg-6 plr-0 text-center'>
                    <Button
                      className={
                        MobileL
                          ? "buttonL Monts-SemiBold"
                          : "button Monts-SemiBold"
                      }
                      onClick={() => {
                        window.open(
                          "https://play.google.com/store/apps/details?id=com.practworks",
                          "_blank"
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faGooglePlay} className='mr-12' />
                      Google Play
                    </Button>
                  </div>
                  <div className='col-12 col-md-6 col-lg-6 plr-0 text-center'>
                    <Button
                      className={
                        MobileL
                          ? "buttonL Monts-SemiBold"
                          : "button Monts-SemiBold"
                      }
                      onClick={() => {
                        window.open(
                          "https://apps.apple.com/us/app/PractWorks/id1562972718",
                          "_blank"
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faApple} className='mr-12' />
                      App Store
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Who choose */}
          <div className={MobileL ? "container mt-40" : "container "}>
            <div
              className={
                MobileL
                  ? "fs-24 Monts-Bold blue--text  text-center container"
                  : "fs-30 Monts-Bold blue--text  text-center container "
              }
            >
              Why PractWorks?
            </div>
            <div
              className={
                MobileL
                  ? "fs-14 mtb-15  Monts-Medium lightBlue--text  text-center container"
                  : "fs-18 mtb-30  Monts-Medium lightBlue--text  text-center container"
              }
            >
              Practice is a must for the true mastery of what is learnt. But not
              just any practice!
            </div>

            <div
              className={
                MobileL
                  ? "whoChooseL row d-flex justify-content-center align-items-center pbp-3 "
                  : smallTablet
                  ? "whoChooseL row d-flex justify-content-center align-items-center pbp-3 plp-4"
                  : "whoChoose row d-flex justify-content-center align-items-center pbp-3 plp-4"
              }
            >
              <div
                className={
                  MobileL || smallTablet
                    ? "col-md-6 col-12 col-lg-6 text-center mt-20 "
                    : "col-md-6 col-12 col-lg-6"
                }
              >
                <video
                  src={videos[video]}
                  controls='controls'
                  width={"90%"}
                  height={MobileL ? "180px" : smallTablet ? "180px" : "360px"}
                  className='video'
                />
              </div>
              <div className='col-md-6 col-12 col-lg-6 '>
                <ul
                  className={
                    MobileL
                      ? "imageUlL"
                      : smallTablet
                      ? " imageUl-t"
                      : "imageUl"
                  }
                >
                  {point.map((result, i) => {
                    return (
                      <li
                        className={
                          result.clicked
                            ? MobileL
                              ? "pointItemL-active Monts-Medium cursor-pointer"
                              : smallTablet
                              ? "pointItem-t-active  Monts-Medium cursor-pointer"
                              : "pointItem-active Monts-Medium cursor-pointer"
                            : MobileL
                            ? "pointItemL Monts-Medium cursor-pointer"
                            : smallTablet
                            ? "pointItem-t Monts-Medium cursor-pointer"
                            : "pointItem Monts-Medium cursor-pointer"
                        }
                        onClick={() => {
                          const points = point;
                          const Data = points.map((res, index) => {
                            if (i === index) {
                              res.clicked = true;
                            } else {
                              res.clicked = false;
                            }
                            return res;
                          });
                          setpoint([...Data]);
                          setVideo(i);
                        }}
                      >
                        {result.message}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div
              className={
                MobileL
                  ? "fs-14 mtb-15  Monts-Medium lightBlue--text  text-center container"
                  : "fs-18 mtb-30  Monts-Medium lightBlue--text  text-center container"
              }
            >
              Deliberate and Effective Practice maximizes real-life skills
              development and retention.
            </div>
            <div className=' flex justify-content-center'>
              <img
                src={chartImage}
                alt='loading...'
                height={MobileL ? "132px" : smallTablet ? "200px" : "400px"}
                width={"90%"}
              />
            </div>
            <div
              className={
                MobileL
                  ? "fs-14 mtb-15  Monts-Medium lightBlue--text  text-center container"
                  : "fs-18 mtb-30  Monts-Medium lightBlue--text  text-center container"
              }
            >
              Deliberate and effective practice, along with detailed,
              insightful, step by-step feedback from teachers, is at the heart
              of PractWorks.
            </div>
            <div
              className={
                MobileL
                  ? "fs-14 mtb-15  Monts-Medium lightBlue--text  text-center container"
                  : "fs-18 mtb-30  Monts-Medium lightBlue--text  text-center container"
              }
            >
              Our specific goal is to improve your performance to the fullest in
              the most optimal way with our research-based, adaptive AI
              technology.
            </div>
          </div>

          {/* How It Works */}
          <div id='howItWorks' className='curvedDiv'>
            <div>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
                <path
                  fill='#f2f4f8'
                  fill-opacity='1'
                  d='M0,288L60,261.3C120,235,240,181,360,160C480,139,600,149,720,176C840,203,960,245,1080,240C1200,235,1320,181,1380,154.7L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z'
                ></path>
              </svg>
            </div>
            <div className={MobileL ? "howItWorksL" : "howItWorks "}>
              <div
                className={
                  MobileL
                    ? "fs-24 Monts-Bold blue--text  text-center container "
                    : "fs-30 Monts-Bold blue--text  text-center container "
                }
              >
                How does PractWorks Work?
              </div>
              <div
                className={
                  MobileL
                    ? "fs-14 mt-10  Monts-Medium lightBlue--text  text-center container"
                    : "fs-18 mt-20  Monts-Medium lightBlue--text  text-center container"
                }
              >
                PractWorks combines the research, technology and the rich domain{" "}
                expertise of experienced teachers to make sure you master your
                skills in efficient ways while encouraging and rewarding you for
                cultivating the best practices at the same time.
              </div>
              <div className=' mt-50 container'>
                <CardBox
                  float='left'
                  image={assignment}
                  mainTitle='Missions'
                  subTitle='A mission on PractWorks contains a set of questions that you need to solve. The questions
                generated as part of your missions are hyper specific to you based on your practicing
                history, topic, concepts and skills learnt and no two questions that are the same will ever be
                presented to you on the platform. PractWorks understands the chosen grade, subject, topic
                and curriculum and guides you through your practice to master the skills. In addition,
                PractWorks conducts periodic showdowns/examinations to help you in benchmarking your
                performance with your peer group'
                />
                <CardBox
                  float='right'
                  image={submit}
                  mainTitle='Submit your mission'
                  subTitle='You solve your missions on pen and paper and upload them using the PractWorks mobile
                app. You are required to solve the questions in a detailed manner with all the steps clearly
                written down and your submissions are evaluated for every single step and analyzed.'
                />
                <CardBox
                  float='left'
                  image={evaluation}
                  mainTitle='Evaluation By Teachers'
                  subTitle='Your hyper-specific missions are evaluated by the experienced teachers. Every single step
                of your solution is evaluated for correctness and rewards points are based on your practice
                history. The technology of PractWorks ensures that the evaluations are consistent. The
                results of the evaluations along with your chosen topic and practice history will influence the
                next set of missions.
                '
                />
                <CardBox
                  float='right'
                  image={awards}
                  mainTitle='Recognition and Awards'
                  lastElement={true}
                  subTitle='PractWorks is aimed towards making deliberate and effective practice an early habit. Get
                recognized for your practice on PractWorks. Win frequent awards for your consistency in the
                practice and your performance in the benchmarking tests, all the while progressing through
                different levels/ranks. Your ranks are not influenced by other students and are reflective of
                your own efforts.'
                />
              </div>
            </div>{" "}
          </div>

          <div
            className='text-center pb-100'
            style={{ background: " #f2f4f8" }}
          >
            <div
              className={
                MobileL
                  ? "fs-14  Monts-Medium lightBlue--text  text-center container"
                  : "fs-18   Monts-Medium lightBlue--text  text-center container"
              }
            >
              Right now accepting students only for 8th Grade Math, CBSE and
              ICSE curriculum.
            </div>
            <button
              className={
                MobileL
                  ? "button2L Monts-SemiBold mt-10"
                  : "button2 Monts-SemiBold mt-20"
              }
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              Get the app
            </button>
          </div>

          {/* Contact us section */}
          <div className={MobileL ? "contactUsL" : "contactUs"}>
            <div
              className={
                MobileL
                  ? "contactUsBoxL  row text-center"
                  : Tablet
                  ? "contactUsBox-t  row text-center"
                  : "contactUsBox  row text-center"
              }
            >
              <div
                className={
                  MobileL
                    ? " blue--text fs-24  Monts-Bold wp-100 h-37"
                    : "blue--text fs-30  Monts-Bold wp-100 h-37"
                }
              >
                Talk To Us
              </div>
              <form
                onSubmit={(e) => {
                  handleSubmit(e);
                }}
              >
                <div className='row wp-100 mt-45 ml-0'>
                  <div className='col-md-6 col-lg-6 col-6'>
                    <input
                      className='input Monts-Medium'
                      type='text'
                      placeholder='Name'
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      required
                    ></input>
                  </div>
                  <div className='col-md-6 col-lg-6 col-6'>
                    <input
                      className='input Monts-Medium'
                      type='email'
                      placeholder='Email'
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                  </div>
                  <div className='col-md-12 col-lg-12 col-12 mt-45'>
                    <input
                      className='input Monts-Medium'
                      type='text'
                      placeholder='Message'
                      onChange={(e) => {
                        setMessage(e.target.value);
                      }}
                      required
                    ></input>
                  </div>
                  <div className='col-md-12 col-lg-12 col-12 h-78 mt-45'>
                    <button className='button2 Monts-SemiBold'>Submit</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className={MobileL ? "footerL" : Tablet ? "footer-t" : "footer"}>
            <div
              className='row'
              style={
                MobileL
                  ? { margin: "0" }
                  : Tablet
                  ? { margin: "0" }
                  : { margin: "0" }
              }
            >
              <div
                className={
                  MobileL
                    ? "col-12 col-md-6  col-lg-4 Monts-Regular white--text fs-10 pt-14 text-center"
                    : "col-12 col-md-6  col-lg-4 Monts-Regular white--text fs-14 pt-14 "
                }
              >
                Copyright © 2021Practworks. All rights reserved.
              </div>
              <div
                className={
                  MobileL
                    ? "col-12  col-md-6 col-lg-8 Monts-Regular white--text fs-20 pt-14 text-center"
                    : " col-12  col-md-6 col-lg-8 Monts-Regular white--text fs-20 pt-14 "
                }
              >
                <nav>
                  <ul className={MobileL ? "footerSideL" : " footerSide"}>
                    <li
                      className={MobileL ? "footerListItemL" : "footerListItem"}
                    >
                      <div
                        onClick={() =>
                          props.history.push("/landing-page/pricing")
                        }
                        className={
                          MobileL
                            ? "Monts-Regular fs-10 cursor-pointer"
                            : "Monts-Regular fs-14 cursor-pointer"
                        }
                      >
                        Pricing
                      </div>
                    </li>
                    <li
                      className={MobileL ? "footerListItemL" : "footerListItem"}
                    >
                      <div
                        onClick={() =>
                          props.history.push("/landing-page/refund-policy")
                        }
                        className={
                          MobileL
                            ? "Monts-Regular fs-10 cursor-pointer"
                            : "Monts-Regular fs-14 cursor-pointer"
                        }
                      >
                        Refund Policy
                      </div>
                    </li>
                    <li
                      className={MobileL ? "footerListItemL" : "footerListItem"}
                    >
                      <div
                        onClick={() =>
                          props.history.push("/landing-page/terms")
                        }
                        className={
                          MobileL
                            ? "Monts-Regular fs-10 cursor-pointer"
                            : "Monts-Regular fs-14 cursor-pointer"
                        }
                      >
                        Terms & Conditions
                      </div>
                    </li>
                    <li
                      className={MobileL ? "footerListItemL" : "footerListItem"}
                    >
                      <div
                        onClick={() =>
                          props.history.push("/landing-page/privacy-policy")
                        }
                        className={
                          MobileL
                            ? "Monts-Regular fs-10 cursor-pointer"
                            : "Monts-Regular fs-14 cursor-pointer"
                        }
                      >
                        Privacy Policy
                      </div>
                    </li>
                    <li
                      className={MobileL ? "footerListItemL" : "footerListItem"}
                    >
                      <div
                        onClick={() =>
                          props.history.push("/landing-page/contact-us")
                        }
                        className={
                          MobileL
                            ? "Monts-Regular fs-10 cursor-pointer"
                            : "Monts-Regular fs-14 cursor-pointer"
                        }
                      >
                        Contact Us
                      </div>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LandingPageWrapper>
  );
};

export default withRouter(LandingPage);
