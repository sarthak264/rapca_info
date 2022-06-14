import { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import userImage from "assets/images/userImage.svg";
import { RouteDefinitons } from "routes/RouteDefinitions";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import SidebarLogo from "assets/images/sidebarlogo.svg";
import { Dropdown, Layout, Menu } from "antd";
import Modal from "components/common/Modal/Modal";
const { Header } = Layout;

function EvaluatorNav({ collapse, toggle, isStudent }) {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const userDatas = useSelector((state) => state.auth);
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });

  const toggleModal = () => {
    setModal(!modal);
  };
  const toggleModal2 = () => {
    setModal2(!modal2);
  };

  const toggleModal3 = () => {
    setModal3(!modal3);
  };

  const menu = isStudent ? (
    <Menu>
      <Menu.Item key="0">
        <div
          style={{ color: "white" }}
          className="Monts-Medium"
          onClick={toggleModal}
        >
          Change password
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <div
          style={{ color: "white" }}
          className="Monts-Medium"
          onClick={toggleModal3}
        >
          Modify Subscription
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <a href="/" style={{ color: "white" }} className="Monts-Medium">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  ) : (
    <Menu>
      <Menu.Item key="0">
        <a
          href="/edit-profile"
          style={{ color: "white" }}
          className="Monts-Medium"
        >
          Edit profile
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="1">
        <div
          style={{ color: "white" }}
          className="Monts-Medium"
          onClick={toggleModal}
        >
          Change password
        </div>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="2">
        <a href="/" style={{ color: "white" }} className="Monts-Medium">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-background"
      style={
        !collapse
          ? Tablet
            ? {
                padding: "0 10px",
                background: "#f7f7f7",
                position: "fixed",
                zIndex: "10",
                width: "60%",
              }
            : {
                padding: "0 10px",
                background: "#f7f7f7",
                position: "fixed",
                zIndex: "10",
                width: "75%",
              }
          : MobileL
          ? {
              padding: "0 10px",
              background: "#f7f7f7",
              position: "fixed",
              zIndex: "10",
              width: "100%",
            }
          : Tablet
          ? {
              padding: "0 10px",
              background: "#f7f7f7",
              position: "fixed",
              zIndex: "10",
              width: "90%",
            }
          : {
              padding: "0 10px",
              background: "#f7f7f7",
              position: "fixed",
              zIndex: "10",
              width: "94%",
            }
      }
    >
      <div className="trigger" style={{ justifyContent: "space-between" }}>
        <img
          onClick={toggle}
          src={SidebarLogo}
          className="ma-15"
          height="32"
          alt="loading"
        />
        <div>
          {userDatas.user_data.user_type === "student" ? (
            ""
          ) : (
            <Link
              className="Monts-SemiBold"
              style={{ color: "#213861" }}
              to={
                userDatas.user_data.user_type === "evaluator"
                  ? RouteDefinitons.ROUTE_EVALUATOR_DASHBOARD
                  : RouteDefinitons.ROUTE_TEACHER_DASHBOARD
              }
            >
              Home
            </Link>
          )}
          &nbsp;{userDatas.user_data.user_type === "student" ? "" : ` | `}
          &nbsp;{" "}
          {userDatas.user_data.user_type === "student" ? (
            ""
          ) : (
            <Link
              className="Monts-SemiBold"
              style={{ color: "#213861" }}
              to="/my-earning"
            >
              My Earning
            </Link>
          )}
          &nbsp; {userDatas.user_data.user_type === "student" ? "" : ` | `}
          &nbsp;
          <a
            className="Monts-SemiBold"
            style={{ color: "#213861" }}
            href="#"
            onClick={() => {
              toggleModal2();
            }}
          >
            Contact Us
          </a>
          &nbsp; | &nbsp;
          <img
            src={userDatas.Image || userImage}
            height="32"
            width="32"
            alt="loading..."
            style={{ borderRadius: "50%" }}
          />{" "}
          &nbsp;
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            arrow
            placement="bottomRight"
          >
            <a
              className="ant-dropdown-link Monts-SemiBold"
              style={{ color: "#213861" }}
              onClick={(e) => e.preventDefault()}
              href="#"
            >
              {userDatas.firstName} {userDatas.lastName} <DownOutlined />
            </a>
          </Dropdown>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal} title="Change Password" />
      <Modal isOpen={modal2} toggle={toggleModal2} title="Contact Us" />
      <Modal
        isOpen={modal3}
        toggle={toggleModal3}
        title="Modify Subscription"
      />
    </Header>
  );
}

export default EvaluatorNav;
