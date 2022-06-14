import React, { useState, useEffect } from "react";
import { Dropdown, Layout, Menu } from "antd";
import DashboardLayoutWrapper from "./DashboardLayout.style";
import DashboardLogo from "../../assets/images/DashboardLogo.png";
import DashboardShortLogo from "../../assets/images/DashboardShortLogo.svg";
import SidebarLogo from "../../assets/images/sidebarlogo.svg";
// import userImage from "../../assets/images/userImage.svg";
import { DownOutlined } from "@ant-design/icons";
import Footer from "../common/Footer/Footer";
import { Link, matchPath, NavLink, withRouter } from "react-router-dom";
import TermsPage from "../../views/TermsPage/TermsPage";
import Dashboard from "../../views/Dashboard/Dashboard";
import UnderEvaluation from "../../views/Under Evaluation/UnderEvaluation";
import MyEarning from "../../views/MyEarning/MyEarning";
import Modal from "../common/Modal/Modal";
import Subscription from "../../views/Subscription/Subscription";
import EditProfile from "../../views/EditProfile/EditProfile";
import AssignmentDetails from "../../views/AssignmentDetails/AssignmentDetails";
import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import HelpPage from "../../views/HelpPage/HelpPage";
import FaqPage from "../../views/FaqPage/FaqPage";
import PrivacyPolicy from "../../views/PrivacyPolicy/PrivacyPolicy";
import { useSelector } from "react-redux";
import EvaluatorServices from "api/EvaluatorServices";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import Awards from "views/Awards/Awards";
import userImage from "assets/images/userImage.svg";
import { RouteDefinitons } from "routes/RouteDefinitions";
import TeacherDashboard from "views/TeacherDashboard/TeacherDashboard";
import StudentDashboard from "views/StudentDashboard/StudentDashboard";
import { StudentSubSidebar } from "./components/StudentSubSidebar";
import { StudentPractice } from "views/StudentPractice/StudentPractice";
import { TeacherSubSidebar } from "./components/TeacherSubSidebar";
import { DetailedReport } from "views/DetailedReport/DetailedReport";
import CreateClass from "views/CreateClass/CreateClass.jsx";
import AnswerKey from "views/AnswerKey/AnswerKey.jsx";
import SummaryReport from "views/SummaryReport/SummaryReport.jsx";
import ManageClass from "views/ManageClass/ManageClass.jsx";
import AcceptInvite from "views/AcceptInvite/AcceptInvite.jsx";
import { ClassesPage } from "views/ClassesPage/ClassesPage";
import EvaluatorNav from "components/DashboardLayout/components/EvaluatorNav/EvaluatorNav";
import TeacherNav from "components/DashboardLayout/components/TeacherNav/TeacherNav";
import Memo from "./components/Memo";
import StudentCompletedMissions from "views/StudentCompletedMissions/StudentCompletedMissions";
import StudentCurrentMissions from "views/StudentCurrentMissions/StudentCurrentMissions";
import AwardsPage from "views/AwardsPage/AwardsPage";
import PracticeListPage from "views/PracticeListPage/PracticeListPage";
import CreateMission from "views/CreateMission/CreateMission";
import CreateUnit from "views/CreateUnit/CreateUnit";
import PracticeDashboard from "views/PracticeDashboard/PracticeDashboard";
import RevisePage from "views/RevisePage/RevisePage";

const { Header, Sider, Content } = Layout;

export const activeNavLinkStyle = {
  background: "#ffffff",
  color: "#213861",
  borderColor: "#213861",
  borderRadius: "15px 15px 15px 15px",
  marginRight: 20,
};

