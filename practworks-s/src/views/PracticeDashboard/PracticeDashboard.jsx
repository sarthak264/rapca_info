import React from "react";
import { RouteDefinitons } from "routes/RouteDefinitions";
import DashboardWrapper from "./PracticeDashboard.style";
import Button from "../../components/common/Button/Button";
import ManageClasses from "../../assets/images/ManageClasses.jpeg";
import Student from "../../assets/images/StudentPractice.jpeg";
import AnswerKeys from "../../assets/images/AnswerKeys.jpeg";
import { Card } from "antd";
import { useHistory } from "react-router-dom";

function PracticeDashboard(props) {
  const history = useHistory();
  let { collapse } = props;
  const card = [
    {
      count: 0,
      title: "Classes",
      button: "Practice List",
      image: ManageClasses,
      height: "170",
    },
    {
      count: 0,
      title: "Class Practice",
      button: "Create Mission",
      image: Student,
    },
    {
      count: 0,
      title: "Answer keys",
      button: "Create Unit",
      image: AnswerKeys,
    },
  ];

  return (
    <DashboardWrapper>
      {card.map((res) => {
        return (
          <Card className="pa-10 text-center justify-content-end flex-y">
            <img
              src={res.image}
              alt="loading.."
              // width={!collapse ? 250 : 350}
              style={!collapse ? { width: "19vw" } : { width: "25vw" }}
              height={170}
            />
            {/* <div className="ptb-15 dark-blue Monts-Bold fs-24">{res.count}</div> */}
            {/* <div className="ptb-15 dark-blue Monts-Bold fs-20">{res.title}</div> */}
            {res.button !== "" && (
              <div className="pt-15">
                <Button
                  text={res.button}
                  onClick={() => {
                    if (res.button === "Practice List")
                      history.push(RouteDefinitons.ROUTE_STUDENT_PRACTICE_LIST);
                    else if (res.button === "Create Mission")
                      history.push(
                        RouteDefinitons.ROUTE_STUDENT_CREATE_MISSION
                      );
                    else if (res.button === "Create Unit")
                      history.push(RouteDefinitons.ROUTE_STUDENT_CREATE_UNIT);
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

export default PracticeDashboard;
