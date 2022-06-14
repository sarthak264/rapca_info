import { Select, Table } from "antd";
import TeacherServices from "api/TeacherServices";
import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { RouteDefinitons } from "routes/RouteDefinitions";
import Modal from "../../components/common/Modal/Modal";
import CommonButton from "../../components/common/Button/Button";

export const StudentPractice = (props) => {
  const [loading, setloading] = useState(false);
  const [data, setData] = useState(null);
  const [modal, setModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    TeacherServices.getClassesById(id).then((res) => {
      setData(
        res.data.data.studentsList.map((it) => ({ ...it, key: it.student_id }))
      );
    });
    console.log(data);
  }, [id]);
  const toggleModal = () => {
    setModal(!modal);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "student_name",
    },
    {
      title: "Mission Points",
      dataIndex: "mission_points",
    },
    {
      title: "Revise Points",
      dataIndex: "revise_points",
    },
    {
      title: "Recent Mission Date",
      dataIndex: "most_recent_mission_date",
      render: (text) => text.split("GMT")[0],
    },
    {
      title: "Recent Revise Date",
      dataIndex: "most_recent_revise_date",
      render: (text) => text.split("GMT")[0],
    },
    {
      title: "Detailed Report",
      dataIndex: "most_recent_revise_date",
      render: (text, record) => (
        <Link
          to={RouteDefinitons.ROUTE_STUDENT_PRACTICE_DETAILED_REPORT.replace(
            ":id",
            record.student_id
          )}
          className="table-btn"
        >
          {"Click here"}
        </Link>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
  };

  return (
    <div className="pa-30">
      <div className="Monts-Bold fs-24 dark-blue mb-10">Student Practice</div>
      <div className="flex-x center mb-20" style={{ gap: "2rem" }}>
        <CommonButton
          style={{
            minWidth: 100,
            marginRight: 20,
            border: "1px solid #3aa76d",
            color: "#3aa76d",
            background: "#fff",
          }}
          text="Summary Report"
          width="200"
          onClick={() => {
            history.push(
              RouteDefinitons.ROUTE_TEACHER_SUMMARY_REPORT.replace(":id", id)
            );
          }}
        ></CommonButton>
        <CommonButton
          style={{
            minWidth: 100,
            marginRight: 20,
            border: "1px solid #3aa76d",
            color: "#3aa76d",
            background: "#fff",
          }}
          text="All Classes Report"
          width="200"
          onClick={() => {
            history.push(
              RouteDefinitons.ROUTE_TEACHER_SUMMARY_REPORT.replace(":id", 0)
            );
          }}
        ></CommonButton>
      </div>
      <Table
        bordered
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
      />
      <CommonButton
        text="Message"
        onClick={toggleModal}
        width={200}
        style={{ margin: "auto", display: "block" }}
      >
        Message
      </CommonButton>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        title="Message"
        selectedRowKeys={selectedRowKeys}
      />
    </div>
  );
};
