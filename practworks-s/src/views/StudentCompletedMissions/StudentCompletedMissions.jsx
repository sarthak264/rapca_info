import React, { useState, useEffect } from "react";
import StudentServices from "api/StudentServices";
import { Select } from "antd";
import { Table } from "ant-table-extensions";
import Modal from "components/common/Modal/Modal";
import Button from "components/common/Button/Button";
import PageWrapper from "./StudentCompletedMissions.style";

function StudentCompletedMissions() {
  const { Option } = Select;
  const [tags, setTags] = useState([]);
  const [mission, setMission] = useState("");
  const [tableData, setTableData] = useState([]);
  const [page, setPage] = useState(1);
  const [hideButton, setHideButton] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalData, setModalData] = useState({
    mission_id: "",
    points: 0,
    question: "",
    submission: "",
    evaluation: "",
    answer: "",
  });
  const toggleModal = () => {
    setModal(!modal);
  };
  const loadMore = () => {
    console.log("Loading more");
    setPage(page + 1);
  };
  useEffect(() => {
    StudentServices.getDropdowns().then((res) => {
      console.log(res.data.data);
      setTags(res.data.data);
      setMission(res.data.data[0]);
    });
  }, []);
  useEffect(() => {
    if (mission !== "") {
      const params = {
        page: page,
        search: mission,
      };
      StudentServices.postDropdown(params).then((res) => {
        console.log(res.data.data);
        if (page === 1) {
          setTableData(res.data.data);
        } else {
          if (res.data.data.length) {
            const prevData = [...tableData];
            const newData = res.data.data;
            setTableData([...prevData, ...newData]);
          } else {
            setHideButton(true);
          }
        }
      });
    }
  }, [mission, page]);
  const columns = [
    {
      title: "ANSWER KEY",
      dataIndex: "user_mission_id",
      render: (text, value, index) => (
        <p style={{ cursor: "pointer" }}>{text}</p>
      ),
    },
    { title: "Submit Date", dataIndex: "submission_date" },
    { title: "Points", dataIndex: "mission_points" },
  ];
  return (
    <PageWrapper>
      <div className="flex-x space-between align-center">
        <div className="dark-blue Monts-SemiBold fs-20">Select Mission</div>
        <Select
          value={mission}
          showSearch
          size="large"
          style={{ width: 300 }}
          placeholder="Search by Tags"
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
          filterSort={(optionA, optionB) =>
            optionA.children
              .toLowerCase()
              .localeCompare(optionB.children.toLowerCase())
          }
          onChange={(value) => {
            setMission(value);
          }}
        >
          {tags.map((tag, i) => {
            return (
              <Option value={tag} key={tag}>
                {tag}
              </Option>
            );
          })}
        </Select>
      </div>
      <div className="mt-20">
        <Table
          bordered
          columns={columns}
          dataSource={tableData}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                console.log(`The row index is ${rowIndex}`);
                setModalData({
                  mission_id: tableData[rowIndex].user_mission_id,
                  points: tableData[rowIndex].mission_points,
                  question: tableData[rowIndex].question_file_url,
                  submission: tableData[rowIndex].submitted_file_url,
                  evaluation: tableData[rowIndex].evaluted_file_url,
                  answer: tableData[rowIndex].answer_file_url,
                });
                toggleModal(modalData);
              },
            };
          }}
        />
        {!hideButton && (
          <div className="btn-wrapper">
            <Button text="Load more" width="150" onClick={loadMore}></Button>
          </div>
        )}
      </div>
      <Modal
        isOpen={modal}
        toggle={toggleModal}
        title="Mission Detail"
        modalData={modalData}
      />
    </PageWrapper>
  );
}

export default StudentCompletedMissions;
