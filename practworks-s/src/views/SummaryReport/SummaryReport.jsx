import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { Link, useParams } from "react-router-dom";
import TeacherServices from "api/TeacherServices";

function SummaryReport() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    TeacherServices.getSummary(id).then((res) => {
      console.log(res.data.data);
      setData(res.data.data.entries);
    });
  }, []);

  const columns = [
    { title: "Classes", dataIndex: "class_name" },
    { title: "Topic", dataIndex: "topic" },
    { title: "Students", dataIndex: "n_students" },
    { title: "Total Missions", dataIndex: "n_missions" },
    {
      title: "Errors",
      dataIndex: "frequent_errors",
    },
  ];
  return (
    <div>
      <div className="Monts-Bold fs-24 dark-blue mb-10">Summary Report</div>
      <Table bordered columns={columns} dataSource={data} />
    </div>
  );
}

export default SummaryReport;
