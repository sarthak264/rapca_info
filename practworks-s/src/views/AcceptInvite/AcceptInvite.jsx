import React, { useState, useEffect } from "react";
import { Table, message } from "antd";
import Button from "../../components/common/Button/Button";
import TeacherServices from "api/TeacherServices";
import { useParams } from "react-router-dom";

function AcceptInvite() {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [data, setData] = useState([]);
  const { id } = useParams();
  const getData = () => {
    TeacherServices.getInvites(id).then((res) => {
      console.log(res.data.data);
      setData(
        res.data.data.acceptList.map((it) => ({ ...it, key: it.user_id }))
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
  ];

  const acceptInvite = () => {
    const params = {
      accept_list: [selectedRowKeys],
      deny_list: [],
    };
    TeacherServices.acceptStudents(id, params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        getData();
      }
    });
  };

  const declineInvite = () => {
    const params = {
      accept_list: [],
      deny_list: [selectedRowKeys],
    };
    TeacherServices.acceptStudents(id, params).then((res) => {
      if (res.data.status === 0) {
        message.error(res.data.message);
      } else {
        message.success(res.data.message);
        getData();
      }
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      //   console.log(
      //     `selectedRowKeys: ${selectedRowKeys}`,
      //     "selectedRows: ",
      //     selectedRows
      //   );
    },
  };

  return (
    <div>
      <div className="Monts-Bold fs-24 dark-blue mb-20">Accept Invite</div>
      <Table
        bordered
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
      />
      <div
        style={{
          display: "flex",
          columnGap: "1rem",
          justifyContent: "flex-end",
          marginTop: "1.5rem",
        }}
      >
        <Button
          text="Accept Invite"
          width="200"
          onClick={() => {
            acceptInvite();
          }}
          style={{ backgroundColor: "#00A843" }}
        ></Button>
        <Button
          text="Decline Invite"
          width="200"
          onClick={() => {
            declineInvite();
          }}
          style={{ backgroundColor: "#FF6F6F" }}
        ></Button>
      </div>
    </div>
  );
}

export default AcceptInvite;
