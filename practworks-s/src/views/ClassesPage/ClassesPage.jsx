import { Row, Col, Card } from "antd";
import TeacherServices from "api/TeacherServices";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";

export const ClassesPage = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  useEffect(() => {
    TeacherServices.getClasses().then((res) => {
      console.log(res.data.data.classList);
      setData(res.data.data.classList);
    });
  }, [id]);

  return (
    <div>
      <h3 className="Monts-Bold fs-24 dark-blue mb-20 text-center">Classes</h3>
      <Row gutter={[20, 20]}>
        {data.map((el) => {
          return (
            <Col span={8} key={el.id}>
              <Card
                style={{
                  color: "rgb(77, 104, 152)",
                  height: "100%",
                  borderColor: "rgb(77, 104, 152)",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
                className="d-flex align-items-center justify-content-center"
                onClick={() => {
                  history.push(
                    RouteDefinitons.ROUTE_STUDENT_PRACTICE.replace(
                      ":id",
                      el.class_id
                    )
                  );
                }}
              >
                <p
                  style={{
                    fontFamily: "Montserrat-Bold",
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                  className="text-center mb-0"
                >
                  {el.class_name}
                </p>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
