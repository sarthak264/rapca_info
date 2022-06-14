import React, { useEffect, useState } from "react";
import DashboardWrapper from "./StudentDashboard.style";
import ManageClasses from "../../assets/images/ManageClasses.jpeg";
import Student from "../../assets/images/StudentPractice.jpeg";
import AnswerKeys from "../../assets/images/AnswerKeys.jpeg";
import { Card } from "antd";
import Button from "../../components/common/Button/Button";
import StudentServices from "api/StudentServices";
import { RouteDefinitons } from "routes/RouteDefinitions";
import Memo from "../../components/DashboardLayout/components/Memo";
import { useHistory } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

function StudentDashboard(props) {
  let { collapse } = props;
  const [count, setcount] = useState({});
  const Tablet = useMediaQuery({ query: "(max-width: 991px)" });
  const MobileL = useMediaQuery({ query: "(max-width: 426px)" });

  const [loading, setloading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    setloading(true);
    StudentServices.dashboard()
      .then((res) => {
        console.log(res.data.data);
        setcount(res.data.data);
      })
      .finally(() => setloading(false));
  }, []);

  const card = [
    {
      count: count.earned_point,
      title: "Mission Points",
      button: "View",
      image: AnswerKeys,
    },
    {
      count: count.revise_point,
      title: "Revised Points",
      button: "View",
      image: Student,
    },
    {
      count: count.current_mission_count,
      title: "Current Missions",
      button: "View",
      image: AnswerKeys,
    },
    {
      count: count.completed_mission_count,
      title: "Completed Missions",
      button: "View",
      image: AnswerKeys,
    },
  ];

  return (
    <DashboardWrapper>
      <div className="flex-x flex-wrap">
        {card.map((res, i) => {
          return (
            <>
              <div
                className={`dash-card ptb-20 plr-10 text-center ma-7 ${
                  MobileL ? "flex-y" : "flex-x"
                }`}
                style={{ width: Tablet ? "100%" : "48%" }}
              >
                <img
                  src={res.image}
                  alt="loading.."
                  className="d-block m-auto"
                  style={{ width: "100%", maxWidth: 200, maxHeight: 120 }}
                />
                <div className="plr-40" style={{ width: "100%" }}>
                  <div className="ptb-15 dark-blue Monts-Bold fs-24">
                    {res.count}
                  </div>
                  <div className="dark-blue Monts-SemiBold fs-20">
                    {res.title}
                  </div>
                  {res.button !== "" && (
                    <div className="pt-15">
                      <Button
                        text={res.button}
                        loading={loading}
                        onClick={() => {
                          if (res.title === "Completed Missions") {
                            history.push(
                              RouteDefinitons.ROUTE_STUDENT_COMPLETED_MISSIONS
                            );
                          } else if (res.title === "Current Missions") {
                            history.push(
                              RouteDefinitons.ROUTE_STUDENT_CURRENT_MISSIONS
                            );
                          }
                        }}
                      ></Button>
                    </div>
                  )}
                </div>
              </div>

              {i === 3 && (
                <div className="student-memo">
                  <Memo margin={false} />
                </div>
              )}
            </>
          );
        })}
      </div>
    </DashboardWrapper>
  );
}
export default StudentDashboard;
