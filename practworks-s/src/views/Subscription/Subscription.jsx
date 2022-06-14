import React, { useState, useEffect } from "react";
import DashboardWrapper from "./Subscription.style";
import Subscription1 from "../../assets/images/Subscription1.svg";
import Subscription2 from "../../assets/images/Subscription2.svg";
import Subscription3 from "../../assets/images/Subscription3.svg";
import { Card } from "antd";
import { withRouter } from "react-router-dom";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import StudentServices from "api/StudentServices";
import { useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AuthServices from "api/AuthServices";
import { useDispatch } from "react-redux";
import AuthActions from "redux/auth/actions";
const { userData } = AuthActions;

function Subscription(props) {
  let { collapse } = props;
  const [modal, setModal] = useState(false);
  const [count, setCount] = useState(0);
  const [detailPdf, setDetailPdf] = useState(null);
  const user = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });

  useEffect(() => {
    props.isStudent();
    StudentServices.dashboard().then((res) => {
      setCount(res.data.data.completed_mission_count);
      setDetailPdf(res.data.data.report_url);
    });
  }, []);

  const toggle = () => {
    setModal(!modal);
  };

  const card = [
    {
      count: count,
      title: "Missions completed",
      image: Subscription1,
    },
    {
      // count: "5th",
      title: "Detailed analysis",
      image: Subscription2,
    },
    {
      // count: 10,
      title: "Awards",
      image: Subscription3,
    },
  ];

  return (
    <DashboardWrapper>
      <div className={Tablet ? "grid-t" : "grid"}>
        {card.map((res) => {
          return (
            <Card
              className="pa-10 text-center"
              onClick={() => {
                if (res.title === "Detailed analysis") {
                  detailPdf && window.open(detailPdf, "_blank");
                } else if (res.title === "Awards") {
                  props.history.push("/awards");
                }
              }}
            >
              <img
                src={res.image}
                alt="loading.."
                style={!collapse ? { width: "18vw" } : { width: "25vw" }}
                height="150"
              />
              <div className="ptb-15 dark-blue Monts-Bold fs-24">
                {res.count}
              </div>
              <div className="dark-blue Monts-SemiBold fs-20">{res.title}</div>
            </Card>
          );
        })}
      </div>

      {/* <div className="pt-20">
        <Card
          style={
            !collapse
              ? { width: "22vw", background: "white" }
              : { width: "29vw", background: "white" }
          }
          className={clicked ? "clicked" : ""}
          onClick={() => {
            setclicked(!clicked);
          }}
        >
          {clicked ? (
            <img
              src={clickedImage}
              alt="loading.."
              style={{ position: "absolute", top: "-2px", right: "-2px" }}
            />
          ) : (
            ""
          )}
          <div
            className={
              clicked
                ? "Monts-Bold fs-24  dark-blue text-center"
                : "Monts-Bold fs-24  light-blue text-center"
            }
          >
            {" "}
            INR 999
          </div>
          <div className="Monts-Medium fs-16  light-blue text-center pt-10">
            {" "}
            1 Year
          </div>
          <ul className="pt-10">
            <li className="fs-12 Monts-SemiBold color pb-10">
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </li>
            <li className="fs-12 Monts-SemiBold color">
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </li>
            <li className="fs-12 Monts-SemiBold color ptb-10">
              Neque porro quisquam est qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit
            </li>
          </ul>
        </Card>
        <div></div>
        <div></div>
      </div> */}
      {user.user_data.subscription_status === "active" ? (
        <div className="pt-30 Monts-Regular text-center">Plan purchased </div>
      ) : user.user_data.subscription_status === "created" ? (
        <div className="pt-30 Monts-Regular text-center">
          You have initialised the payment{" "}
        </div>
      ) : (
        <div className="pt-30 Monts-Regular text-center">
          No plan purchased{" "}
        </div>
      )}
      {user.user_data.subscription_status === "active" ? (
        <div className="pt-10 text-center ">
          <Button
            text={"View Plan"}
            width={MobileL ? 300 : Tablet ? 400 : 500}
            onClick={() =>
              window.open(user.user_data.subscription_url, "_blank")
            }
          ></Button>
        </div>
      ) : user.user_data.subscription_status === "created" ? (
        <div className="pt-10 text-center ">
          <Button
            text={"Check Now"}
            width={MobileL ? 300 : Tablet ? 400 : 500}
            onClick={() => {
              window.open(user.user_data.subscription_url, "_blank");
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
            }}
          ></Button>
        </div>
      ) : (
        <div className="pt-10 text-center ">
          <Button
            text={"Purchase Now"}
            width={MobileL ? 300 : Tablet ? 400 : 500}
            onClick={toggle}
          ></Button>{" "}
        </div>
      )}
      <Modal
        isOpen={modal}
        toggle={toggle}
        title="Confirm Payment"
        width={500}
      />
    </DashboardWrapper>
  );
}
export default withRouter(Subscription);
