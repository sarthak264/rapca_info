import { Table } from "antd";
import StudentServices from "api/StudentServices";
import React, { useState, useEffect } from "react";

import DashboardWrapper from "./Awards.style";

export default function Awards(props) {
  const [awards, setAwards] = useState(0);

  useEffect(() => {
    StudentServices.awards().then((res) => {
      const TableData = res.data.data.rows.map((res, i) => {
        return {
          key: i,
          type: res.type,
          chips: res.chips,
          remarks: res.remarks,
        };
      });

      setAwards(TableData);
    });
  }, []);

  const dataSource = [
    {
      key: "1",
      assignments: "5 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "2",
      assignments: "2 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "3",
      assignments: "8 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "4",
      assignments: "5 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "5",
      assignments: "2 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "6",
      assignments: "8 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "7",
      assignments: "5 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "8",
      assignments: "2 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "9",
      assignments: "8 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "10",
      assignments: "5 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "11",
      assignments: "2 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
    {
      key: "12",
      assignments: "8 Assignments",
      tags: "Maths , Algebra",
      date: "05/02/2021",
      amount: "Rs.500",
    },
  ];

  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      align: "center",
      render: (title) => (
        <div className="Monts-Bold fs-18 light-blue">{title}</div>
      ),
    },
    {
      title: "Chips",
      dataIndex: "chips",
      key: "chips",
      align: "center",
      render: (title) => <div className="Monts-Bold color">{title}</div>,
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
      align: "center",
      render: (title) => <div className="Monts-Bold color">{title}</div>,
    },
  ];

  return (
    <DashboardWrapper>
      <div className="Monts-Bold fs-24 dark-blue ">Awards</div>
      <div className="pt-20">
        <Table
          bordered
          pagination={{ position: ["bottomRight"] }}
          dataSource={awards}
          columns={columns}
          size="small"
        />
      </div>
    </DashboardWrapper>
  );
}
