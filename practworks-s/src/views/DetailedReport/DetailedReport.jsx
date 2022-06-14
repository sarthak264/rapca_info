import TeacherServices from "api/TeacherServices";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "antd";
import Button from "../../components/common/Button/Button";

export const DetailedReport = () => {
  const [data, setData] = useState({ missionsList: [], reviseList: [] });
  const { id } = useParams();
  useEffect(() => {
    TeacherServices.getStudentPracticeById(id).then((res) => {
      setData(res.data.data);
    });
  }, [id]);
  const column1 = [
    {
      title: "Mission ID",
      dataIndex: "mission_no",
    },
    {
      title: "Topic",
      dataIndex: "topic",
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => text.split("GMT")[0],
    },
    {
      title: "Errors",
      dataIndex: "errors",
    },
  ];
  const column2 = [
    {
      title: "Topic",
      dataIndex: "topic",
    },
    {
      title: "Correct",
      dataIndex: "correct",
    },
    {
      title: "Incorrect",
      dataIndex: "incorrect",
    },
    {
      title: "Total",
      dataIndex: "num_questions",
    },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <div className="Monts-Bold fs-24 dark-blue mb-10">
            Name: {data.student_name}
          </div>
          <div className="Monts-Bold fs-24 dark-blue mb-10">
            Class: {data.class_name}
          </div>
        </div>
        <div>
          <a
            href={data.report_url}
            target="_blank"
            style={{
              display: "flex",
              alignItems: "center",
              minHeight: "50px",
              padding: "0.5rem 1rem",
              border: "none",
              borderRadius: "12px",
              backgroundColor: "#4d6898",
              color: "white",
              fontFamily: "Montserrat-Bold",
            }}
            onMouseOver={(e) => (e.target.style.textDecoration = "none")}
          >
            Performance
          </a>
        </div>
      </div>
      <div className="Monts-Bold fs-24 dark-blue mb-10 mt-15 text-center">
        Summary Report
      </div>
      <Table
        bordered
        columns={column1}
        dataSource={data.missionsList}
        pagination={false}
      />
      <div className="Monts-Bold fs-24 dark-blue mb-10 mt-20 text-center">
        MCQ/Review
      </div>
      <Table
        bordered
        columns={column2}
        dataSource={data.reviseList}
        pagination={false}
      />
    </div>
  );
};