function DashboardLayout(props) {
  const path = props.location.pathname;
  const [collapse, setCollapse] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const userDatas = useSelector((state) => state.auth);
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });

  useEffect(() => {
    MobileL && setCollapse(true);
  }, []);

  const toggle = () => {
    setCollapse(!collapse);
  };

  const student = () => {
    setIsStudent(true);
  };

  const collapseTrue = () => {
    setCollapse(true);
  };

  return (
    <DashboardLayoutWrapper>
      <Layout>
        {/* sidbar */}
        <Sider
          trigger={null}
          collapsible
          collapsed={collapse}
          width={MobileL ? "100%" : Tablet ? "40%" : "25%"}
          style={{ height: "100vh", position: "relative" }}
        >
          <div>
            {MobileL && !collapse && (
              <div style={{ position: "absolute", right: "20px", top: "30px" }}>
                <CloseCircleOutlined
                  style={{ color: "white", fontSize: "20px" }}
                  onClick={() => toggle()}
                />
              </div>
            )}
            <div className={!collapse ? "logo" : "collapse-logo"}>
              {collapse ? (
                <img
                  src={DashboardShortLogo}
                  height="40"
                  width="40"
                  alt="loading"
                />
              ) : (
                <img src={DashboardLogo} alt="loading" />
              )}
            </div>
            {!collapse ? (
              <>
                {userDatas.user_data.user_type === "evaluator" ? (
                  ""
                ) : userDatas.user_data.user_type === "teacher" ? (
                  <>
                    <TeacherSubSidebar />
                    <Memo margin={true} />
                  </>
                ) : userDatas.user_data.user_type === "student" ? (
                  <StudentSubSidebar />
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </div>
        </Sider>
        <Layout
          className="site-layout"
          style={
            MobileL
              ? !collapse
                ? { display: "none" }
                : { display: "flex" }
              : { display: "flex" }
          }
        >
          {userDatas.user_data.user_type === "teacher" ? (
            <TeacherNav collapse={collapse} toggle={toggle} />
          ) : (
            <EvaluatorNav
              collapse={collapse}
              toggle={toggle}
              isStudent={isStudent}
            />
          )}
          <Content
            className="site-layout-background"
            style={{
              padding: "100px 24px",
              minHeight: 280,
            }}
          >
            {path === "/terms" ? (
              <TermsPage />
            ) : path === "/dashboard" ? (
              <Dashboard collapse={collapse} />
            ) : path === RouteDefinitons.ROUTE_TEACHER_DASHBOARD ? (
              <TeacherDashboard collapse={collapse} />
            ) : path === "/under-evaluation" ? (
              <UnderEvaluation />
            ) : path === "/my-earning" ? (
              <MyEarning />
            ) : path === "/subscription" ? (
              <Subscription collapse={collapse} isStudent={() => student()} />
            ) : path === "/edit-profile" ? (
              <EditProfile />
            ) : path === "/assignment-details" ? (
              <AssignmentDetails
                collapse={collapse}
                collapseTrue={() => collapseTrue()}
              />
            ) : path === "/help" ? (
              <HelpPage />
            ) : path === "/faq" ? (
              <FaqPage />
            ) : path === "/privacy-policy" ? (
              <PrivacyPolicy />
            ) : path === "/awards" ? (
              <Awards isStudent={() => student()} />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_PRACTICE,
                exact: true,
                strict: true,
              }) ? (
              <StudentPractice />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_DASHBOARD,
                exact: true,
                strict: true,
              }) ? (
              <StudentDashboard />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_AWARDS,
                exact: true,
                strict: true,
              }) ? (
              <AwardsPage />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_PRACTICE_DASHBOARD,
                exact: true,
                strict: true,
              }) ? (
              <PracticeDashboard collapse={collapse} />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_PRACTICE_LIST,
                exact: true,
                strict: true,
              }) ? (
              <PracticeListPage />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_REVISE,
                exact: true,
                strict: true,
              }) ? (
              <RevisePage />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_COMPLETED_MISSIONS,
                exact: true,
                strict: true,
              }) ? (
              <StudentCompletedMissions />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_CREATE_MISSION,
                exact: true,
                strict: true,
              }) ? (
              <CreateMission />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_CREATE_UNIT,
                exact: true,
                strict: true,
              }) ? (
              <CreateUnit />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_CURRENT_MISSIONS,
                exact: true,
                strict: true,
              }) ? (
              <StudentCurrentMissions />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_STUDENT_PRACTICE_DETAILED_REPORT,
                exact: true,
                strict: true,
              }) ? (
              <DetailedReport />
            ) : path === RouteDefinitons.ROUTE_TEACHER_CREATE_CLASS ? (
              <CreateClass />
            ) : path === RouteDefinitons.ROUTE_STUDENT_LIST ? (
              <ClassesPage />
            ) : path === RouteDefinitons.ROUTE_TEACHER_ANSWER_KEYS ? (
              <AnswerKey />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_TEACHER_SUMMARY_REPORT,
                exact: true,
                strict: true,
              }) ? (
              <SummaryReport />
            ) : path === RouteDefinitons.ROUTE_TEACHER_MANAGE_CLASS ? (
              <ManageClass />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_TEACHER_CLASS_DETAILS,
                exact: true,
                strict: true,
              }) ? (
              <ManageClass />
            ) : matchPath(path, {
                path: RouteDefinitons.ROUTE_TEACHER_ACCEPT_INVITE,
                exact: true,
                strict: true,
              }) ? (
              <AcceptInvite />
            ) : (
              ""
            )}
          </Content>
          {!collapse ? (
            <Footer width={Tablet ? 60 : 75} />
          ) : (
            <Footer width={MobileL ? 100 : Tablet ? 90 : 94} />
          )}
        </Layout>
      </Layout>
    </DashboardLayoutWrapper>
  );
}

export default withRouter(DashboardLayout);
