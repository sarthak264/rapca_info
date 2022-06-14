import React, { useEffect, useState } from "react";
import { Table } from "ant-table-extensions";
import TeacherServices from "api/TeacherServices";
import { Link } from "react-router-dom";
import PdfModal from "components/common/PdfModal/PdfModal";
// const { Search } = Input;

function AnswerKey() {
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [pdf, setPdf] = useState("");
  useEffect(() => {
    TeacherServices.getAnswerKeys().then((res) => {
      console.log(res.data.data.answersList);
      setData(res.data.data.answersList);
    });
  }, []);
  const toggleModal = () => {
    setModal(!modal);
  };
  const columns = [
    { title: "SUBJECT", dataIndex: "subject" },
    { title: "GRADE", dataIndex: "grade" },
    { title: "STREAM", dataIndex: "stream" },
    { title: "TOPIC", dataIndex: "topic" },
    {
      title: "ANSWER KEY",
      dataIndex: "answer_key",
      render: (text) => (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => {
            setPdf(text);
            toggleModal();
          }}
        >
          {"Click here for Answer Key"}
        </p>
      ),
    },
  ];
  return (
    <div>
      <div className="d-flex mb-20">
        <div className="Monts-Bold fs-24 dark-blue">Answer Keys</div>
        {/* <Search
          placeholder="input search text"
          allowClear
          style={{ width: 200, marginLeft: "auto" }}
          className="mb-10"
          size="large"
        /> */}
      </div>
      <Table
        bordered
        columns={columns}
        dataSource={data}
        searchableProps={{ fuzzySearch: true }}
      />
      <PdfModal
        isOpen={modal}
        toggle={toggleModal}
        title="Current Mission"
        heading="Answer Key"
        pdf={pdf}
        buttons={false}
      />
    </div>
  );
}

export default AnswerKey;
