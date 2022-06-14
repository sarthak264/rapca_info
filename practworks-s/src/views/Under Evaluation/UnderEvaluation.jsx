import React, { useEffect, useState } from "react";
import DashboardWrapper from "./UnderEvaluation.style";
import Dashboard1 from "../../assets/images/Dashboard1.svg";
import Dashboard2 from "../../assets/images/Dashboard2.svg";
import Dashboard3 from "../../assets/images/Dashboard3.svg";
import { Card, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { withRouter } from "react-router-dom";
import EvaluatorServices from "api/EvaluatorServices";

function UnderEvaluation(props) {
  const [data, setData] = useState([]);
  const [card, setCard] = useState(null);

  useEffect(() => {
    EvaluatorServices.missionPending().then((res) => {
      setData(res.data.data);
    });
  }, []);

  // const card = [
  //   {
  //     count: 52,
  //     title:
  //       "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur.",
  //     paper: "Maths",
  //     button: "Start",
  //     image: Dashboard1,
  //   },
  //   {
  //     count: 12,
  //     title:
  //       "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur.",
  //     button: "Resume",
  //     image: Dashboard2,
  //   },
  //   {
  //     count: 1500,
  //     title:
  //       "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur.",
  //     button: "Start",
  //     image: Dashboard3,
  //   },
  // ];

  return (
    <DashboardWrapper>
      <div className="Monts-Bold fs-24 dark-blue ">Under Evaluation</div>
      <div className="grid">
        {data.map((res) => {
          return (
            <div>
              <Card className="mt-30">
                <div className="fs-18 Monts-SemiBold dark-blue ma-10">
                  {res.user_mission_id}
                </div>
                {
                  /* <div className="ma-10">
                  <Tag
                    color="#658bb1"
                    style={{
                      fontFamily: "Montserrat-Regular",
                      fontSize: "14px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    Maths
                  </Tag>
                  <Tag
                    color="#658bb1"
                    style={{
                      fontFamily: "Montserrat-Regular",
                      fontSize: "14px",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    Algebra
                  </Tag>
                </div> */
                  <div className="ma-10 flex center color Monts-Regular fs-12 ">
                    <ClockCircleOutlined /> &nbsp; {res.submission_date}
                  </div>
                }
                <div
                  className="Monts-SemiBold fs-20 bottom-button cursor-pointer"
                  onClick={() => {
                    props.history.push("/assignment-details", res);
                  }}
                >
                  start
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </DashboardWrapper>
  );
}

export default withRouter(UnderEvaluation);
