import React, { useEffect, useState } from "react";
import DashboardWrapper from "./TeacherDashboard.style";
import ManageClasses from "../../assets/images/ManageClasses.jpeg";
import Student from "../../assets/images/StudentPractice.jpeg";
import AnswerKeys from "../../assets/images/AnswerKeys.jpeg";
import { Card } from "antd";
import Button from "../../components/common/Button/Button";
import { withRouter } from "react-router-dom";
import TeacherServices from "api/TeacherServices";
import { RouteDefinitons } from "routes/RouteDefinitions";

function TeacherDashboard(props) {
  let { collapse } = props;
  const [count, setcount] = useState({});
  const [loading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    TeacherServices.dashboard()
      .then((res) => {
        setcount(res.data.data);
      })
      .finally(() => setloading(false));
  }, []);

  const card = [
    {
      count: count.n_classes,
      title: "Classes",
      button: "Manage Classes",
      image: ManageClasses,
      height: "170",
    },
    {
      count: `${count.n_students} Total students`,
      title: "Class Practice",
      button: "View Class Practice",
      image: Student,
    },
    {
      count: count.n_answer_keys,
      title: "Answer keys",
      button: "View Answer Keys",
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
              height={res.height}
            />
            <div className="ptb-15 dark-blue Monts-Bold fs-24">{res.count}</div>
            <div className="dark-blue Monts-SemiBold fs-20">{res.title}</div>
            {res.button !== "" && (
              <div className="pt-15">
                <Button
                  text={res.button}
                  loading={loading}
                  onClick={() => {
                    if (res.button === "View Class Practice")
                      props.history.push(RouteDefinitons.ROUTE_STUDENT_LIST);
                    else if (res.button === "View Answer Keys")
                      props.history.push(
                        RouteDefinitons.ROUTE_TEACHER_ANSWER_KEYS
                      );
                    else if (res.button === "Manage Classes")
                      props.history.push(
                        RouteDefinitons.ROUTE_TEACHER_MANAGE_CLASS
                      );
                  }}
                ></Button>
              </div>
            )}
          </Card>
        );
      })}
      <Button
        text="CREATE A CLASS"
        onClick={() => {
          props.history.push(RouteDefinitons.ROUTE_TEACHER_CREATE_CLASS);
        }}
      ></Button>
    </DashboardWrapper>
  );
}
export default withRouter(TeacherDashboard);
