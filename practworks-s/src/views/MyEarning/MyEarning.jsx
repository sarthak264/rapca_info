import { Table } from "antd";
import EvaluatorServices from "api/EvaluatorServices";
import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button/Button";
import Modal from "../../components/common/Modal/Modal";
import DashboardWrapper from "./MyEarning.style";

export default function MyEarning(props) {
  const [modal, setModal] = useState(false);
  const [earning, SetEarning] = useState(0);
  const [table, setTable] = useState([]);

  const toggle = () => {
    setModal(!modal);
  };

  useEffect(() => {
    EvaluatorServices.myEarning().then((res) => {
      SetEarning(res.data.data.totel_earning);
      const TableData = res.data.data.rows.map((res, i) => {
        return {
          key: i,
          assignments: res.user_mission_id,
          // tags: "Maths , Algebra",
          date: res.evalution_date,
          // amount: "Rs.500",
        };
      });

      setTable(TableData);
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
      title: "Mission Name",
      dataIndex: "assignments",
      key: "assignments",
      align: "center",
      render: (title) => (
        <div className="Monts-Bold fs-18 light-blue">{title}</div>
      ),
    },
    // {
    //   title: "Tags",
    //   dataIndex: "tags",
    //   key: "tags",
    //   align: "center",
    //   render: (title) => <div className="Monts-Bold color">{title}</div>,
    // },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "center",
      render: (title) => <div className="Monts-Bold color">{title}</div>,
    },
    // {
    //   title: "Total Amount",
    //   dataIndex: "amount",
    //   key: "amount",
    //   align: "center",
    //   render: (title) => <div className="Monts-Bold color">{title}</div>,
    // },
  ];

  return (
    <DashboardWrapper>
      <div className="Monts-Bold fs-24 dark-blue ">My Earning</div>
      <div className="Monts-Bold fs-22 light-blue pt-10">Rs.{earning}</div>
      <div className="Monts-SemiBold fs-14 color">Total Balance </div>
      <div className="pt-20">
        <Table
          bordered
          pagination={{ position: ["bottomRight"] }}
          dataSource={table}
          columns={columns}
          size="small"
        />
      </div>
      <div className="pt-20 text-center">
        <Button
          width={200}
          text={"Deposit"}
          onClick={() => {
            toggle();
          }}
        ></Button>
      </div>
      <Modal isOpen={modal} toggle={toggle} title="Deposit" />
    </DashboardWrapper>
  );
}
