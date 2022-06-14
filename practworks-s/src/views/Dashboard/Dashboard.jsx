import React, { useEffect, useState } from "react";
import DashboardWrapper from "./Dashboard.style";
import Dashboard1 from "../../assets/images/Dashboard1.svg";
import Dashboard2 from "../../assets/images/Dashboard2.svg";
import Dashboard3 from "../../assets/images/Dashboard3.svg";
import { Card, message } from "antd";
import Button from "../../components/common/Button/Button";
import { withRouter } from "react-router-dom";
import EvaluatorServices from "api/EvaluatorServices";
import { useSelector } from "react-redux";

function Dashboard(props) {
  let { collapse } = props;
  const [count, setcount] = useState({});
  const [subject, setSubject] = useState([]);
  const [loading, setloading] = useState(false);
  const userData = useSelector((state) => state.auth);

  useEffect(() => {
    EvaluatorServices.dashboard().then((res) => {
      setcount(res.data.data);
    });
    setSubject(userData.user_data.subjects);
  }, []);

  const card = [
    {
      count: count.total_evaluation,
      title: "To be evaluated",
      paper: subject,
      button: "Accept Evaluation",
      image: Dashboard1,
    },
    {
      count: count.pending_evaluation,
      title: "Under Evaluation",
      button: "Evaluate",
      image: Dashboard2,
    },
    {
      count: count.total_evaluated,
      title: "Evaluated Mission",
      button: "",
      image: Dashboard3,
    },
  ];

  return (
    <DashboardWrapper>
      {card.map((res) => {
        return (
          <Card className="pa-10 text-center ">
            <img
              src={res.image}
              alt="loading.."
              // width={!collapse ? 250 : 350}
              style={!collapse ? { width: "19vw" } : { width: "25vw" }}
              height={!collapse ? "200" : "300"}
            />
            <div className="ptb-15 dark-blue Monts-Bold fs-24">{res.count}</div>
            <div className="dark-blue Monts-SemiBold fs-20">
              {res.hasOwnProperty("paper")
                ? res.paper.map((res, i) => {
                    return i === 0
                      ? `${res.subject.name}`
                      : `, ${res.subject.name}`;
                  })
                : ""}
              <br />
              {res.title}
            </div>
            {res.button !== "" && (
              <div className="pt-15">
                <Button
                  text={res.button}
                  loading={loading}
                  onClick={() => {
                    if (res.button === "Accept Evaluation") {
                      if (count.pending_evaluation < 3) {
                        EvaluatorServices.acceptEvaluation().then((res) => {
                          setloading(true);
                          if (res.data.status === 0) {
                            message.error(res.data.message);
                            setloading(false);
                          } else {
                            message.success(res.data.message);
                            EvaluatorServices.dashboard().then((res) => {
                              setcount(res.data.data);
                            });
                            setloading(false);
                          }
                        });
                      } else {
                        message.error(
                          "you have 3 pending evaluation complete that to accept other evaluation"
                        );
                      }
                    } else {
                      props.history.push("/under-evaluation");
                    }
                  }}
                ></Button>
              </div>
            )}
          </Card>
        );
      })}
    </DashboardWrapper>
  );
}
export default withRouter(Dashboard);
